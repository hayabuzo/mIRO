// Copyright 2022, Sergey Egorov
// Licensed under the Apache License, Version 2.0

const sketch = 'mIRO'
const ver    = 'v.220609' 

function setup() {                                           // preparing sketch
  
  pixelDensity(1);                                           // set the same density for all devices to prevert over-resolution
  cnv = createCanvas(windowWidth, windowHeight);             // create canvas with full window size
  getProfile();                                              // load program settings profile
  gui = new gui(min(width,height),height);                   // create graphic user interface with limited width
  createHtml();                                              // create html elements
  buildShader();                                             // build shaders from the text

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
  pre_sel.option('> Random Mix');  
	glsl.parray = glsl.presets.split("###").slice(1);                                                // create array of presets
  glsl.parray.sort(function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase());});         // sort it case-insensetive
  for(let i=0; i<glsl.parray.length; i++) { 
		glsl.names[i] = glsl.parray[i].split(char(10))[2]; 
		pre_sel.option(glsl.names[i]);                                                                 // put presets names into selector
	}
	
}

function draw() {  background(color(skin[profile.theme].bgr)); gui.run(); }      // in each frame draw background and run interface

function load_preset() {                                        // when loading a preset via selector
  glsl.parray[-1] = 'xx'+profile.code;                          // we need to store current shader text with 2 extra characters          
  txtar.value(glsl.parray[mySel.selectedIndex-2].slice(2));     // because we will delete first 2 symbols of preset text which used for better formating   
	if (mySel.selectedIndex==1) randomMix();
  gui.compile();                                                // compile preset
	mySel.selectedIndex = 0;                                      // reset selector in shader editor
	if (gui.frame=="F1") gui.frame="F1L";                         // recalculate buttons size to align controls
  for (let i in gui.trig) { gui.trig[i] = false; }              // reset shader controls
	document.getElementById('mySel').blur();                      // set the focus out of selector
}

function open_file(file) {                                      // when opening a file via "load" button
  if (file.type === 'text') txtar.value(file.data);             // we can open a text file and put it in a shader code
  if (file.type === 'image') gui.createImage(file);             // we can open an image and put it for shader processing
  gui.compile();                                                // compile filter after loading
	file_input.value('');	                                        // clear file input to allow reopen the same file
} 