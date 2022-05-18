glsl = {};  // create object for storing shader data

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

function buildShader() {                  // function that builds array of fragment shaders from the text
  
  glsl.frags = [];                        // create an empty array of fragment shaders
  let a = sCode.value().split("@");       // split the code with @ symbols to separate fragment shaders
  
  // if there are shader control variables in the code, turn on these controls in gui 
  glsl.mx = str(sCode.value()).search(/\bMX\b/) > 0 ? true : false;
  glsl.my = str(sCode.value()).search(/\bMY\b/) > 0 ? true : false;
  glsl.a  = str(sCode.value()).search(/\bA\b/)  > 0 ? true : false;
  glsl.b  = str(sCode.value()).search(/\bB\b/)  > 0 ? true : false;
  glsl.c  = str(sCode.value()).search(/\bC\b/)  > 0 ? true : false;
  glsl.n  = int(glsl.a) + int(glsl.b) + int(glsl.c);

  // generate array of fragment shaders
  for (let i=1; i<a.length; i++) { glsl.frags.push(glsl.uniforms + glsl.library + ` void main() { ` + a[i] + ` } `);  }
  
}