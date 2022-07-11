// Copyright 2022, Sergey Egorov
// Licensed under the Apache License, Version 2.0 

const sketch = 'mIRO' 
const ver    = 'v.220630' 

function setup() {                                           // preparing sketch
  
  pixelDensity(1);                                           // set the same density for all devices to prevent over-resolution
  cnv = createCanvas(windowWidth, windowHeight);             // create canvas with full window size
  getProfile();                                              // load program settings profile
  gui = new Gui(min(width,height),height);                   // create graphic user interface with limited width
	ear = new Ear();                                           // create sound analyzer with 16 bins
  createHtml();                                              // create html elements
  buildShader();                                             // build shaders from the text
	txn = createNoiseField();                                  // create texture with noise field
	textFont('Monospace');                                     // change standard font

}

function createHtml() {                                                                // create text area and file input elements

  txtar = createElement('textarea', profile.code);                                     // create text area for shader code 
  txtar.position(gui.x0+4,gui.h*0.1).size(gui.w-15,gui.h*0.8-50);                      // set area position and size
  txtar.style('color:'+skin[profile.theme].txt);                                       // set text color
  txtar.style('background-color', 'transparent');                                      // set text area background transparent
  txtar.style('font-size', 14+'px');  txtar.style('font-family:monospace');            // set text size and font
  txtar.style('text-align:left');     txtar.style('white-space:pre');                  // set text align
  txtar.style('visibility:hidden');   txtar.id('txtar');                               // hide text area until we need it

  file_input = createFileInput(open_file);                                             // create file input button
  file_input.style('visibility:hidden');                                               // hide this button
  file_input.id('myInput');                                                            // set the element id, to find it later

  pre_sel = createSelect();                                                            // create preset selector
  pre_sel.position(gui.x0+4,gui.h*0.9-40).size(gui.w-8,40);                            // set preset selector position and size
  pre_sel.style('color:'+skin[profile.theme].txt);                                     // set preset selector text color
  pre_sel.style('font-size', 14+'px');  pre_sel.style('font-family:monospace');        // set preset selector size and font
  pre_sel.style('text-align:left');     pre_sel.style('white-space:pre');              // set preset selector align
  pre_sel.style('visibility:hidden');   pre_sel.changed(load_preset);                  // hide preset selector until we need it
  pre_sel.id('mySel');                                                                 // set the element id, to find it later

  pre_sel.option('> Load Preset');                                                                 // create first line of selector
  update_presets();
	
}

function draw() {  background(color(skin[profile.theme].bgr)); gui.run(); }      // in each frame draw background and run interface

function load_preset() {                                        // when loading a preset via selector
  glsl.parray[-1] = 'xx'+profile.code;                          // we need to store current shader text with 2 extra characters          
  txtar.value(glsl.parray[mySel.selectedIndex-1].slice(2));     // because we will delete first 2 symbols of preset text which used for better formating 
  gui.compile();                                                // compile preset
	mySel.selectedIndex = 0;                                      // reset selector in shader editor
	if (gui.frame=="F1") gui.frame="F1L";                         // recalculate buttons size to align controls
  for (let i in gui.trig) { gui.trig[i] = false; }              // reset shader controls
	document.getElementById('mySel').blur();                      // set the focus out of selector
}

function open_file(file) {                                      // when opening a file via "load" button
  if (file.type === 'text') txtar.value(file.data);             // we can open a text file and load it as filter
  if (file.type === 'image') gui.createImage(file);             // we can open an image and put it for shader processing
  gui.compile();                                                // compile filter after loading
	file_input.value('');	                                        // clear file input to allow reopen the same file
} 

function update_presets() {
	glsl.parray = glsl.presets.split("###").slice(1);                                                // create array of presets
  glsl.parray.sort(function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase());});         // sort it case-insensetive
  for(let i=0; i<glsl.parray.length; i++) {                                                        // for each element in array of presets
		let n = glsl.parray[i].split("\n")[2];                                                         // take preset name
		glsl.names[i] = n;                                                                             // put it in the array of names
		pre_sel.option(n);                                                                             // put preset name into selector as option
	}
}

function createNoiseField() {
  let img = createImage(500, 500);  img.loadPixels();	let k = 150;
  for (let i = 0; i < img.width; i++) { for (let j = 0; j < img.height; j++) { 
		  let r = (1.0-abs(1.0-abs(noise(i/k+j*width/k+10000)*2.1-0.5)))*255; // let r = (1.0-abs(1.0-abs(noise(i/k,j/k+10000)*2.0-0.5)))*255;
		  let g = (1.0-abs(1.0-abs(noise(i/k+j*width/k+20000)*2.1-0.5)))*255; // let g = (1.0-abs(1.0-abs(noise(i/k,j/k+20000)*2.0-0.5)))*255;
		  let b = (1.0-abs(1.0-abs(noise(i/k+j*width/k+30000)*2.1-0.5)))*255; // let b = (1.0-abs(1.0-abs(noise(i/k,j/k+30000)*2.0-0.5)))*255;
		  img.set(i, j, color(r,g,b)); } }   img.updatePixels();	
  for (let i = 0; i < img.width; i++) { for (let j = 0; j < img.height; j++) { 
		let l = 50; if (i>500-l) img.set(i, j, lerpColor(color(img.get(500-i,j)),color(img.get(i,j)),(500-i)/l) ); 
	}  }  img.updatePixels();	
	return img;
}