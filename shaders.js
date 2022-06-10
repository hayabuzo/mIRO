glsl = { names:[] };   // create object for storing shader data

// vertex shader is the same for all the fragment shaders
glsl.vert = ` attribute vec3 aPosition; attribute vec2 aTexCoord; varying vec2 vTexCoord;
void main() { vTexCoord = aTexCoord; vec4 positionVec4 = vec4(aPosition, 1.0);  
positionVec4.xy = positionVec4.xy * 2.0 - 1.0; gl_Position = positionVec4; }`;

// uniforms are the same for all the fragment shaders
glsl.uniforms = `    precision mediump float; varying vec2 vTexCoord;
uniform sampler2D   TXC, TXP, TXF, TXB;
uniform float       WIDTH,    HEIGHT,   H2W,      
                    R1,  R2,  R3,  R4,  R5,
                    N1,  N2,  N3,  N4,  N5,
                    MLS, FRC, FSK,
                    A,   B,   C,
                    MX,  MY;`;

// default code for a new filter
glsl.default = 
`myShaderName
@
vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec4  img = texture2D(TXP, uv);
      gl_FragColor = img; `;

// add some lines after the code to simplify navigation
for (let i=0; i<10; i++) { glsl.default +='\n'; }

function buildShader() {                                         // function that builds array of fragment shaders from the text

  glsl.code = txtar.value();                                     // get current filter code from textarea
	let ctrl_reg = new RegExp("[ABC][ABC][ABC]"+" #","g");         // create regEx for controls
	let ctrl_arr = [];                                             // create array for controls rebinds in code
	ctrl_arr = glsl.code.match(ctrl_reg);                          // search for rebinds and make array of it
	glsl.code = glsl.code.replace(ctrl_reg,"");                    // delete rebinds from code
	
	for (let i=0; i<glsl.names.length; i++) {                               // for every name of preset
		let name = new RegExp("# "+glsl.names[i]+" #","g");                   // create regEx with macro syntax
		let code = glsl.parray[i].split("@")[1];                              // take the preset code
		glsl.code = glsl.code.replace(name," // "+glsl.names[i]+" "+code);    // and replace preset macro with code
	}

  let shaders_array = glsl.code.split("@");                               // split the code with @ symbols to separate fragment shaders
	glsl.frags = []; for (let i=1; i<shaders_array.length; i++) {           // generate array of fragment shaders
		if (ctrl_arr!=null) if (ctrl_arr[i-1]!=null)                          // if this shader have control rebinds
			shaders_array[i] = shaders_array[i]                                 // replace control chars in code with new ones
			.replace(/\bA\b/,"replace_a")
		  .replace(/\bB\b/,"replace_b")
		  .replace(/\bC\b/,"replace_c")
			.replace(/\breplace_a\b/,ctrl_arr[i-1].charAt(0))
		  .replace(/\breplace_b\b/,ctrl_arr[i-1].charAt(1))
		  .replace(/\breplace_c\b/,ctrl_arr[i-1].charAt(2));
		glsl.frags.push(glsl.uniforms + glsl.library + ` void main() { ` + shaders_array[i] + ` } `);  // build the shader
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

function randomMix() {                                        // to mix random presets in new filter
	let name = "";  let code = "";                              // we need to create name and code for it
	for (let i=0; i<random([2,3]); i++) {	                      // for the random number of shaders in filter
		let r = random(glsl.names);                               // select random preset name
		let c = random(["ABC","CAB","BCA","CBA","ACB","BAC"]);    // select random control rebind
		code += "@ # "+r+" # "+c+" #\n";                          // combine the code
		name += "-"+r.substring(0,3);                             // combine the name
	}	txtar.value(name.substring(1)+"\n"+code);                 // and put it all together in the text area
}