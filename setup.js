// Copyright 2024, Sergey Egorov
// Licensed under the Apache License, Version 2.0 

const sketch = 'mIRO' 
const ver    = 'v.24' 

// enabling webgl2 mode in p5js
p5.RendererGL.prototype._initContext = function() {
	try { 
    this.drawingContext = this.canvas.getContext('webgl2', this._pInst._glAttributes) || this.canvas.getContext('experimental-webgl', this._pInst._glAttributes);
		if (this.drawingContext === null) { 
      throw new Error('Error creating webgl context');
		} else { 
      const gl = this.drawingContext; 
      gl.enable(gl.DEPTH_TEST); 
      gl.depthFunc(gl.LEQUAL);
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
			this._viewport = this.drawingContext.getParameter(this.drawingContext.VIEWPORT);
		}
  } catch (er) { 
    throw er; 
  }
};

function setup() {

  // frameRate(18);

  // when opening a file via "load" button
  // we can open a text file and load it as a filter
  // or we can open an image and put it for the shader processing
  const openFile = (file) => {                                   
    console.log('drop');
    if (file.type === 'text') {                                  
      codeAreaEl.value(file.data);                               
    } else if (file.type === 'image') {                          
      gui.createImage(file);                                     
      gui.fileName = "["+(file.name.split("."))[0]+"] ";
    }
    gui.compile();                                               
    gui.setHead();
    fileInputEl.value(''); // clear file input to allow reopen the same file
  } 

  // create text area and file input elements
  const createHtml = () => {                                 

    const updatePresets = () => {
      while (presetSelectorId.options.length > 1) { 
        presetSelectorId.remove(1);  // cleanup old data
      }
      // create array of presets from it's text data
      glsl.presetsArray = glsl.presetsText[profile.presetPackNumber].split("###").slice(1);      
      // sort it case-insensetive              
      glsl.presetsArray.sort((a,b) => {                                                                        
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      glsl.presetsNames = [];
      for (let i=0; i<glsl.presetsArray.length; i++) {
        const presetName = glsl.presetsArray[i].split("\n")[2];
        glsl.presetsNames[i] = presetName;
        presetSelectorEl.option(presetName);
      }
    }

    const getAllPresets = () => {
      glsl.allPresetsArray = [];
      glsl.allPresetsNames = [];
      const packs = [0, 1];
      // create array of presets from it's text data
      for (const p of packs) {
        glsl.allPresetsArray.push(...glsl.presetsText[p].split("###").slice(1));
      }
      for (let i=0; i<glsl.allPresetsArray.length; i++) {
        const presetName = glsl.allPresetsArray[i].split("\n")[2];
        glsl.allPresetsNames.push(presetName);
      }
    }

    const loadPack = () => {	
      profile.presetPackNumber = packSelectorId.selectedIndex;	
      updatePresets(); 
    }

    const generateRandomPresetMix = (numberOfElements) => {
      let randomPreset = "";
      let randomPresetName = "";
      for (let i=0; i<numberOfElements; i++) {
        const name = random(glsl.allPresetsNames);
        randomPresetName += `-${name.substring(0, 3)}`
        const controls = random(['a','A'])+random(['b','B'])+random(['c','C'])+random(['x','X'])+random(['y','Y']);
        randomPreset += `@ # ${name} # ${controls} #\n`
      }
      profile.code = randomPresetName.substring(1)+'\n'+randomPreset;
    }
  
    // create file input button
    fileInputEl = createFileInput(openFile);
    fileInputEl.style('visibility:hidden');
    fileInputEl.id('fileInputId');
  
    // create preset selector
    presetSelectorEl = createSelect();                                                            
    presetSelectorEl.position(gui.x0+4,gui.h*0.9-40).size(gui.w-8,40);
    presetSelectorEl.style('visibility:hidden;');
    presetSelectorEl.changed(loadPreset);                                                         
    presetSelectorEl.id('presetSelectorId');
    // create first line of selector
    presetSelectorEl.option('> Load Preset');
    presetSelectorEl.style('color:'+skin.txt);
    presetSelectorEl.style('font-size', 14+'px');  
    presetSelectorEl.style('font-family:monospace');
    presetSelectorEl.style('text-align:left');     
    presetSelectorEl.style('white-space:pre');
    
    // create preset selector
    packSelectorEl = createSelect();
    packSelectorEl.position(0,0);
    packSelectorEl.style('visibility:hidden');
    packSelectorEl.changed(loadPack);
    packSelectorEl.id('packSelectorId');
    packSelectorEl.style('color:'+skin.txt);
    packSelectorEl.style('font-size', 14+'px');  
    packSelectorEl.style('font-family:monospace');
    packSelectorEl.style('text-align:left');     
    packSelectorEl.style('white-space:pre');
    
    for(let i=0; i<glsl.packNames.length; i++) {                                                        
      packSelectorEl.option(glsl.packNames[i]);                                                                
    }
    packSelectorId.selectedIndex = profile.presetPackNumber;

    updatePresets();
    getAllPresets();

    // if URL ends with "?g=true" generate random mix
    if (getURLParams().g) { 
      generateRandomPresetMix(getURLParams().g);
    }

    // create text area for shader code 
    codeAreaEl = createElement('textarea', profile.code);                                     
    codeAreaEl.position(gui.x0+4,gui.h*0.1).size(gui.w-15,gui.h*0.8-50);
    codeAreaEl.style('color:'+skin.txt);
    codeAreaEl.style('background-color', 'transparent');
    codeAreaEl.style('font-size', 14+'px');  
    codeAreaEl.style('font-family:monospace');
    codeAreaEl.style('text-align:left');     
    codeAreaEl.style('white-space:pre');
    codeAreaEl.style('visibility:hidden');   
    codeAreaEl.id('codeAreaEl');
    
  }

  // load profile with program settings
  const getProfile = () => {          

    skin    = { 
      bgr: '#424949', 
      btn: '#CACFD2', 
      txt: '#FFFFFF', 
      run: '#0B5345', 
      err: '#641E16' 
    };
  
    default_profile = {            // default profile setting are:
      resolution: "min",           // set minimal resolution
      resize:     1,               // do not enlarge image size
      frontal:    false,           // use main camera
      clicking:   false,           // do not use clicking mode
      stablevel:  0.0,             // stabilization off
      filetype:   "jpg",           // save files in 'jpg'
      forcing:    false,           // do not use force loading
      livecode:   true,            // livecoding enabled;
      window:     1,               // do not reduce window size
      code:       glsl.default,    // load default shader code
      presetPackNumber: 0,         // select default preset pack
    };
  
    // if URL ends with "?r=1" do the profile reset
    if (getURLParams().r==1) { 
      removeItem('settings_profile') 
    };
  
    // create temporary profile and try to load data into it from the browser's memory
    p_temp = {}; if (getItem('settings_profile')!=null) p_temp = getItem('settings_profile');
  
    // load profile of settings
    profile = getItem('settings_profile');
    
    // check if there are missing variables in loaded profile
    if (profile === null) {
      profile = {};
    }
  
    for (const i in default_profile) { 
      if (profile[i] == undefined || profile[i] == null) {
        profile[i] = default_profile[i];
      }
     }
    
    // force loading is needed to allow the browser to save multiple files at startup
    if (profile.forcing) { 
      save('','?.txt'); save('','?.txt'); 
    }
    
  }
  
  pixelDensity(1);                                           
  cnv = createCanvas(windowWidth, windowHeight);
  getProfile();
  gui = new Gui(min(width,height),height);
  createHtml();
  buildShader();
	textFont('Monospace');

  cnv.drop(openFile);

  for (const element of document.getElementsByClassName("p5Canvas")) { 
    element.addEventListener("contextmenu", (e) => e.preventDefault());    
  }

  controls =  { 
    play: false, 
    alpha: 1.0, 
    xm: -1.0, 
    ym: -1.0, 
    am: 1.0
  };
	
}

function draw() {  
  background(color(skin.bgr)); 
  gui.run(); 
}

// when loading a preset via selector
// we need to store current shader text with 2 extra characters
// because we will delete first 2 symbols of preset text which used for better formating 
const loadPreset = () => {                                        
  glsl.presetsArray[-1] = 'xx'+profile.code;
  codeAreaEl.value(glsl.presetsArray[presetSelectorId.selectedIndex-1].slice(2));
  gui.compile();
	presetSelectorId.selectedIndex = 0;
	if (gui.frame=="F1") {
    gui.frame="F1L";
  }
  for (let i in gui.trig) { 
    gui.trig[i] = false; 
  }
  // set the focus out of selector
	document.getElementById('presetSelectorId').blur();
}

// get current filter code from textarea
const revealName = () => {
  glsl.code = codeAreaEl.value();                                              
  for (let i=0; i<glsl.allPresetsNames.length; i++) {
    const name = new RegExp("# "+glsl.allPresetsNames[i]+" #","g");
    const code = glsl.allPresetsArray[i].split("@")[1];
    glsl.code = glsl.code.replace(name," // "+glsl.allPresetsNames[i]+" "+code);
  }	
  const reg = new RegExp("@","g"); 
  return glsl.code.replace(reg,"\n@");
}

// function that builds array of fragment shaders from the text
const buildShader = () => {

  revealName();
  
  // create array for controls rebinds in code
  // search for rebinds and make array of it
  // and delete rebinds from code
  const ctrl_reg = new RegExp("[ABCabc01XxYy][ABCabc01XxYy][ABCabc01XxYy][ABCabc01XxYy][ABCabc01XxYy]"+" #","g");
  const ctrl_arr = glsl.code.match(ctrl_reg);                                   
  glsl.code = glsl.code.replace(ctrl_reg,"");                             

  // split the code with @ symbols to separate fragment shaders
  let shaders_array = glsl.code.split("@");
  // generate array of fragment shaders
  glsl.frags = []; 
  for (let i=1; i<shaders_array.length; i++) {           
    // if this shader have control rebinds
    if (ctrl_arr!=null) if (ctrl_arr[i-1]!=null) {                        
      ctrl_arr[i-1] = ctrl_arr[i-1].split("");
      for (const j in ctrl_arr[i-1]) {
        if (ctrl_arr[i-1][j]=="a") ctrl_arr[i-1][j] = "(1.0-A)";
        if (ctrl_arr[i-1][j]=="b") ctrl_arr[i-1][j] = "(1.0-B)";
        if (ctrl_arr[i-1][j]=="c") ctrl_arr[i-1][j] = "(1.0-C)";
        if (ctrl_arr[i-1][j]=="0") ctrl_arr[i-1][j] = "0.0";
        if (ctrl_arr[i-1][j]=="1") ctrl_arr[i-1][j] = "1.0";
        if (ctrl_arr[i-1][j]=="X") ctrl_arr[i-1][j] = "MX";
        if (ctrl_arr[i-1][j]=="Y") ctrl_arr[i-1][j] = "MY";
        if (ctrl_arr[i-1][j]=="x") ctrl_arr[i-1][j] = "(1.0-MX)";
        if (ctrl_arr[i-1][j]=="y") ctrl_arr[i-1][j] = "(1.0-MY)";
      }
      // replace control chars in code with new ones
      shaders_array[i] = shaders_array[i]
      .replace(/\bA\b/g,"replace_a")
      .replace(/\bB\b/g,"replace_b")
      .replace(/\bC\b/g,"replace_c")
      .replace(/replace_a/g,ctrl_arr[i-1][0])
      .replace(/replace_b/g,ctrl_arr[i-1][1])
      .replace(/replace_c/g,ctrl_arr[i-1][2])
      .replace(/MX/g,ctrl_arr[i-1][3])
      .replace(/MY/g,ctrl_arr[i-1][4])
      ;
    }
    // build the shader
    glsl.frags.push(glsl.uniforms + glsl.library + ` void main() { ` + shaders_array[i] + `gl_FragColor.a *= alpha;` + ` } `);
  }
  
  // if there are shader control variables in the code, turn on these controls in gui
  shaders_array = shaders_array.join('');
  glsl.mx = str(shaders_array).search(/\bMX\b/) > 0 ? true : false;
  glsl.my = str(shaders_array).search(/\bMY\b/) > 0 ? true : false;
  glsl.a  = str(shaders_array).search(/\bA\b/)  > 0 ? true : false;
  glsl.b  = str(shaders_array).search(/\bB\b/)  > 0 ? true : false;
  glsl.c  = str(shaders_array).search(/\bC\b/)  > 0 ? true : false;
  glsl.n  = int(glsl.a) + int(glsl.b) + int(glsl.c);

}