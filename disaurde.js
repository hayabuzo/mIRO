glsl.packnames.push('Disaurde v.303');    
glsl.presets.push(`

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

mo ds-303
@ // Crop 1/4

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img_out = texture2D(TXP, uv*0.5+vec2(MX,MY)*0.5);

      gl_FragColor = img_out;
			
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

mi ds-303
@ // Edges Only

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img_out;
  
float weight = abs(dot(texture2D(TXP, vec2 (uv.x-(1.0/WIDTH), uv.y      )).rgb,vec3(0.33333)) - 
                   dot(texture2D(TXP, vec2 (uv.x+(1.0/WIDTH), uv.y      )).rgb,vec3(0.33333)))+
               abs(dot(texture2D(TXP, vec2 (uv.x     , uv.y-(1.0/HEIGHT))).rgb,vec3(0.33333)) - 
                   dot(texture2D(TXP, vec2 (uv.x     , uv.y+(1.0/HEIGHT))).rgb,vec3(0.33333)));

      img0.rgb = vec3(weight);
      if (A==1.0)   img_out = 1.0-img0; else img_out = img0;
      if (B==1.0)   img_out = mix(A==0.0?vec4(0.0):vec4(1.0),texture2D(TXP,uv),weight*2.0);
      img_out.a = texture2D(TXP,uv).a;

      img_out = clamp(img_out, vec4(0.0), vec4(1.0));
      gl_FragColor = img_out;
			
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

ma ds-303
@ // Mix 4/4

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img_out;
vec4  q1, q2, q3, q4;

float mixingv =  A;
float BW =       B;
float mixmode =  EXL ( MX , 0.0 , 03.00 );
  
      q1 = texture2D(TXP, vec2(   uv.x*0.50,                                    uv.y*0.50	          ));    
      q2 = texture2D(TXP, vec2(   BW==0.0?(uv.x*0.50+0.50):(1.0-uv.x*0.50),     uv.y*0.50	          ));
      q3 = texture2D(TXP, vec2(   uv.x*0.50,                                    BW==0.0?(uv.y*0.50+0.50):(1.0-uv.y*0.50)));    
      q4 = texture2D(TXP, vec2(   BW==0.0?(uv.x*0.50+0.50):(1.0-uv.x*0.50),     BW==0.0?(uv.y*0.50+0.50):(1.0-uv.y*0.50)));
      
      // Overlay
      if (mixmode==0.0) {
        img0 = dot(q1.rgb*q2.rgb*q3.rgb*q4.rgb, vec3(0.33333)) < 0.5 ? 2.0*q1*q2*q3*q4 : 1.0-1.0*(1.0-q1)*(1.0-q2)*(1.0-q3)*(1.0-q4);
        img_out = 1.0-1.0*(1.0-img0)*(1.0-img0)*(1.0-img0)*(1.0-img0); }
      
      // Threshold Dark
      if (mixmode==1.0) {
        img0 = 
        step(0.5, dot(q4.rgb,vec3(0.33333))) < 0.5 ? q4 : step(0.5, dot(q3.rgb,vec3(0.33333))) < 0.5 ? q3 :
        step(0.5, dot(q2.rgb,vec3(0.33333))) < 0.5 ? q2 : q1;
        img_out = mix (img0, 1.0-1.0*(1.0-img0)*(1.0-img0)*(1.0-img0)*(1.0-img0), mixingv); }
      
      // Threshold Light  
      if (mixmode==2.0) {
        img0 = 
        step(0.5, dot(q4.rgb,vec3(0.33333))) > 0.5 ? q4 : step(0.5, dot(q3.rgb,vec3(0.33333))) > 0.5 ? q3 : 
        step(0.5, dot(q2.rgb,vec3(0.33333))) > 0.5 ? q2 : q1;
        img_out = mix (img0, img0*img0, mixingv); }
			
      // Lighten
      if (mixmode==3.0) {      
        img0 = max(max(q1,q3),max(q2,q4));                       
        img_out = mix (img0, img0*img0, mixingv); }
  
      img_out.a = q1.a+q2.a+q3.a+q4.a;
      img_out = clamp(img_out, vec4(0.0), vec4(1.0));
			
      gl_FragColor = img_out;
    
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

me ds-303
@ // Mosaic of images

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img_out;

float rndX = R1;
float rndY = R2;
float rndZ = R3;
  
    //                (move to center)       (move to rnds scaled from -1 to +1)    (set image scale)
    vec2 rsz = vec2(  (uv-vec2(0.5,0.5)  -  vec2((sin(rndX*100.0))*0.6, (cos(rndY*100.0))*0.6)) *  (rndZ*15.0+2.0));
    img_out = texture2D(TXP, rsz);
    
    if (R1<0.2*FSK) { img_out.a = img_out.a > 0.0 ? ( ((rsz.x > 0.01 && rsz.x < 0.99) && (rsz.y > 0.01 && rsz.y < 0.99)) ? 1.0 : 0.0) : 0.0; }
    else img_out.a = 0.0;

    img_out = clamp(img_out, vec4(0.0), vec4(1.0));
    gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

mu ds-303
@ // Blend with the camera

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;

float mixingv =  EXR ( MX , 0.0 , 01.00 );
float level =    EXR ( MY , 1.0 , 00.50 ) + 0.25;

float BW =       A;
float UD =       B+C;
  
      img0 = texture2D(TXC, uv);
      img1 = texture2D(TXP, uv);
      
float avg0 = dot(img0.rgb, vec3(0.33333));
float avg1 = dot(img1.rgb, vec3(0.33333));
      
      mixingv = mixingv*0.5;

float stepN;

      if (UD == 0.0) stepN = smoothstep(level-mixingv,level+mixingv,avg0);
      if (UD == 1.0) stepN = smoothstep(level-mixingv,level+mixingv,avg1);
      if (UD == 2.0) stepN = abs(smoothstep(level-mixingv,level+mixingv,avg0)-smoothstep(level-mixingv,level+mixingv,avg1));
    
      stepN = BW == 0.0 ? stepN : 1.0-stepN ;
      img_out = mix( img0, img1, stepN );

      img_out = clamp(img_out, vec4(0.0), vec4(1.0));
      gl_FragColor = img_out;
  
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

co ds-303
@ // Replace color

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img_out;
      img0 = texture2D(TXP, uv);

float Kin = EXR ( MX , 0.0 , 0.5 );
float Rin = EXR ( MX , 1.0 , 0.5 ) + Kin;
float Gin = EXR ( MX , 2.0 , 0.5 ) + Kin;
float Bin = EXR ( MX , 3.0 , 0.5 ) + Kin;
float Zin = EXR ( MX , 4.0 , 1.0 );
  
float Kou = EXR ( MY , 0.0 , 0.5 );
float Rou = EXR ( MY , 1.0 , 1.0 ) * Kou;
float Gou = EXR ( MY , 2.0 , 1.0 ) * Kou;
float Bou = EXR ( MY , 3.0 , 1.0 ) * Kou;
float Zou = EXR ( MY , 4.0 , 1.0 );
  
vec3  Cin = Zin > 0.75 ? vec3(1.0) : vec3(Rin,Gin,Bin);
vec3  Cou = Zou > 0.75 ? vec3(0.0) : vec3(Rou,Gou,Bou);
  
float dist = 1.0-distance(img0.rgb,Cin);

      img_out.rgb = mix(img0.rgb,Cou,dist);
			
			img_out.a = img0.a;
      gl_FragColor = img_out;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

ci ds-303
@ // Change color

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;
      img0 = texture2D(TXP, uv);

float Kin = EXR ( MX , 0.0 , 0.5 );
float Rin = EXR ( MX , 1.0 , 0.5 ) + Kin;
float Gin = EXR ( MX , 2.0 , 0.5 ) + Kin;
float Bin = EXR ( MX , 3.0 , 0.5 ) + Kin;
float Zin = EXR ( MX , 4.0 , 1.0 );
  
float Kou = EXR ( MY , 0.0 , 0.5 );
float Rou = EXR ( MY , 1.0 , 1.0 ) * Kou;
float Gou = EXR ( MY , 2.0 , 1.0 ) * Kou;
float Bou = EXR ( MY , 3.0 , 1.0 ) * Kou;
float Zou = EXR ( MY , 4.0 , 1.0 );
  
vec3  Cin = Zin > 0.75 ? vec3(1.0) : vec3(Rin,Gin,Bin);
vec3  Cou = Zou > 0.75 ? vec3(0.0) : vec3(Rou,Gou,Bou);

float dist = 1.0-distance(img0.rgb,Cin);

      img1.rgb = mix(img0.rgb,Cou,dist);
      dist = 1.0-distance(img0.rgb,Cou);
      img_out.rgb = mix(img1.rgb,Cin,dist);
			
			img_out.a = img0.a;
      gl_FragColor = img_out;
			
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

ca ds-303
@ // Accent color

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;
      img0 = texture2D(TXP, uv);

float Kin = EXR ( MX , 0.0 , 0.5 );
float Rin = EXR ( MX , 1.0 , 0.5 ) + Kin;
float Gin = EXR ( MX , 2.0 , 0.5 ) + Kin;
float Bin = EXR ( MX , 3.0 , 0.5 ) + Kin;
float Zin = EXR ( MX , 4.0 , 1.0 );
  
vec3  Cin = Zin > 0.75 ? vec3(1.0) : vec3(Rin,Gin,Bin);

float dist = 1.0-distance(img0.rgb,Cin);
float bw = dot(img0.rgb, vec3(0.2126,0.7152,0.0722));

      img_out.rgb = mix(vec3(bw),img0.rgb,dist);
			
			img_out.a = img0.a;
      gl_FragColor = img_out;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

ce ds-303
@ // Tone

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img_out;
      img0 = texture2D(TXP, uv);

float Kin = EXR ( MX , 0.0 , 0.5 );
float Rin = EXR ( MX , 1.0 , 0.5 ) + Kin;
float Gin = EXR ( MX , 2.0 , 0.5 ) + Kin;
float Bin = EXR ( MX , 3.0 , 0.5 ) + Kin;
float Zin = EXR ( MX , 4.0 , 1.0 );
  
float Kou = EXR ( MY , 0.0 , 0.5 );
float Rou = EXR ( MY , 1.0 , 1.0 ) * Kou;
float Gou = EXR ( MY , 2.0 , 1.0 ) * Kou;
float Bou = EXR ( MY , 3.0 , 1.0 ) * Kou;
float Zou = EXR ( MY , 4.0 , 1.0 );
  
vec3  Cin = Zin > 0.75 ? vec3(1.0) : vec3(Rin,Gin,Bin);
vec3  Cou = Zou > 0.75 ? vec3(0.0) : vec3(Rou,Gou,Bou);

float dist = 1.0-distance(img0.rgb,Cin);
float bw = dot(img0.rgb, vec3(0.2126,0.7152,0.0722));

      img_out.rgb = mix(vec3(bw),Cou,dist);
			
			img_out.a = img0.a;
      gl_FragColor = img_out;
			
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

cu ds-303
@ // Hue shift

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;
      img0 = texture2D(TXP, uv);

float Kin = EXR ( MX , 0.0 , 0.5 );
float Rin = EXR ( MX , 1.0 , 0.5 ) + Kin;
float Gin = EXR ( MX , 2.0 , 0.5 ) + Kin;
float Bin = EXR ( MX , 3.0 , 0.5 ) + Kin;
float Zin = EXR ( MX , 4.0 , 1.0 );

float Kou = EXR ( MY , 0.0 , 0.5 );
float Rou = EXR ( MY , 1.0 , 1.0 ) * Kou;
float Gou = EXR ( MY , 2.0 , 1.0 ) * Kou;
float Bou = EXR ( MY , 3.0 , 1.0 ) * Kou;
float Zou = EXR ( MY , 4.0 , 1.0 );
  
vec3  Cin = Zin > 0.75 ? vec3(1.0) : vec3(Rin,Gin,Bin);

float huewave = sin(FRC);
float dist = 1.0-distance(img0.rgb,Cin);

      img1.rgb = rgb2hsb(img0.rgb);
      img1.r = mix(img1.r, img1.r+huewave*4.0*Kou, dist);
      img1.rgb = hsb2rgb (img1.rgb);
      img_out.rgb = img1.rgb;
			
			img_out.a = img0.a;
      gl_FragColor = img_out;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

c- ds-303
@ // Invert

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;
      img0 = texture2D(TXP, uv);

      img_out.rgb = vec3(1.0)-img0.rgb;
			
			img_out.a = img0.a;
      gl_FragColor = img_out;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

do ds-303
@ // Barell & displace

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec2  uvx, uvd;
vec4  img0, img1, img_out;
      img0 = texture2D(TXP, uv);

float dir =   EXR ( MX , 0.0 , 99.99 ); 
float pwr =   EXR ( MY , 0.0 , 150.0 ); 
float sqz =   EXR ( MY , 1.0 , 99.99 ); 
  
      if (pwr >= 100.0) { pwr = 50.50; sqz = 50.50; }
    
float xShift = (img0.r*2.0-1.0) * (floor(dir)      -50.0)/100.0;
float yShift = (img0.g*2.0-1.0) * (fract(dir)*100.0-50.0)/100.0;
    
      uvx = abs(1.0-abs(1.0-uv+vec2(xShift,yShift)));
      uvd = uv2bar(uvx, pwr, sqz);
    
      img_out = texture2D( TXP , uvd );
			
      gl_FragColor = img_out;
  
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

di ds-303
@ // Sine

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img_out;

float frqX =  EXR ( MX , 0.0 , 10.00 ); 
float frqY =  EXR ( MX , 1.0 , 10.00 );     
float ampX =  EXR ( MX , 2.0 , 00.20 );     
float ampY =  EXR ( MX , 3.0 , 00.20 ); 

vec2  wave1, wave2;
    
float spdX = f2next(frqX)*5.0;
float spdY = f2next(frqY)*5.0;
    
      wave1.y = cos( uv.x * frqX + FRC * spdX ) * ampX;
      wave1.x = sin( uv.y * frqY + FRC * spdY ) * ampY;
    
      wave2.y = cos( uv.x * f2next(frqX)*10.0 + FRC * f2next(spdX)*3.0 ) * f2next(ampX)*0.2;
      wave2.x = sin( uv.y * f2next(frqY)*10.0 + FRC * f2next(spdY)*3.0 ) * f2next(ampY)*0.2;

      img_out = texture2D(TXP, abs( 1.0 - abs( 1.0 - uv + wave1 + wave2 )));
			
      gl_FragColor = img_out;
    
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

da ds-303
@ // Rain

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec2  uvd;
vec4  img_out;
    
float spd =   EXR ( MX , 0.0 , 03.00 ) + 1.0; 
float amt =   EXR ( MY , 0.0 , 01.50 ) + 0.5; 
    
      uvd.x =    (sin( uv.x*02.0 + (( FRC * 0.7) + 72.8 ) * 08.7 ) * 0.013 * 0.5)
              +  (sin( uv.x*02.4 + ((-FRC * 1.1) + 91.2 ) * 06.4 ) * 0.009 * 0.5)
              ;

      uvd.y =    (sin( uv.x*25.0 + (sin(FRC * 7.7)*0.17 + 03.5 ) * 15.7 ) * 0.010)
               + (sin( uv.x*19.0 + (sin(FRC * 1.3)*0.19 + 26.1 ) * 24.9 ) * 0.015)
               + (sin( uv.x*44.0 + (sin(FRC * 3.1)*0.21 + 34.3 ) * 37.2 ) * 0.013)
               + (sin( uv.x*76.0 + (sin(FRC * 8.6)*0.06 + 52.2 ) * 29.3 ) * 0.018)
               + (sin( uv.x*50.0 + (sin(FRC * 4.2)*0.14 + 10.8 ) * 12.4 ) * 0.016)
               
               + (sin( uv.y*25.0 + (-FRC*spd + 03.5 ) * 15.7 * 2.0) * 0.0010)
               + (sin( uv.y*19.0 + (-FRC*spd + 26.1 ) * 24.9 * 2.0) * 0.0015)
               + (sin( uv.y*44.0 + (-FRC*spd + 34.3 ) * 37.2 * 2.0) * 0.0013)
               + (sin( uv.y*76.0 + (-FRC*spd + 52.2 ) * 29.3 * 2.0) * 0.0018)
               + (sin( uv.y*50.0 + (-FRC*spd + 10.8 ) * 12.4 * 2.0) * 0.0016)
               ;
  
      img_out = texture2D(TXP,uv+uvd.yx*amt);
			
      gl_FragColor = img_out;
  
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

de ds-303
@ // Watercolor
  // code by Victor Li http://viclw17.github.io/2018/06/12/GLSL-Practice-With-Shadertoy/
	
vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec2  uvx;
vec4  img0, img_out;
      img0 = texture2D(TXP, uv);
    
float ampX =  EXR ( MX , 0.0 , 01.00 );     
float ampY =  EXR ( MX , 1.0 , 01.00 ); 
    
float spd  =  EXR ( MY , 0.0 , 05.00 );   
float pwr  =  EXR ( MY , 1.0 , 01.00 );   
    
      uvx = uv;
    
      for(int i=1; i<10; i++) {
        uvx.x+=0.3/float(i)*sin(float(i)*3.0*uvx.y+FRC*spd)+ampX;
        uvx.y+=0.3/float(i)*cos(float(i)*3.0*uvx.x+FRC*spd)+ampY;
      }
			
float r=cos (uvx.x+uvx.y+1.0)*0.5+0.5;
float g=sin (uvx.x+uvx.y+1.0)*0.5+0.5;
float b=(sin(uvx.x+uvx.y)+cos(uvx.x+uvx.y))*0.5+0.5;

      img0.rgb = vec3(r,g,b);
      img_out = texture2D(TXP,abs( 1.0 - abs( 1.0 - uv +img0.rb*pwr)));
    
      gl_FragColor = img_out;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

po ds-303
@ // Feedback Blend Normal

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img2blend(img0,fb,0.0,fbk_work,tun);
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

pi ds-303
@ // Threshold Lighten

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img2blend(img0,fb,1.0,fbk_work,tun);
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

pa ds-303
@ // Zebra

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img2blend(img0,fb,2.0,fbk_work,tun);
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

pe ds-303
@ // Substract

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img2blend(img0,fb,3.0,fbk_work,tun);
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

pu ds-303
@ // Screen

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img2blend(img0,fb,4.0,fbk_work,tun);
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

p- ds-303
@ // Difference

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      //if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      //if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img2blend(img0,fb,5.0,fbk_work,tun);
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

p_ ds-303
@ // Divide

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img2blend(img0,fb,6.0,fbk_work,tun);
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

pau ds-303
@ // Feedback blur

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img2blend(img0,texture2D(TXF,uv),0.0,0.89+bst*0.1,0.0);
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

pho ds-303
@ // Alpha blur

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img0;
    img_out.a = bst*0.2;
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

pzi ds-303
@ // Black cutoffs

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out, fb;  
      img0 = texture2D(TXP,uv);
			
float avg = dot(img0.rgb, vec3(0.33333));
float wink = HEIGHT/WIDTH;
      
float depth = EXR ( MY , 0.0 , 99.99 );
float ang =   MX*TWO_PI;

float num =   10.0;
float dir =   B + C*2.0;   
float pat =   A + step(0.5,MY);  

float bst =   1.0-MX ;  // ( MY , 0.0 , 01.00 );
float tun =   1.0;      //EXR ( MY , 1.0 , 01.00 );
float pim =   1.0;      //EXR ( MX , 1.0 , 01.00 );  

float angleX, angleY, inX, inY, fbk_work, aimX, aimY; 
float kdown1, kdown2, kdown3, kdown4;

if (pat == 0.0) { 
      fbk_work = 0.9+bst*0.15;       img1 = texture2D(TXP,uv);
      kdown1 = 0.1;                  kdown2 = 0.2;
      kdown3 = 1.0;                  kdown4 = 1.0;
}
    
if (pat == 1.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink)); 
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      kdown1 = 1.0;                kdown2 = 1.0;
      kdown3 = img1.r*25.0;        kdown4 = img1.g*25.0;
} 
    
if (pat == 2.0) {
      fbk_work = 1.1-bst*0.5;
      vec2  uvm = vec2(ceil(uv.x*num)/num, ceil(uv.y*num*wink)/(num*wink));
      img1 = ceil(texture2D(TXP,uvm)*num)/num;  
      if (pim>0.5) img0 = img1;
      img1 = distance( 
            vec2(uv.x,uv.y*wink), 
            vec2(uvm.x-0.5/num,(uvm.y*wink-0.5/num) ) ) 
            < dot(img1.rgb, vec3(0.33333))*0.5/num ? 
						img1 : vec4(0.0);    
      kdown1 = 1.0;               kdown2 = 1.0;
      kdown3 = img1.r*25.0;       kdown4 = img1.g*25.0;
} 
    
      aimX = cos(ang)*7.0 * 0.1/kdown1;      aimY = sin(ang)*7.0 * 0.1/kdown1;
  
    ///
    
if (dir==0.0) { // Still
      fb = texture2D(TXF,uv );
      fbk_work = 0.92; } 

if (dir==1.0) { // Curly
      angleX = (sin(img1.r * aimX*kdown1 * TWO_PI)) * 0.015 * kdown2;
      angleY = (cos(img1.g * aimY*kdown1 * TWO_PI)) * 0.015 * kdown2;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); } 
			
 if (dir==2.0) { // Straight
      angleX = (sin(img1.r * TWO_PI)) * 0.005 * aimX * kdown2*kdown1;
      angleY = (cos(img1.g * TWO_PI)) * 0.005 * aimY * kdown2*kdown1;
      fb = texture2D(TXF,uv + vec2(angleX,-angleY) * fbk_work); }
		
if (dir==3.0) { // Tunnel
      angleX = (aimX+50.0) * 0.0001 ;
      angleY = (aimY+50.0) * 0.0001 ;
      inX = (floor(depth)      -50.0)*2.0*0.0001*kdown3;
      inY = (fract(depth)*100.0-50.0)*2.0*0.0001*kdown4;
      fb = texture2D(TXF,uv * vec2(1.0+inX,1.0+inY)+vec2(-angleX*inX*100.0,-angleY*inY*100.0)); }
    
    img_out = img0;
    img_out.a = avg*9.0;
		//                          !!!
  
    if (dot(img_out.rgb, vec3(0.33333)) > 1.0) img_out.rgb = img0.rgb;
    if (dot(img_out.rgb, vec3(0.33333)) < 0.0) img_out.rgb = vec3(1.0)-img0.rgb;
		
		gl_FragColor = img_out;
		
		
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

so ds-303
@ // Vertical
		
vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;

      img0 = texture2D( TXP , uv );
  
float len =   EXR ( MY , 0.0 , 00.10 ) ;
float aimX =  EXR ( MX , 0.0 , 02.00 ) - 01.00 ;
float aimY =  EXR ( MY , 1.0 , 02.00 ) - 01.00 ;    
float sub =   A+B;

float pos;
  
if (sub == 0.0) pos =  mod(FRC,1.0);
if (sub == 1.0) pos =  1.0-mod(FRC,1.0);
if (sub == 2.0) pos =  f2saw(mod(FRC,1.0)*2.0);

float avg = dot(img0.rgb, vec3(0.33333));

if (uv.y>pos-len/2.0 && uv.y<pos+len/2.0) img_out = img0;

      gl_FragColor = img_out;
			
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

si ds-303
@ // Threshold

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;

      img0 = texture2D( TXP , uv );
  
float len =   EXR ( MY , 0.0 , 00.10 ) ;
float aimX =  EXR ( MX , 0.0 , 02.00 ) - 01.00 ;
float aimY =  EXR ( MY , 1.0 , 02.00 ) - 01.00 ;    
float sub =   A+B;

float pos;
  
if (sub == 0.0) pos =  mod(FRC,1.0);
if (sub == 1.0) pos =  1.0-mod(FRC,1.0);
if (sub == 2.0) pos =  f2saw(mod(FRC,1.0)*2.0);

float avg = dot(img0.rgb, vec3(0.33333));

if (pos>0.0) if (step(pos+len,avg)<0.5 && step(pos-len,avg)>0.5) img_out = img0;

      gl_FragColor = img_out;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

sa ds-303
@ // Copy

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;

      img0 = texture2D( TXP , uv );
  
float len =   EXR ( MY , 0.0 , 00.10 ) ;
float aimX =  EXR ( MX , 0.0 , 02.00 ) - 01.00 ;
float aimY =  EXR ( MY , 1.0 , 02.00 ) - 01.00 ;    
float sub =   A+B;

float avg = dot(img0.rgb, vec3(0.33333));

// Distorted
if (sub == 0.0) {
  img0 = texture2D(TXP, uv);
  float xShift = (img0.r*2.0-1.0) * aimX * cos(FRC);
  float yShift = (img0.g*2.0-1.0) * aimY * sin(FRC); 
  img_out = texture2D(TXP, abs(1.0-abs(1.0-uv +vec2(xShift,yShift))));
  avg = dot(img0.rgb, vec3(0.33333));
  float thr;
  float alt = (sin(FRC*0.2)+1.0);
  if (alt <= 1.0)                thr = step((sin(FRC)*0.45+0.55), avg);
  if (alt >  1.0)                thr = step((sin(FRC)*0.45+0.25), avg) - step((sin(FRC)*0.45+0.55), avg);
  img_out.a = thr;
}

// Just
if (sub == 1.0) {
  img0 = texture2D(TXP, uv);
  img_out = texture2D(TXP, uv);
  avg = dot(img0.rgb, vec3(0.33333));
  float thr;
  float alt = (sin(FRC*0.2)+1.0);
  if (alt <= 1.0)                thr = step((sin(FRC)*0.45+0.55), avg);
  if (alt >  1.0)                thr = step((sin(FRC)*0.45+0.25), avg) - step((sin(FRC)*0.45+0.55), avg);
  img_out.a = thr;
}

// Alt
if (sub == 2.0) {
  img0 = texture2D(TXP, uv);
  float xShift = (img0.r*2.0-1.0) * aimX * cos(FRC);
  float yShift = (img0.g*2.0-1.0) * aimY * sin(FRC); 
  img_out = texture2D(TXP, abs(1.0-abs(1.0-uv +vec2(xShift,yShift))));
  avg = dot(img_out.rgb, vec3(0.33333));
  float thr;
  float alt = (sin(FRC*0.2)+1.0);
  if (alt <= 1.0)                thr = step((sin(FRC)*0.45+0.55), avg);
  if (alt >  1.0)                thr = step((sin(FRC)*0.45+0.25), avg) - step((sin(FRC)*0.45+0.55), avg);
  img_out = img0;
  img_out.a = thr;
}

      gl_FragColor = img_out;
			
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

se ds-303
@ // Delay
			
vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img0, img1, img_out;

      img0 = texture2D( TXP , uv );
  
float len =   EXR ( MY , 0.0 , 00.10 ) ;
float aimX =  EXR ( MX , 0.0 , 02.00 ) - 01.00 ;
float aimY =  EXR ( MY , 1.0 , 02.00 ) - 01.00 ;    
float sub =   A+B;

float pos;
  
if (sub == 0.0) pos =  mod(FRC,1.0);
if (sub == 1.0) pos =  1.0-mod(FRC,1.0);
if (sub == 2.0) pos =  f2saw(mod(FRC,1.0)*2.0);

float avg = dot(img0.rgb, vec3(0.33333));

      img1 = texture2D(TXF, uv);
float tick2 = mod(FRC,1.0)* 2.0;
if (tick2 > 1.0) tick2 -= 1.0;
      img_out.r = tick2 < 0.33                   ? img0.r : img1.r;
      img_out.g = tick2 >= 0.33 && tick2 <= 0.66 ? img0.g : img1.g;
      img_out.b = tick2 > 0.66                   ? img0.b : img1.b;
      img_out.a = img0.a;

      gl_FragColor = img_out;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

go ds-303
@ // Just Stamp

vec2 uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4 img0, img_output;
float time5 = FRC*100.0;
float wink = HEIGHT/WIDTH;
  
float aimX =  EXR ( MX , 0.0 , 02.00 ) - 01.00 ;
float aimY =  EXR ( MY , 1.0 , 02.00 ) - 01.00 ; 
float k1   =  EXR ( MX , 1.2 , 01.00 );
float k2   =  EXR ( MX , 1.4 , 01.00 );
float k3   =  EXR ( MX , 1.6 , 01.00 );
float k4   =  EXR ( MX , 1.8 , 01.00 );
float k5   =  EXR ( MX , 2.0 , 01.00 );

float sub  =  A;

float rndX =  R1;
float rndY =  R2;


vec2 uv2 = vec2(cos(time5),sin(time5)) + ( uv-vec2(cos(time5*k1),sin(time5*k1)) ) / sin(time5*k2);
img0 = texture2D(TXP, uv2);
float xShift = (img0.r*2.0-1.0) * aimX * cos(time5*k3);
float yShift = (img0.g*2.0-1.0) * aimY * sin(time5*k3); 
if (R1<0.1*FSK) img_output = texture2D(TXP, abs(1.0-abs(uv*sin(time5*k4) +vec2(xShift,yShift))));
float avg = dot(img_output.rgb, vec3(0.33333));
float isin = (sin(time5*k5))*0.5+0.5;
float thr = smoothstep(isin,isin+0.05,avg)-smoothstep(isin+0.25,isin+0.30,avg);
if (R1<0.1*FSK) img_output = vec4 (img0.r,img0.g,img0.b,img0.a > 0.0 ? thr*0.65 : 0.0);

      gl_FragColor = img_output;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

gi ds-303
@ // Alt Stamp

vec2 uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4 img0, img_output;
float time5 = FRC*100.0;
float wink = HEIGHT/WIDTH;
  
float aimX =  EXR ( MX , 0.0 , 02.00 ) - 01.00 ;
float aimY =  EXR ( MY , 1.0 , 02.00 ) - 01.00 ; 
float k1   =  EXR ( MX , 1.2 , 01.00 );
float k2   =  EXR ( MX , 1.4 , 01.00 );
float k3   =  EXR ( MX , 1.6 , 01.00 );
float k4   =  EXR ( MX , 1.8 , 01.00 );
float k5   =  EXR ( MX , 2.0 , 01.00 );

float sub  =  A;

float rndX =  R1;
float rndY =  R2;


vec2 rsz = vec2( uv - (vec2(rndX, rndY)-0.5)*2.0);
img0 = texture2D(TXP, rsz);  
float xShift = (img0.r*2.0-1.0) * aimX * cos(time5*k3);
float yShift = (img0.g*2.0-1.0) * aimY * sin(time5*k3); 
rsz += vec2(xShift,yShift)*0.5;
img0 = texture2D(TXP, rsz);   
float avg = dot(img0.rgb, vec3(0.33333));
float isin = (sin(time5*k5))*0.5+0.5;
float thr = smoothstep(isin,isin+0.05,avg)-smoothstep(isin+0.25,isin+0.30,avg);
vec3 img_color = texture2D(TXP, vec2(rndX,rndY)).rgb;
img_output.a = rsz.x > 0.01 && rsz.y > 0.01 && rsz.x < 0.99 && rsz.y < 0.99 ? thr : 0.0;
img_output.rgb = sin(time5) > 0.0 ?  (img_output.a > 0.0 ? img_color.rgb : img0.rgb) : img0.rgb;

      gl_FragColor = img_output;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

ga ds-303
@ // Pointilism

vec2 uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4 img0, img_output;
float time5 = FRC*100.0;
float wink = HEIGHT/WIDTH;
  
float aimX =  EXR ( MX , 0.0 , 02.00 ) - 01.00 ;
float aimY =  EXR ( MY , 1.0 , 02.00 ) - 01.00 ; 
float k1   =  EXR ( MX , 1.2 , 01.00 );
float k2   =  EXR ( MX , 1.4 , 01.00 );
float k3   =  EXR ( MX , 1.6 , 01.00 );
float k4   =  EXR ( MX , 1.8 , 01.00 );
float k5   =  EXR ( MX , 2.0 , 01.00 );

float sub  =  A;

float rndX =  R1;
float rndY =  R2;


float range = 0.1;
img0 = texture2D(TXP, vec2(rndX,rndY));
float avg = dot(texture2D(TXP, uv).rgb, vec3(0.33333));
float pavg = dot(texture2D(TXP, vec2(rndX,rndY)).rgb, vec3(0.33333));
img_output = (pow((uv.x-rndX),2.0)+pow((uv.y-rndY)*wink,2.0) < pow(avg*0.1+avg*k1*0.2,2.0)) 
  && avg<(pavg+range) && avg>(pavg-range) ? (sub == 0.0 ? img0 : texture2D(TXP, uv)) : vec4(0.0);

      gl_FragColor = img_output;

`+/* -------------------------- END OF PRESETS LIST -------------------------- */``);