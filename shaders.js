glsl = { names:[], presets:[], packnames:[] };   // create object for storing shader data

// vertex shader is the same for all the fragment shaders
glsl.vert = `#version 300 es 
in vec3 aPosition; in vec2 aTexCoord; out vec2 vTexCoord;
void main() { vTexCoord = aTexCoord; vec4 positionVec4 = vec4(aPosition, 1.0);  
positionVec4.xy = positionVec4.xy * 2.0 - 1.0; gl_Position = positionVec4; }`;

// uniforms are the same for all the fragment shaders
glsl.uniforms = `#version 300 es
precision mediump float; 
in vec2 vTexCoord; out vec4 fragColor;

uniform sampler2D   TXC, TXP, TXF, TXB, TXN;
uniform float       WIDTH,    HEIGHT,   H2W,      
                    R1,  R2,  R3,  R4,  R5,
                    N1,  N2,  N3,  N4,  N5,
                    MLS, FRC, FSK,
                    A,   B,   C,
                    MX,  MY,  alpha;

#define texture2D texture
#define gl_FragColor fragColor
                    
`;

// default code for a new filter
glsl.default = 
`myShaderName
@ uv2d;
vec4  img = texture2D(TXP, uv);
      output = img;`;

// add some lines after the code to simplify navigation
for (let i=0; i<10; i++) { glsl.default +='\n'; }