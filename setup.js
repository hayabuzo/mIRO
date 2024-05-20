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

  const createHtml = () => {                                 // create text area and file input elements

    const updatePresets = () => {
      while (presetSelectorId.options.length > 1) { presetSelectorId.remove(1); }                              // cleanup old data
      glsl.presetsArray = glsl.presetsText[profile.presetPackNumber].split("###").slice(1);                    // create array of presets from it's text data
      glsl.presetsArray.sort((a,b) => {                                                                        // sort it case-insensetive
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });           
      glsl.presetsNames = [];                                                                                  // reset names array
      for (let i=0; i<glsl.presetsArray.length; i++) {                                                          // for each element in array of presets
        const presetName = glsl.presetsArray[i].split("\n")[2];                                                // take preset name
        glsl.presetsNames[i] = presetName;                                                                     // put it in the array of names
        presetSelectorEl.option(presetName);                                                                   // put preset name into selector as option
      }
    }

    const loadPack = () => {	
      profile.presetPackNumber = packSelectorId.selectedIndex;	
      updatePresets(); 
    }

    const openFile = (file) => {                                   // when opening a file via "load" button
      if (file.type === 'text') {                                  
        codeAreaEl.value(file.data);                               // we can open a text file and load it as a filter
      } else if (file.type === 'image') {                          
        gui.createImage(file);                                     // or we can open an image and put it for the shader processing
      }
      gui.compile();                                               // compile filter after loading
      fileInputEl.value('');	                                     // clear file input to allow reopen the same file
    } 

    codeAreaEl = createElement('textarea', profile.code);                                     // create text area for shader code 
    codeAreaEl.position(gui.x0+4,gui.h*0.1).size(gui.w-15,gui.h*0.8-50);                      // set area position and size
  
    fileInputEl = createFileInput(openFile);                                              // create file input button
    fileInputEl.style('visibility:hidden');                                               // hide this button
    fileInputEl.id('fileInputId');                                                        // set the element id, to find it later
  
    presetSelectorEl = createSelect();                                                            // create preset selector
    presetSelectorEl.position(gui.x0+4,gui.h*0.9-40).size(gui.w-8,40);                            // set preset selector position and size
    presetSelectorEl.style('visibility:hidden');                                                   // hide preset selector until we need it
    presetSelectorEl.changed(loadPreset);                                                         
    presetSelectorEl.id('presetSelectorId');                                                       // set the element id, to find it later
    presetSelectorEl.option('> Load Preset');                                                     // create first line of selector
    
    packSelectorEl = createSelect();                                                            // create preset selector
    packSelectorEl.position(0,0);
    packSelectorEl.style('visibility:hidden');                                                     // hide preset selector until we need it  
    packSelectorEl.changed(loadPack);
    packSelectorEl.id('packSelectorId');                                                                // set the element id, to find it later
    
    for(let i=0; i<glsl.packNames.length; i++) {                                                        
      packSelectorEl.option(glsl.packNames[i]);                                                                
    }
    packSelectorId.selectedIndex = profile.presetPackNumber;
    
    codeAreaEl.style('color:'+skin.txt);                                                      // set text color
    codeAreaEl.style('background-color', 'transparent');                                      // set text area background transparent
    codeAreaEl.style('font-size', 14+'px');  
    codeAreaEl.style('font-family:monospace');            // set text size and font
    codeAreaEl.style('text-align:left');     
    codeAreaEl.style('white-space:pre');                  // set text align
    codeAreaEl.style('visibility:hidden');   
    codeAreaEl.id('codeAreaEl');                               // hide text area until we need it
    
    presetSelectorEl.style('color:'+skin.txt);                                                    // set preset selector text color
    presetSelectorEl.style('font-size', 14+'px');  
    presetSelectorEl.style('font-family:monospace');        // set preset selector size and font
    presetSelectorEl.style('text-align:left');     
    presetSelectorEl.style('white-space:pre');              // set preset selector align
    
    packSelectorEl.style('color:'+skin.txt);                                                    // set preset selector text color
    packSelectorEl.style('font-size', 14+'px');  
    packSelectorEl.style('font-family:monospace');       // set preset selector size and font
    packSelectorEl.style('text-align:left');     
    packSelectorEl.style('white-space:pre');             // set preset selector align

    updatePresets();
    
  }

  const getProfile = () => {          // load profile with program settings

    skin    = { bgr: '#424949', btn: '#CACFD2', txt: '#FFFFFF', run: '#0B5345', err: '#641E16' };   // dark theme
  
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
      presetPackNumber:       0,               // select default preset pack
    };
  
    // if URL ends with "?r=1" do the profile reset
    if (getURLParams().r==1) removeItem('settings_profile');            
  
    // create temporary profile and try to load data into it from the browser's memory
    p_temp = {}; if (getItem('settings_profile')!=null) p_temp = getItem('settings_profile');
  
    // load profile of settings
    profile = getItem('settings_profile');
    
    // check if there are missing variables in loaded profile
    if (profile === null) {
      profile = [];
    }
  
    for (let i in default_profile) { 
      if (profile[i] == undefined || profile[i] == null) {
        profile[i] = default_profile[i];
      }
     }
    
    // force loading is needed to allow the browser to save multiple files at startup
    if (profile.forcing) { save('','?.txt'); save('','?.txt'); }
    
  }
  
  pixelDensity(1);                                           // set the same density for all devices to prevent over-resolution
  cnv = createCanvas(windowWidth, windowHeight);             // create canvas with full window size
  getProfile();                                              // load program settings profile
  gui = new Gui(min(width,height),height);                   // create graphic user interface with limited width
  createHtml();                                              // create html elements
  buildShader();                                             // build shaders from the text
	textFont('Monospace');                                     // change standard sans-serif font to monospace

  controls =  { play:false, alpha:1.0, xm:-1.0, ym:-1.0, am:1.0};
	
}

