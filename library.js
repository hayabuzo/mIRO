glsl.library = ``;

glsl.library += `/**`+sketch+` `+ver+` 

LIST OF FUNCTIONS

  @ - Add a shader into filter

┌—————————————————————————————————┐
│                                 │
│             Uniforms            │
│                                 │
└—————————————————————————————————┘

● sampler2D:

  TXC - Camera image
  TXP - Processed image from previous shader
  TXB - Blured processed image
  TXF - Feedback image from previous frame

● float:

  WIDTH   - Width of image in pixels 
  HEIGHT  - Height of image in pixels 
  H2W     - Ratio of width to height
  R1...R5 - Random floats [0...1]
  N1...N5 - Noise floats [0...1], from slow N1 to fast N5
  MLS     - Milliseconds: millis()/1000
  FRC     - Processed Frame Count: frameCount/60 
  FSK     - Frame Skip: 60/frameRate()
  MX      - Mouse X regarding PLAY button [0...1]  
  MY      - Mouse Y regarding PLAY button [0...1]
  A,B,C   - Shader control variables [0.0,1.0]

┌—————————————————————————————————┐
│                                 │
│         GLSL Functions          │
│                                 │
└—————————————————————————————————┘

● Functions are component-wise (float/vec2/vec3/vec4):

  vec4 radians(vec4 degrees);      vec4 degrees(vec4 radians);
  vec4 sin(vec4 angle);            vec4 cos(vec4 angle);           vec4 tan(vec4 angle);
  vec4 asin(vec4 x);               vec4 acos(vec4 x);              vec4 atan(vec4 y, vec4 x);
  vec4 pow(vec4 x, vec4 y);        vec4 sqrt(vec4 x);              vec4 inversesqrt(vec4 x);
  vec4 exp(vec4 x);                vec4 exp2(vec4 x);  
  vec4 log(vec4 x);                vec4 log2(vec4 x);  
  vec4 abs(vec4 x);                vec4 sign(vec4 x);              vec4 fract(vec4 x);
  vec4 floor(vec4 x);              vec4 ceil(vec4 x);           
  
  vec4 mod(vec4 x, vec4/float y);  
  vec4 min(vec4 x, vec4/float y);  
  vec4 max(vec4 x, vec4/float y);
  vec4 step(vec4/float edge, vec4 x)
  vec4 smoothstep(vec4/float edge0, vec4/float edge1, vec4 x)
  vec4 clamp(vec4 x, vec4/float minVal, vec4/float maxVal)
  vec4 mix(vec4 x, vec4 y, vec4/float a)
  
  float length(vec4 x);            float distance(vec4 p0, vec4 p1);
  float dot(vec4 x, vec4 y);       vec3 cross(vec3 x, vec3 y);
  vec4 normalize(vec4 x);          vec4 faceforward(vec4 N, vec4 I, vec4 Nref);
  vec4 reflect(vec4 I, vec4 N);    
  
  mat4 matrixCompMult(mat4 x, mat4 y);
  
  vec4 texture2D(sampler2D sampler, vec2 coord);
  vec4 textureCube(samplerCube sampler, vec3 coord);

┌—————————————————————————————————┐
│                                 │
│            Shortcuts            │
│                                 │
└—————————————————————————————————┘*/

#define PI 3.14159265359             
#define TWO_PI 6.28318530718
#define tx2d texture2D
#define uv2d vec2 uv=vec2(vTexCoord.x,(1.0-vTexCoord.y))

/**┌—————————————————————————————————┐
│                                 │
│             Floats              │
│                                 │
└—————————————————————————————————┘*/

/* Float to Zero Centered */
float f2z ( float f ) {
  return f*2.0-1.0; }
  
/* Zero Centered to Float */
float z2f ( float z ) {
  return z*0.5+0.5; }
  
/* Float Constrain */
float f2f ( float f ) {
  return clamp(f,0.0,1.0); }
  
/* Zero Centered Constrain */
float z2z ( float z ) {
  return clamp(z,-1.0,1.0); }

/* Float to Random */
float f2rand( float f ) { 
  f = floor(sin(f)*9462.7)*0.0136;
  f = floor(cos(f)*7294.6)*0.0178;
  return fract(f); }
  
/* Float to Slit */
float f2slit ( float f, float lvl, float len, float smt ) { 
  return smoothstep(lvl-len*0.5-smt,lvl-len*0.5    ,f) - 
         smoothstep(lvl+len*0.5    ,lvl+len*0.5+smt,f); }
         
/* Float to Map */
float f2map( float value, float min1, float max1, float min2, float max2 ) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1); }

/* Float to S-Curve */
float f2scrv( float f, float amt, float shft ) {
  return f - sin(f*TWO_PI+shft*PI)*0.3*amt; }

/* Float to Image */
vec4 f2img (float f) {
  return vec4(f,f,f,1.0); }

/**┌—————————————————————————————————┐
│                                 │
│              Grid               │
│                                 │
└—————————————————————————————————┘*/

/* Grid to Float Random  */
float uv2frand( vec2 uv ) {
  return f2rand(dot(uv,vec2((uv.x+f2rand(uv.y)),(uv.y*f2rand(uv.x))))); }

/* Expand Grid */
vec2 uv2exp ( vec2 uv, float mz, float mx, float my ) {
  return vec2( uv.x*(1.0-mz)+mz*0.5+mx , uv.y*(1.0-mz)+mz*0.5+my ); }
  
/* Displace Straight */
vec2 uv2dspxy( vec2 uv, float dx, float dy ) {
  return vec2(uv.x + dx, uv.y + dy ); }
  
/* Displace Angular */
vec2 uv2dspmd( vec2 uv, float m, float d ) {
  return vec2(uv.x + m * cos(d*TWO_PI), uv.y + m * sin(d*TWO_PI) * H2W ); }
  
/* Posterization (Pixelate) */
float f2p( float f , float s ) { 
  return f-mod(f,s); }
vec2 uv2p( vec2 uv, float s ) {
  return vec2(uv.x-mod(uv.x,s),uv.y-mod(uv.y,s*H2W)); }
vec2 uv2p( vec2 uv, float sx, float sy ) {
  return vec2(uv.x-mod(uv.x,sx),uv.y-mod(uv.y,sy)); }
vec3 rgb2p( vec3 rgb, float s ) {
  return rgb-mod(rgb,vec3(s)); }
vec3 rgb2p( vec3 rgb, vec3 s ) {
  return rgb-mod(rgb,s); }

/* Cartesian to Polar */
vec2 xy2md( vec2 xy ) {
  return vec2( 
    sqrt( pow(xy.x,2.0) + pow(xy.y,2.0) ) ,
    atan(xy.y,xy.x) ); }

/* Polar to Cartesian */
vec2 md2xy( vec2 md ) {
  return vec2( 
    md.x * cos(md.y) ,
    md.x * sin(md.y) ); }
  
/* Barrel Distortion */
vec2 uv2brl( vec2 uv, float pwr ) {
  uv.y = uv.y * (HEIGHT/WIDTH);  
  uv = md2xy(xy2md(uv - 0.5) + vec2(pwr-0.5,0.0)) + 0.5;
  uv.y = uv.y * (WIDTH/HEIGHT);  
  return uv; }
  
/* Glass Brick Distortion */
vec2 uv2gbr( vec2 uv, float s, float pwr ) {
  return mix(uv,uv-sin((mod(uv,s)/s-0.5)*TWO_PI),pwr*s*0.15); }
  
/* Rotation */
vec2 uv2rot( vec2 uv, float ang ) {
  uv -= 0.5; uv.y /= H2W;
  uv *= mat2(cos(ang), -sin(ang), sin(ang),  cos(ang));
  uv.y *= H2W; uv += 0.5; 
	return uv; }
  
/* Transform */
vec2 uv2tr( vec2 uv, vec2 anchor, float angle, float resize ) {
  uv.y /= H2W;
  anchor.y /= H2W;
  uv -= anchor;
  uv *= mat2(cos(angle) , -sin(angle) ,
             sin(angle) ,  cos(angle) );
  uv /= resize; 
  uv += anchor;
  uv.y *= H2W;
  return uv; }
  
/* Skew */
vec2 uv2skew( vec2 uv, vec2 skew ) {
  return uv *= mat2( 
  1.0 , tan(skew.x) ,
  tan(skew.y), 1.0 ); }
	
/* Wave Distortion */
vec2 uv2wav( vec2 uv, float pwr, float time, float seed ) {
  vec2 amp = vec2(0.0); float frq = 1.0; 
  pwr *= 0.25; time *= 10.0;
  for (float i = 1.0; i<4.0; i+=1.0) {
    frq *= i+f2rand(i*seed);
    amp.x += cos( uv.y * frq + time * f2rand(frq) );
    amp.y += sin( uv.x * frq + time * f2rand(frq+seed) );
    uv += vec2(amp.x,amp.y*H2W)*pwr;
  } return uv; }
	
/* Watercolor Distortion */
// Based on the code by Victor Li http://viclw17.github.io/2018/06/12/GLSL-Practice-With-Shadertoy/
vec2 uv2wtr( vec2 uv, float kx, float ky, float t) {
  kx = kx*2.0+0.01;
  vec2 t1 = vec2(kx,ky);
  vec2 t2 = uv;
  for(int i=1; i<10; i++) {
    t2.x+=0.3/float(i)*sin(float(i)*3.0*t2.y+t*kx)+t1.x;
    t2.y+=0.3/float(i)*cos(float(i)*3.0*t2.x+t*kx)+t1.y; }
  vec3 tc1;
  tc1.r=cos (t2.x+t2.y+1.0)*0.5+0.5;
  tc1.g=sin (t2.x+t2.y+1.0)*0.5+0.5;
  tc1.b=(sin(t2.x+t2.y)+cos(t2.x+t2.y))*0.5+0.5;
  uv = uv +(tc1.rb*vec2(2.0)-vec2(1.0))*ky;
  return uv; }

/**┌—————————————————————————————————┐
│                                 │
│             Canvas              │
│                                 │
└—————————————————————————————————┘*/

/* Absolute Canvas */
vec2 cnv2abs ( vec2 uv ) {
  return 1.0-abs(mod(uv,2.0)-1.0); }

/* Modulo Canvas */
vec2 cnv2mod ( vec2 uv ) {
  return mod(uv,1.0); }
	
/**┌—————————————————————————————————┐
│                                 │
│             Figures             │
│                                 │
└—————————————————————————————————┘*/

/* Centered Rectangle */
float fg2rect ( vec2 uv, vec2 pos, vec2 d,  float s ) {
  d *= 0.5;  s = (d.x+d.y)*0.5*s;  pos.y /= H2W; uv.y /= H2W;  d.y /= H2W;
  return (smoothstep(pos.x-d.x-s,pos.x-d.x+s,uv.x) - smoothstep(pos.x+d.x-s,pos.x+d.x+s,uv.x))
       * (smoothstep(pos.y-d.y-s,pos.y-d.y+s,uv.y) - smoothstep(pos.y+d.y-s,pos.y+d.y+s,uv.y)); }

/* Centered Square */
float fg2rect ( vec2 uv, vec2 pos, float d, float s ) {
  d *= 0.5;  s = d*s;  uv.y /= H2W;  pos.y /= H2W;
  return (smoothstep(pos.x-d-s,pos.x-d+s,uv.x) - smoothstep(pos.x+d-s,pos.x+d+s,uv.x))
       * (smoothstep(pos.y-d-s,pos.y-d+s,uv.y) - smoothstep(pos.y+d-s,pos.y+d+s,uv.y)); }

/* Centered Circle */
float fg2circ ( vec2 uv, vec2 pos, float d, float s) {
  d *= 0.5; d *= 1.0+s*0.5; d += 0.0001; s += 0.0001;
  return clamp((1.0-distance(uv/vec2(1.0,H2W),vec2(pos.x,pos.y/H2W))*(1.0/d))*(1.0/s),0.0,1.0); }
	
/* Random Dashes */
float fg2dash ( vec2 uv, float seed, float pwr, float d, float s) {
  float r1 = f2rand(seed + 0.1);  float r2 = f2rand(seed + 0.2);
  float r3 = f2rand(seed + 0.3);  float r4 = f2rand(seed + 0.4);
  float r5 = f2rand(seed + 0.5);
  vec2 uvw = uv2wtr(uv, r1, r2*pwr*5.0+pwr, r3);
  return fg2circ (cnv2abs(uvw),vec2(r4, r5), d, s); }
	
/* Random Drops */
float fg2drop ( vec2 uv, float seed, float pwr, float d, float s) {
  float r1 = f2rand(seed + 0.1);  float r2 = f2rand(seed + 0.2);
  float r3 = f2rand(seed + 0.3);  float r4 = f2rand(seed + 0.4);
  float r5 = f2rand(seed + 0.5);
  vec2 uvw = uv2wav(uv, r1*pwr*2.0+pwr, r2, r3);
  return fg2circ (cnv2abs(uvw),vec2(r4, r5), d, s); }

/**┌—————————————————————————————————┐
│                                 │
│              Color              │
│                                 │
└—————————————————————————————————┘*/

/* RGB to HSB Conversion */
vec3 rgb2hsb( vec3 c ) {
  // Color conversion function from Sam Hocevar: 
  // lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
  vec4   K = vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);
  vec4   p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4   q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float  d = q.x - min(q.w, q.y);
  float  e = 1.0e-10;
  return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)), d/(q.x+e), q.x); }

/* HSB to RGB Conversion */
vec3 hsb2rgb ( vec3 c ) {
  // Color conversion function from Sam Hocevar: 
  // lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
  vec4   K = vec4(1.0,2.0/3.0,1.0/3.0,3.0);
  vec3   p = abs(fract(c.xxx+K.xyz)*6.0-K.www);
  return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y); }

/* Color Negative */
vec3 rgb2neg ( vec3 c ) {
  return vec3(1.0)-c; }

/* Color Constrain */
vec3 rgb2rgb ( vec3 c ) {
  return clamp(c,vec3(0.0),vec3(1.0)); }

/* Color Replacement */
vec3 rgb2rpl( vec3 img, vec3 c0, vec3 c1 ) {
  return mix(img.rgb,c1,1.0-distance(img.rgb,c0)); }
  
/* Color Swap */
vec3 rgb2swp( vec3 img, vec3 c0, vec3 c1 ) {
  return mix(mix(img.rgb,c1,1.0-distance(img.rgb,c0)), c0, 1.0-distance(img.rgb,c1)); }
  
/* Color Selection */
vec3 rgb2sel( vec3 img, vec3 sel, vec3 bg ) {
  return mix(img.rgb,bg,distance(img.rgb,sel)); }

/* Hue Tune & Replace  */
vec3 rgb2ht( vec3 img, float t) {
  img.rgb = rgb2hsb(img.rgb);
  img.r = img.r+t;
  return hsb2rgb(img.rgb); }
vec3 rgb2hr( vec3 img, float t) {
  img.rgb = rgb2hsb(img.rgb);
  img.r = t;
  return hsb2rgb(img.rgb); }
    
/* Saturation Tune & Replace */
vec3 rgb2st( vec3 img, float t) {
  img.rgb = rgb2hsb(img.rgb);
  img.g = img.g+t;
  return hsb2rgb(img.rgb); }
vec3 rgb2sr( vec3 img, float t) {
  img.rgb = rgb2hsb(img.rgb);
  img.g = t;
  return hsb2rgb(img.rgb); }
    
/* Lightness Tune & Replace  */
vec3 rgb2lt( vec3 img, float t) {
  img.rgb = rgb2hsb(img.rgb);
  img.b = img.b+t;
  return hsb2rgb(img.rgb); }
vec3 rgb2lr( vec3 img, float t) {
  img.rgb = rgb2hsb(img.rgb);
  img.b = t;
  return hsb2rgb(img.rgb); }

/**┌—————————————————————————————————┐
│                                 │
│             Image               │
│                                 │
└—————————————————————————————————┘*/

/* Image to Grayscale */
float img2avg ( vec4 img ) { 
  return dot(img.rgb, vec3(0.33333)); }
float img2avg ( vec3 img ) { 
  return dot(img.rgb, vec3(0.33333)); }

/* Image to BW Conversion */
float img2bw ( vec4 img ) { 
  return dot(img.rgb, vec3(0.2126,0.7152,0.0722)); }
float img2bw ( vec3 img ) { 
  return dot(img.rgb, vec3(0.2126,0.7152,0.0722)); }

/**┌—————————————————————————————————┐
│                                 │
│              Alpha              │
│                                 │
└—————————————————————————————————┘*/

/* Show Alpha Channel */
vec4 a2rgb ( vec4 img ) { 
  return vec4(img.a,img.a,img.a,1.0); }
  
/* Fit Alpha to Canvas */
float a2cnv ( vec2 uv ) { 
  return step(uv.x,1.0)*step(uv.y,1.0)*step(0.0,uv.x)*step(0.0,uv.y); }

/**┌—————————————————————————————————┐
│                                 │
│            Blending             │
│                                 │
└—————————————————————————————————┘*/

/* Threshold Lighten */
vec4 mix2trl (vec4 a, vec4 b, float tr) {
  vec4 m = (smoothstep(tr-0.02,tr+0.02,img2avg(b)) > 0.5) ? b : a;
  return mix(a,m,1.0); }
  
/* Threshold Darken */
vec4 mix2trd (vec4 a, vec4 b, float tr) {
  vec4 m = (smoothstep(tr-0.02,tr+0.02,img2avg(b)) < 0.5) ? b : a;
  return mix(a,m,1.0); }

/* Screen */
vec4 mix2scr (vec4 a, vec4 b, float tr) {
  vec4 m = 1.0-(1.0-a)*(1.0-b);
  return mix(a,m,tr); }

/* Overlay */
vec4 mix2ovr (vec4 a, vec4 b, float tr) {
  vec4 m = (img2avg(b) <= 0.5) ? (2.0*a*b) : (1.0-2.0*(1.0-a)*(1.0-b));
  return mix(a,m,tr); }

/* Soft Light */
vec4 mix2sfl (vec4 a, vec4 b, float tr) {
  vec4 m = (img2avg(a) <= 0.5) ? ((2.0*a-1.0)*(b-b*b)+b) : ((2.0*a-1.0)*(sqrt(b)-b)+b);
  return mix(a,m,tr); }
  
/* Difference */
vec4 mix2dfr (vec4 a, vec4 b, float tr) {
  vec4 m = abs(a-b); m.a = 1.0;
  return mix(a,m,tr); }

/**┌—————————————————————————————————┐
│                                 │
│            Effects              │
│                                 │
└—————————————————————————————————┘*/

/* "Mrrror" Effect */  
// Based on https://github.com/hayabuzo/Graphic-Filters/tree/main/06.%20Mrrror
vec2 uv2mrr( vec2 uv, vec3 rgb, float m, float d) {
  rgb = ( rgb - mod(rgb,0.10) ) * ( 1.0/(1.0-0.10) );
  float angle = mod(rgb.b,0.1)*(10.0) * TWO_PI - PI;
  uv.y = uv.y * (HEIGHT/WIDTH);  
  vec2 shift = rgb.rg * vec2(m);
  vec2 t2 = xy2md(uv - shift);
  uv = md2xy(vec2(t2.x,t2.y + angle*d*PI) + shift);
  uv.y = uv.y * (WIDTH/HEIGHT);  
  return uv; }

`;

  