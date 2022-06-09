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

function buildShader() {                      // function that builds array of fragment shaders from the text

  glsl.code = txtar.value();                  // get current filter code from textarea

	let ctrl_reg = new RegExp("[ABC][ABC][ABC]"+" #","g"); 
	let ctrl_arr = [];
	ctrl_arr = glsl.code.match(ctrl_reg);
	glsl.code = glsl.code.replace(ctrl_reg,"");
	
	for (let i=0; i<glsl.names.length; i++) { 
		let name = new RegExp("# "+glsl.names[i]+" #","g"); 
		let code = glsl.parray[i].split("@")[1];
		glsl.code = glsl.code.replace(name," // "+glsl.names[i]+" "+code);
	}
	
	 print(glsl.code);

  // split the code with @ symbols to separate fragment shaders
  let shaders_array = glsl.code.split("@");

  // generate array of fragment shaders
	glsl.frags = []; for (let i=1; i<shaders_array.length; i++) {
		if (ctrl_arr!=null) if (ctrl_arr[i-1]!=null)
			shaders_array[i] = shaders_array[i]
			.replace(/\bA\b/,"replace_a")
		  .replace(/\bB\b/,"replace_b")
		  .replace(/\bC\b/,"replace_c")
			.replace(/\breplace_a\b/,ctrl_arr[i-1].charAt(0))
		  .replace(/\breplace_b\b/,ctrl_arr[i-1].charAt(1))
		  .replace(/\breplace_c\b/,ctrl_arr[i-1].charAt(2));
		glsl.frags.push(glsl.uniforms + glsl.library + ` void main() { ` + shaders_array[i] + ` } `);  
	}
	//print(shaders_array)
	
	shaders_array = shaders_array.join('');
	
  // if there are shader control variables in the code, turn on these controls in gui
  glsl.mx = str(shaders_array).search(/\bMX\b/) > 0 ? true : false;
  glsl.my = str(shaders_array).search(/\bMY\b/) > 0 ? true : false;
  glsl.a  = str(shaders_array).search(/\bA\b/)  > 0 ? true : false;
  glsl.b  = str(shaders_array).search(/\bB\b/)  > 0 ? true : false;
  glsl.c  = str(shaders_array).search(/\bC\b/)  > 0 ? true : false;
  glsl.n  = int(glsl.a) + int(glsl.b) + int(glsl.c);

}

function randomMix() {
	let name = "";  let txt = "";
	for (let i=0; i<random([2,3]); i++) {	
		let r = random(glsl.names);
		let c = random(["ABC","CAB","BCA","CBA","ACB","BAC"]);
		txt += "@ # "+r+" # "+c+" #\n"; 
		name += "-"+r.substring(0,3);
	}	txtar.value(name.substring(1)+"\n"+txt);
}