function draw() {  
  background(color(skin.bgr)); 
  gui.run(); 
}

const loadPreset = () => {                                        // when loading a preset via selector
  glsl.presetsArray[-1] = 'xx'+profile.code;                          // we need to store current shader text with 2 extra characters          
  codeAreaEl.value(glsl.presetsArray[presetSelectorId.selectedIndex-1].slice(2));     // because we will delete first 2 symbols of preset text which used for better formating 
  gui.compile();                                                // compile preset
	presetSelectorId.selectedIndex = 0;                                      // reset selector in shader editor
	if (gui.frame=="F1") gui.frame="F1L";                         // recalculate buttons size to align controls
  for (let i in gui.trig) { gui.trig[i] = false; }              // reset shader controls
	document.getElementById('presetSelectorId').blur();                      // set the focus out of selector
}


const buildShader = () => {                                         // function that builds array of fragment shaders from the text

  const revealName = () => {
    glsl.code = codeAreaEl.value();                                              // get current filter code from textarea
    for (let i=0; i<glsl.presetsNames.length; i++) {                               // for every name of preset in list of names
      let name = new RegExp("# "+glsl.presetsNames[i]+" #","g");                   // create regEx with macro syntax
      let code = glsl.presetsArray[i].split("@")[1];                              // take the preset code
      glsl.code = glsl.code.replace(name," // "+glsl.presetsNames[i]+" "+code);    // and replace preset macro with code
    }	
    let reg = new RegExp("@","g"); return glsl.code.replace(reg,"\n@");     // add line break for saving function
  }

  revealName();
  
  let ctrl_reg = new RegExp("[ABCabc01XxYy][ABCabc01XxYy][ABCabc01XxYy][ABCabc01XxYy][ABCabc01XxYy]"+" #","g");         // create regEx for controls
  let ctrl_arr = [];                                                      // create array for controls rebinds in code
  ctrl_arr = glsl.code.match(ctrl_reg);                                   // search for rebinds and make array of it
  glsl.code = glsl.code.replace(ctrl_reg,"");                             // delete rebinds from code

  let shaders_array = glsl.code.split("@");                               // split the code with @ symbols to separate fragment shaders
  glsl.frags = []; for (let i=1; i<shaders_array.length; i++) {           // generate array of fragment shaders
    if (ctrl_arr!=null) if (ctrl_arr[i-1]!=null) {                        // if this shader have control rebinds
      ctrl_arr[i-1] = ctrl_arr[i-1].split("");
      for (let j in ctrl_arr[i-1]) {
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
      shaders_array[i] = shaders_array[i]                                 // replace control chars in code with new ones
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
    //print(shaders_array[i]);
    glsl.frags.push(glsl.uniforms + glsl.library + ` void main() { ` + shaders_array[i] + `gl_FragColor.a *= alpha;` + ` } `);  // build the shader
  }
  
  //print(glsl.frags);
  
  // if there are shader control variables in the code, turn on these controls in gui
  shaders_array = shaders_array.join('');
  glsl.mx = str(shaders_array).search(/\bMX\b/) > 0 ? true : false;
  glsl.my = str(shaders_array).search(/\bMY\b/) > 0 ? true : false;
  glsl.a  = str(shaders_array).search(/\bA\b/)  > 0 ? true : false;
  glsl.b  = str(shaders_array).search(/\bB\b/)  > 0 ? true : false;
  glsl.c  = str(shaders_array).search(/\bC\b/)  > 0 ? true : false;
  glsl.n  = int(glsl.a) + int(glsl.b) + int(glsl.c);

}