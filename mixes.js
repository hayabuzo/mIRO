glsl.packnames.push('Mixes Still');    
glsl.presets.push(`

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Aer-Ova

@  // Aeroplane  // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec2  uve = uv;
      uve = uv2exp(uv,-0.1*MY,0.0,0.0);
vec4  ime = tx2d(TXF, uve);
vec4  img = texture2D(TXP, uv);
vec2  uvw = cnv2abs(uv2wtr(uv,R4,R5,C*1000.0+0.5));
vec4  imw = texture2D(TXP, uvw);
float s = fg2circ(uvw,vec2(R1,R2),0.5*R3,0.1+A*0.5);
      s = mix(s,f2slit(imw.g,R3,0.1,0.1+A*0.5),B);
float a = 1.0-fg2rect(uve,vec2(0.5),vec2(1.0),A*0.3+0.01);
      img = mix(ime,img,clamp(a+s,0.0,1.0));
      gl_FragColor = img; 

 CABXY #

@  // Oval  // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  imb = texture2D(TXB, uv);
vec4  img = texture2D(TXP, cnv2abs(uv+imb.rb-vec2(0.5)));

float bw = img2avg(imb);
float k = MY*6.0*pow(abs(MX-bw),2.0);
vec4  ima = texture2D(TXP, uv2dspmd(cnv2abs(uv),f2z(imb.r)*k,f2z(imb.g)*k));

vec4  imp = texture2D(TXB, uv2p(uv,0.2*imb.r));
      k = 1.0-MY;
vec4  imz = texture2D(TXP, cnv2abs(uv2dspmd(uv,f2z(imp.r)*k,f2z(imp.b)*k)));

vec4  imo = mix(mix(img,ima,A),imz,B);

      gl_FragColor = imo;

 BCAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Aut-Aer

@  // Autechre  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float k = MY*0.25;
vec2  uvd = mix(
            uv2dspmd(uv,f2z(img.r)*k,f2z(img.b)*k),
            uv2wtr(uv,f2z(img.r)*k,f2z(img.b)*k,MLS),
            f2f(B-C));
vec4  imd = texture2D(TXB, uvd);

      k = MX;
vec2  uvn = mix(
            uv2dspmd(uv,f2z(imd.r)*k,f2z(imd.b)*k),
            cnv2abs(uv2wtr(uv,f2z(imd.r)*k,f2z(imd.b)*k,MLS)),
            B);
vec4  imn = texture2D(TXB, uvn);
float e = f2slit(img2bw(img),0.5,0.05,0.05);
      img.g = sin(img.g * TWO_PI*(0.5+MX));
      if(MY<0.5) img.g = abs(img.g);

vec4  ima = mix2scr(imn,vec4(vec3(e),1.0),1.0);
vec4  imb = mix2scr(imn,img.ggga,mix(0.5,0.1,C));

vec4  imo = mix(imd, ima, A);
      imo = mix(imo, imb, B);

      gl_FragColor = imo;

 ABCXY #

@  // Aeroplane  // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec2  uve = uv;
      uve = uv2exp(uv,-0.1*MY,0.0,0.0);
vec4  ime = tx2d(TXF, uve);
vec4  img = texture2D(TXP, uv);
vec2  uvw = cnv2abs(uv2wtr(uv,R4,R5,C*1000.0+0.5));
vec4  imw = texture2D(TXP, uvw);
float s = fg2circ(uvw,vec2(R1,R2),0.5*R3,0.1+A*0.5);
      s = mix(s,f2slit(imw.g,R3,0.1,0.1+A*0.5),B);
float a = 1.0-fg2rect(uve,vec2(0.5),vec2(1.0),A*0.3+0.01);
      img = mix(ime,img,clamp(a+s,0.0,1.0));
      gl_FragColor = img; 

 ACBXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Chr-Ova-Dee

@  // Chromeo  // v3

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec2  uv2 = uv;
      uv2.x = mix(uv.x, abs(0.5-uv.x), A);

vec4  imc = texture2D(TXB, uv2);
float k = 0.0+(1.0-MY)*3.0;

vec4  imd = texture2D(TXP, uv2dspmd(cnv2abs(uv),imc.r*k,imc.g*k));
vec4  imb = texture2D(TXP, uv2dspmd(cnv2abs(uv),imc.b*k,imc.r*k));

      gl_FragColor = mix2scr(imb,imd,1.0);


 ACBXY #


@  // Oval  // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  imb = texture2D(TXB, uv);
vec4  img = texture2D(TXP, cnv2abs(uv+imb.rb-vec2(0.5)));

float bw = img2avg(imb);
float k = MY*6.0*pow(abs(MX-bw),2.0);
vec4  ima = texture2D(TXP, uv2dspmd(cnv2abs(uv),f2z(imb.r)*k,f2z(imb.g)*k));

vec4  imp = texture2D(TXB, uv2p(uv,0.2*imb.r));
      k = 1.0-MY;
vec4  imz = texture2D(TXP, cnv2abs(uv2dspmd(uv,f2z(imp.r)*k,f2z(imp.b)*k)));

vec4  imo = mix(mix(img,ima,A),imz,B);

      gl_FragColor = imo;

 CCCXY #


@  // Deerhoof  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  ims = texture2D(TXP, uv);
vec4  img = texture2D(TXP, 
      cnv2mod(uv2brl(
        uv2mrr(uv,ims.rgb,0.0,MX),
        (1.0-MX)*3.0)
      *3.0*MY));
        
vec4  imo = texture2D(TXP, uv);
      imo.g = sin(imo.g * TWO_PI*(0.5+MX));
      imo.g = mix(imo.g,abs(imo.g),A);
      imo = mix(ims,img,imo.g);
      
      img = texture2D(TXP, uv2p(uv,0.01*(1.0-MY)));
vec4  imr = texture2D(TXP, 
      cnv2mod(uv2p(uv2brl(
          uv2mrr(uv,img.rgb,0.0,MX),
          (1.0-MX)*3.0),
        0.03) ));
      
vec4  imc = texture2D(TXP, uv);
float k = 1.0+(1.0-MY)*3.0;
vec4  imd = texture2D(TXP, uv2dspmd(cnv2abs(uv),imc.r*k,imc.g*k));
      imd = mix2sfl(imd,imr,1.0);
      imo = mix(imo,imd,B);

      gl_FragColor = imo;

 BCAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Got-Loc

@  // Goto80  // v8.2

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

vec4  imb = texture2D(TXB, uv);

float p = MY*0.5*mix(1.0,imb.r,C)*mix(1.0,0.01,B);
      imb.rgb *= mix(
        1.0/p*distance(uv2p(uv,p).y,uv.y-p*0.5*H2W),
        1.0/p*distance(uv2p(uv,p).x,uv.x-p*0.5), A);
vec2  uvd = mix(
        uv2exp(uv,0.0,0.0,imb.g),
        uv2exp(uv,0.0,imb.g,0.0), A);
vec4  imd = tx2d(TXP, uvd);//cnv2abs(uvd));
      imb = texture2D(TXB, uv);
      imd = mix(imb,imd,a2cnv(uvd));

      gl_FragColor = imd; 

 ABCXY #

@  // Locussolus  // v3

vec2  uv = vTexCoord;
      uv.y = 1.0 - uv.y;

vec4  imb = texture2D(TXB, uv);

float kx = H2W;
vec2  uvc = uv;
      uvc = uvc-vec2(0.5,0.5);
      uvc.x*= kx;  
float ang = PI*0.5;
mat2  rot = mat2(cos(ang), -sin(ang), sin(ang),  cos(ang));
      uvc = mix(uvc*rot,uvc,A);      

vec2  uvr = xy2md(uvc); 
      uvr.y/=TWO_PI;
      uvr = cnv2abs(uvr*2.0);

vec2  uvd = mix(uvr,cnv2abs(uv2tr(uvr,vec2(0.0),f2z(imb.r),1.0)),C);

vec4  imd = texture2D(TXP, uvd);

      gl_FragColor = imd; 

 BCBXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Jet-Dee

@  // Jetone  // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

float k2 = (1.0-MY)*0.2;
vec2  uv2 = uv2p(uv,k2);
vec4  img2 = texture2D(TXP, uv2);

vec2  uv3 = uv2p(uv,  mod(img2.r,0.1)*10.0*k2+0.02);
      uv3.y = mix(uv3.y,uv.y,A);
vec4  img3 = texture2D(TXP, uv3);

float k4 = 0.9;
vec4  img4 = texture2D(TXP, uv2exp(uv,0.5,f2z(img3.r)*k4,f2z(img3.b)*k4));

vec4  imo = mix(img3,img4,A);

      img2.rgb = mod(img2.rgb,0.1)*10.0;
      
      uv3 = uv2p(uv,  img2.r *k2+0.04);
      img3 = texture2D(TXP, uv3);
      img3.rgb = mod(img3.rgb,0.2)*5.0;
      
      k4 = MX*0.5;
float kz = f2z(img2.g)*MY;
vec2  uv4 = uv2exp(uv, kz, f2z(img3.r)*k4, f2z(img3.b)*k4*0.5);
      uv4.x = mod(uv4.x,1.0);
      img4 = texture2D(TXP, uv4);
      
      imo = mix(imo,img4,B);
      imo = mix2sfl(imo,img4,C);

      gl_FragColor = imo;

 CABXY #

@  // Deerhoof  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  ims = texture2D(TXP, uv);
vec4  img = texture2D(TXP, 
      cnv2mod(uv2brl(
        uv2mrr(uv,ims.rgb,0.0,MX),
        (1.0-MX)*3.0)
      *3.0*MY));
        
vec4  imo = texture2D(TXP, uv);
      imo.g = sin(imo.g * TWO_PI*(0.5+MX));
      imo.g = mix(imo.g,abs(imo.g),A);
      imo = mix(ims,img,imo.g);
      
      img = texture2D(TXP, uv2p(uv,0.01*(1.0-MY)));
vec4  imr = texture2D(TXP, 
      cnv2mod(uv2p(uv2brl(
          uv2mrr(uv,img.rgb,0.0,MX),
          (1.0-MX)*3.0),
        0.03) ));
      
vec4  imc = texture2D(TXP, uv);
float k = 1.0+(1.0-MY)*3.0;
vec4  imd = texture2D(TXP, uv2dspmd(cnv2abs(uv),imc.r*k,imc.g*k));
      imd = mix2sfl(imd,imr,1.0);
      imo = mix(imo,imd,B);

      gl_FragColor = imo;

 CBAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Kla-Roy

@  // Klaxons  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);
float k = MY*0.25;
vec4  img = texture2D(TXF, uv);
vec4  imb = texture2D(TXB, cnv2abs(uv2exp(uv,f2z(img.g)*k,f2z(img.r)*k,f2z(img.b)*k)));
      k = (1.0-MX)*0.5;
vec4  imn = texture2D(TXP, cnv2abs(uv2wtr(uv,f2z(imb.r)*k,f2z(imb.b)*k,MLS)));
float e = f2slit(img2bw(img),0.5,0.01,0.05);
      gl_FragColor = mix2scr(imn,vec4(vec3(e),1.0),1.0);

 CBAXY #

@  // Royksopp  // v8

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec4  img = texture2D(TXP, uv);
vec4  imb = tx2d(TXB, uv);

float k = 0.02;
vec2  uvf = uv2dspmd(uv, f2z(imb.r)*k, imb.b*PI);
      uvf = cnv2abs(uvf);

vec4  imf = tx2d(TXF, uvf);
      imf.rgb = imf.rgb*mix(1.0,mix(0.9,1.1,B),A);

float b = img2bw(img);
float a = smoothstep(0.3,0.6,b);

vec4  imo = mix(imf,img,mix(a,1.0-a,B));
      gl_FragColor = imo; 

 BCAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Per-EU

@  // Periskop  // v3

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
      
float kz = 1.0 - MY;
vec2  uvz = uv2exp( uv, 1.0-kz*kz, 0.0, 0.0);
vec4  imz = texture2D(TXP, uvz );

float kr = mix(0.0,mix(MX,1.0,B),abs(A-B));
vec2  uvt = (uv-0.5+kr*0.5)/kr;
vec4  img = texture2D(TXP, uvt);

float c = MX;
float a = 1.0-f2slit(uv.x,0.5,MX,mix(0.0,c,C))*f2slit(uv.y,0.5,MX,mix(0.0,c,C));
      a = mix(a2cnv(uvt),a,B);
      gl_FragColor = mix(imz,img,a); 

@  // EU  // v1

vec2  uv = vTexCoord;
      uv.y = 1.0 - uv.y;
  
float timer = MX*PI;
  
vec4  q1 = texture2D( TXP,  vec2( uv.x*0.5,      uv.y*0.5    ) );
vec4  q2 = texture2D( TXP,  vec2( uv.x*0.5+0.5,  uv.y*0.5    ) );
vec4  q3 = texture2D( TXP,  vec2( uv.x*0.5,      uv.y*0.5+0.5) );
vec4  q4 = texture2D( TXP,  vec2( uv.x*0.5+0.5,  uv.y*0.5+0.5) );

vec4  w1 = mix(q1,q2,smoothstep( abs(sin(timer*0.4))-0.1 , abs(sin(timer*0.4))+0.1 , vec4(q2.g,q2.g,q2.g,1.0) ));
vec4  w2 = mix(q2,q3,smoothstep( sin(sin(timer*0.5))-0.1 , abs(sin(timer*0.5))+0.1 , vec4(q3.g,q3.g,q3.g,1.0) ));
vec4  w3 = mix(q3,q4,smoothstep( abs(sin(timer*0.6))-0.1 , abs(sin(timer*0.6))+0.1 , vec4(q4.g,q4.g,q4.g,1.0) ));
vec4  w4 = mix(q4,q1,smoothstep( abs(sin(timer*0.7))-0.1 , abs(sin(timer*0.7))+0.1 , vec4(q1.g,q1.g,q1.g,1.0) ));

vec4  img_output;

vec4  qt = 1.0-(1.0-q1)*(1.0-q2)*(1.0-q3)*(1.0-q4);

      if (A > 0.5 && B > 0.5 && C > 0.5) img_output = max(max(q1,q2),max(q3,q4));
else  if (A > 0.5 && B > 0.5 && C < 0.5) img_output = mix(q1,q2,max(q3,q4));
else  if (A > 0.5 && B < 0.5 && C > 0.5) img_output = mix(q1,q2,smoothstep(0.4,0.6,vec4(q3.r,q3.r,q3.r,1.0)));
else  if (A > 0.5 && B < 0.5 && C < 0.5) img_output = max(max(w1,w3),max(w2,w4));
else  if (A < 0.5 && B > 0.5 && C > 0.5) img_output = mix(w1,w2,max(w3,w4));
else  if (A < 0.5 && B > 0.5 && C < 0.5) img_output = mix(w1,w2,smoothstep(0.4,0.6,vec4(w3.r,w3.r,w3.r,1.0)));
else  if (A < 0.5 && B < 0.5 && C > 0.5) img_output = qt;
else  if (A < 0.5 && B < 0.5 && C < 0.5) img_output = dot(qt.rgb, vec3(0.33333))>0.5 ? (qt-0.01)*(qt-0.01)*(qt-0.01) : 1.0 - 3.0*(1.0-qt)*(1.0-qt)*(1.0-qt);

      gl_FragColor = img_output;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Vib-Mon-Kla

@  // Vibravoid  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
      
      gl_FragColor = img;

 CBAXY #

@  // Monolake  // v10

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  imb = tx2d(TXB,uv);

vec2  uvs = vec2(uv.x,MY);
float k = f2z(MX)*3.5*imb.b;
      uvs.x = mix(uv.x,uv2dspxy(uvs, imb.r*k,imb.b*k).x,A);
vec4  img = texture2D(TXP, mix(cnv2mod(uvs),mix(cnv2mod(uvs),uv,step(R4,0.5)),B));
      img.a = f2slit(uvs.x,R1,0.1,0.1*imb.g)
      *sin(uv.x*PI);

vec2  uvd = vec2(MX,uv.y);
vec4  imd = tx2d(TXP,uvd);
      imd.a = f2slit(uv.y+f2z(imb.r)*0.1,R5,0.01*R2,0.01*R2)
      * f2slit(uv.x,R4,R3,0.1);

      gl_FragColor = mix(img,mix(img,imd,imd.a),C); 
      
 CABXY #

@  // Klaxons  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);
float k = MY*0.25;
vec4  img = texture2D(TXF, uv);
vec4  imb = texture2D(TXB, cnv2abs(uv2exp(uv,f2z(img.g)*k,f2z(img.r)*k,f2z(img.b)*k)));
      k = (1.0-MX)*0.5;
vec4  imn = texture2D(TXP, cnv2abs(uv2wtr(uv,f2z(imb.r)*k,f2z(imb.b)*k,MLS)));
float e = f2slit(img2bw(img),0.5,0.01,0.05);
      gl_FragColor = mix2scr(imn,vec4(vec3(e),1.0),1.0);

 CBAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Wor-Jet

@  // Workshop  // v1

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);

vec2  uvt = vec2(R1<0.4 ? uv.x : mod(uv.x,R4*0.1    )+R2,
      R1>0.6 ? uv.y : mod(uv.y,R4*0.1*H2W)+R3);
vec4  img = texture2D( TXP, uvt );
float s = R4*0.05 + 0.01;
vec2  uvp = vec2(uv.x-mod(uv.x,s), uv.y-mod(uv.y,s*H2W));
float imp = img2avg(texture2D( TXP, uvp ));
float lvl = img2avg(texture2D( TXP, vec2(R2,R3) ));
      s = R5*0.15;
      img.a = f2slit ( imp, lvl, s, s );
      img.a = clamp( img.a - f2slit ( img2avg(img), lvl, s, s ), 0.0,1.0);

      gl_FragColor = img;

 BACXY #

@  // Jetone  // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

float k2 = (1.0-MY)*0.2;
vec2  uv2 = uv2p(uv,k2);
vec4  img2 = texture2D(TXP, uv2);

vec2  uv3 = uv2p(uv,  mod(img2.r,0.1)*10.0*k2+0.02);
      uv3.y = mix(uv3.y,uv.y,A);
vec4  img3 = texture2D(TXP, uv3);

float k4 = 0.9;
vec4  img4 = texture2D(TXP, uv2exp(uv,0.5,f2z(img3.r)*k4,f2z(img3.b)*k4));

vec4  imo = mix(img3,img4,A);

      img2.rgb = mod(img2.rgb,0.1)*10.0;
      
      uv3 = uv2p(uv,  img2.r *k2+0.04);
      img3 = texture2D(TXP, uv3);
      img3.rgb = mod(img3.rgb,0.2)*5.0;
      
      k4 = MX*0.5;
float kz = f2z(img2.g)*MY;
vec2  uv4 = uv2exp(uv, kz, f2z(img3.r)*k4, f2z(img3.b)*k4*0.5);
      uv4.x = mod(uv4.x,1.0);
      img4 = texture2D(TXP, uv4);
      
      imo = mix(imo,img4,B);
      imo = mix2sfl(imo,img4,C);

      gl_FragColor = imo;

 ACBXY #

`+/* -------------------------- END OF PRESETS LIST -------------------------- */``);

glsl.packnames.push('Mixes Motion');    
glsl.presets.push(`

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Aer-Mor-Gas-Xen

@  // Aeroplane  // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec2  uve = uv;
      uve = uv2exp(uv,-0.1*MY,0.0,0.0);
vec4  ime = tx2d(TXF, uve);
vec4  img = texture2D(TXP, uv);
vec2  uvw = cnv2abs(uv2wtr(uv,R4,R5,C*1000.0+0.5));
vec4  imw = texture2D(TXP, uvw);
float s = fg2circ(uvw,vec2(R1,R2),0.5*R3,0.1+A*0.5);
      s = mix(s,f2slit(imw.g,R3,0.1,0.1+A*0.5),B);
float a = 1.0-fg2rect(uve,vec2(0.5),vec2(1.0),A*0.3+0.01);
      img = mix(ime,img,clamp(a+s,0.0,1.0));
      gl_FragColor = img; 

 aaaxY # 

@  // Morphine  // v15

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
float l = img2bw(texture2D(TXB, uv));

vec2  uvr = uv;
      if (A>0.5) uvr = uv2rot(uv,f2z(mix(N4,R4,B))*PI);

vec2  uve = uv2exp(uvr,-5.0*R1,f2z(R2),f2z(R3));
      uve = uv2wav(uve,0.015,R2,R3);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,f2z(MY)*0.04,0.0,0.0);
vec4  imf = texture2D(TXF, uvf);

float s = f2slit(img.g,R5,R4*0.1,R4*0.1);
float r = fg2rect(uve,vec2(0.5),1.1/H2W,0.02);
      r = clamp(r+1.0-a2cnv(uvf),0.0,1.0);
float d = fg2dash(uve,R1,0.75,0.05,0.1);
float q = fg2drop(uve,R1,1.0,0.075,0.1);

float a = clamp(s-r+(q*R4+d*R5),0.0,1.0);
      img.rgb *= 1.0 + f2z(l)*0.5 + (1.0-l)*f2z(uv2frand(uv-R2))*0.15;

      img = mix ( mix(imf,img,a) , mix2ovr(imf,img,a) , step(R3*R5,0.2)*(1.0-2.0*distance(img2avg(imf),0.5)));
      gl_FragColor = img; 

 Abcxy #

@  // Gas  // v4

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

vec2  uve = uv2exp(uv,-3.0,0.0,0.0);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,MY*0.1,0.0,0.0);
      if(C>0.5) uvf = uv2rot(uvf,0.05);
vec4  imf = texture2D(TXF, uvf);

float f;
      if (B<0.5) f = fg2circ(uve,vec2(0.5) ,0.9,A*0.5+0.01);
      else        f = fg2rect(uve,vec2(0.5) ,0.9,A*0.5+0.01);
			
      img = mix(imf,img,f);
      gl_FragColor = img;

 ABCXY # 

@  // Xenakis  // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
      
vec4  imc = texture2D(TXP, uv);
vec4  imb = texture2D(TXB, uv);
float v = (1.0-distance(uv.y,0.5)*2.0);
float k = 0.25*v;

vec2  uvh = vec2(uv.x,MY);
      
      uvh.x = uv2dspxy(uvh,f2z(imc.r)*k,f2z(imc.b)*k).x;
      uvh.x += (uv.y*f2z(R1) + R2)/H2W;
      uvh = uv2dspmd(uvh,f2z(imb.r)*B,f2z(imb.b)*B);
      
vec4  imh = texture2D(TXP, cnv2mod(uvh));
      imh.a *= f2slit(img2avg(imh),R2,0.1,0.1);
      if (R3>MX*(1.0-A)) imh.rgb = imc.rgb;

      gl_FragColor = imh; 

 CccXy # 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Aer-Vib-Gas

@  // Aeroplane  // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec2  uve = uv;
      uve = uv2exp(uv,-0.1*MY,0.0,0.0);
vec4  ime = tx2d(TXF, uve);
vec4  img = texture2D(TXP, uv);
vec2  uvw = cnv2abs(uv2wtr(uv,R4,R5,C*1000.0+0.5));
vec4  imw = texture2D(TXP, uvw);
float s = fg2circ(uvw,vec2(R1,R2),0.5*R3,0.1+A*0.5);
      s = mix(s,f2slit(imw.g,R3,0.1,0.1+A*0.5),B);
float a = 1.0-fg2rect(uve,vec2(0.5),vec2(1.0),A*0.3+0.01);
      img = mix(ime,img,clamp(a+s,0.0,1.0));
      gl_FragColor = img; 

 BAAxY # 

@  // Vibravoid  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
      
      gl_FragColor = img;

 aBaxY # 

@  // Gas  // v4

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

vec2  uve = uv2exp(uv,-3.0,0.0,0.0);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,MY*0.1,0.0,0.0);
      if(C>0.5) uvf = uv2rot(uvf,0.05);
vec4  imf = texture2D(TXF, uvf);

float f;
      if (B<0.5) f = fg2circ(uve,vec2(0.5) ,0.9,A*0.5+0.01);
      else        f = fg2rect(uve,vec2(0.5) ,0.9,A*0.5+0.01);
			
      img = mix(imf,img,f);
      gl_FragColor = img;

 aBcXY # 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Dee-Hex-Roy

@ // Deerhoof  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  ims = texture2D(TXP, uv);
vec4  img = texture2D(TXP, 
      cnv2mod(uv2brl(
        uv2mrr(uv,ims.rgb,0.0,MX),
        (1.0-MX)*3.0)
      *3.0*MY));
        
vec4  imo = texture2D(TXP, uv);
      imo.g = sin(imo.g * TWO_PI*(0.5+MX));
      imo.g = mix(imo.g,abs(imo.g),A);
      imo = mix(ims,img,imo.g);
      
      img = texture2D(TXP, uv2p(uv,0.01*(1.0-MY)));
vec4  imr = texture2D(TXP, 
      cnv2mod(uv2p(uv2brl(
          uv2mrr(uv,img.rgb,0.0,MX),
          (1.0-MX)*3.0),
        0.03) ));
      
vec4  imc = texture2D(TXP, uv);
float k = 1.0+(1.0-MY)*3.0;
vec4  imd = texture2D(TXP, uv2dspmd(cnv2abs(uv),imc.r*k,imc.g*k));
      imd = mix2sfl(imd,imr,1.0);
      imo = mix(imo,imd,B);

      gl_FragColor = imo;

@ // Hexstatic  // v2

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  img = texture2D(TXP, uv);

float speed = 0.01*mix(-MY,MY,A);
float k = mix(0.0,0.01*(1.0-MX),B);
vec2  uvf = uv2exp(uv, speed, f2z(N1)*speed, f2z(N2)*speed );

      uvf = mix(
        uvf, 
        vec2(0.0,0.0),
        f2f( 
          step(uvf.x,0.0)+step(uvf.y,0.0)+
          step(1.0,uvf.x)+step(1.0,uvf.y)) );

vec4  imf = texture2D( TXF, uv2dspmd(uvf,sin(img.r*TWO_PI)*k,sin(img.b*TWO_PI)*k) );

vec2  uva = uv+vec2(f2z(R2),f2z(R3))*R1*0.3;
      uva = cnv2mod(uva);
vec4  ima = texture2D( TXP,  uva );

float mask = f2slit ( img2avg(ima), R1, R2*0.05, R2*0.05 );
      mask += mix( 0.0, step(0.97, f2rand(img.r+N1))*N2, 1.0);
  
      img.rgb = mix(imf.rgb,img.rgb,mask);
      img.a = mix(1.0,mask,C);
  
      gl_FragColor = img;
      
@ // Royksopp  // v8

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec4  img = texture2D(TXP, uv);
vec4  imb = tx2d(TXB, uv);

float k = 0.02;
vec2  uvf = uv2dspmd(uv, f2z(imb.r)*k, imb.b*PI);
      uvf = cnv2abs(uvf);

vec4  imf = tx2d(TXF, uvf);
      imf.rgb = imf.rgb*mix(1.0,mix(0.9,1.1,B),A);

float b = img2bw(img);
float a = smoothstep(0.3,0.6,b);

vec4  imo = mix(imf,img,mix(a,1.0-a,B));
      gl_FragColor = imo; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Gas-Vib-Roy

@  // Gas  // v4

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

vec2  uve = uv2exp(uv,-3.0,0.0,0.0);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,MY*0.1,0.0,0.0);
      if(C>0.5) uvf = uv2rot(uvf,0.05);
vec4  imf = texture2D(TXF, uvf);

float f;
      if (B<0.5) f = fg2circ(uve,vec2(0.5) ,0.9,A*0.5+0.01);
      else        f = fg2rect(uve,vec2(0.5) ,0.9,A*0.5+0.01);
			
      img = mix(imf,img,f);
      gl_FragColor = img;

 ABCXY #

@  // Vibravoid  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
      
      gl_FragColor = img;

 CBAXY #

@  // Royksopp  // v8

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec4  img = texture2D(TXP, uv);
vec4  imb = tx2d(TXB, uv);

float k = 0.02;
vec2  uvf = uv2dspmd(uv, f2z(imb.r)*k, imb.b*PI);
      uvf = cnv2abs(uvf);

vec4  imf = tx2d(TXF, uvf);
      imf.rgb = imf.rgb*mix(1.0,mix(0.9,1.1,B),A);

float b = img2bw(img);
float a = smoothstep(0.3,0.6,b);

vec4  imo = mix(imf,img,mix(a,1.0-a,B));
      gl_FragColor = imo; 

 BACXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Int-Tim-Aer

@  // Interpol  // v6

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

float s = 0.1*MY;

vec2  r = vec2(R1,R2);

vec4  imr = tx2d(TXP,r);
vec3  c = rgb2hsb(imr.rgb);

vec2  pos = vec2(mod(c.r+MX,1.0),1.0-c.b);

vec2  uvs = uv+r-pos;
vec4  img = texture2D(TXP, cnv2abs(uvs));

           if (A < 0.5) img.a = fg2rect(uv,pos,s,mix(0.01,1.0,B));
      else if (A > 0.5) img.a = fg2circ(uv,pos,s,mix(0.01,1.0,B));

      gl_FragColor = img; 

 111XY #

@  // Timewriter  // v6

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));

float z = 2.0+R3*10.0;

float ang = R4*TWO_PI;

vec2  uvz = uv*z-vec2(R1*z,R2*z)+vec2(0.5);

uvz.y /= H2W;
float k = 5.0 * B;
vec2  uvr = uvz * mat2(cos(ang+N1*k) , -sin(ang+N2*k) ,sin(ang+N3*k) ,  cos(ang+N4*k) );

uvr.y *= H2W; uvz.y *= H2W;

vec2  uvf = mix(uvz, uvr, A);

      uvf = uv2wtr(uvf,0.1*k*f2z(R3),0.1*k*f2z(R4),MLS);

float a = step(uvf.x,1.0)*step(uvf.y,1.0)*step(0.0,uvf.x)*step(0.0,uvf.y);

vec4  img = texture2D(TXP, uvf);

      a = mix(a, a * f2slit( img2avg(img), R5, 0.3 , 0.1 ), C );
      img.a = a;

      gl_FragColor = img; 

 111XY #

@  // Aeroplane  // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec2  uve = uv;
      uve = uv2exp(uv,-0.1*MY,0.0,0.0);
vec4  ime = tx2d(TXF, uve);
vec4  img = texture2D(TXP, uv);
vec2  uvw = cnv2abs(uv2wtr(uv,R4,R5,C*1000.0+0.5));
vec4  imw = texture2D(TXP, uvw);
float s = fg2circ(uvw,vec2(R1,R2),0.5*R3,0.1+A*0.5);
      s = mix(s,f2slit(imw.g,R3,0.1,0.1+A*0.5),B);
float a = 1.0-fg2rect(uve,vec2(0.5),vec2(1.0),A*0.3+0.01);
      img = mix(ime,img,clamp(a+s,0.0,1.0));
      gl_FragColor = img; 

 111XY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Mea-Neu-Mon

@  // Meanderthals  // v8

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec2  uve = uv2exp(uv,-1.0-3.0*R3,f2z(R1),f2z(R2));
vec2  uvs = uv2rot(uv2exp(uv,-0.1,0.0,0.0),R4*PI)+vec2(R1);
      if (A<0.5) uvs = cnv2abs(uvs);
      else        uvs = cnv2mod(uvs);
vec4  ime = texture2D(TXP, uve);
vec4  ims = texture2D(TXF, uvs);
float a = f2slit(ime.g,R2,0.5*R3,0.1);
vec4  imo = mix(ims,ime,a2cnv(uve)*mix(1.0,a,B));
      gl_FragColor = imo; 

 BCAXY #

@  // Neu  // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  imc = texture2D(TXP, uv);
vec4  imf = texture2D(TXF, uv);
      imf.g = 1.0-imf.g;
      imc.g = mix(
        sin(imc.g*TWO_PI*(0.5+MX)),
        sin((imc.g+imf.g)*PI*(0.5+MX)),
        C);
      imc.g = mix(imc.g,abs(imc.g),A);

vec4  img = texture2D(TXP, uv);
      img.rgb=rgb2hsb(img.rgb);
      img.rgb = sin(img.rgb*vec3(TWO_PI*(0.5+MX)));
      img.g = mix(1.0-img.g, abs(1.0-img.g-imf.g), C);

      gl_FragColor = mix(imc.ggga,img.bbbg,B);

 BCAXY #

@  // Monolake  // v10

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  imb = tx2d(TXB,uv);

vec2  uvs = vec2(uv.x,MY);
float k = f2z(MX)*3.5*imb.b;
      uvs.x = mix(uv.x,uv2dspxy(uvs, imb.r*k,imb.b*k).x,A);
vec4  img = texture2D(TXP, mix(cnv2mod(uvs),mix(cnv2mod(uvs),uv,step(R4,0.5)),B));
      img.a = f2slit(uvs.x,R1,0.1,0.1*imb.g)
      *sin(uv.x*PI);

vec2  uvd = vec2(MX,uv.y);
vec4  imd = tx2d(TXP,uvd);
      imd.a = f2slit(uv.y+f2z(imb.r)*0.1,R5,0.01*R2,0.01*R2)
      * f2slit(uv.x,R4,R3,0.1);

      gl_FragColor = mix(img,mix(img,imd,imd.a),C); 
      
 ABCXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

mo-pi

@  // mo  // Crop 1/4

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
vec4  img_out = texture2D(TXP, uv*0.5+vec2(MX,MY)*0.5);

      gl_FragColor = img_out;
			
 abCxY #

@  // pi  // Threshold Lighten

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
		
 ABcxY #

@  // mu  // Blend with the camera

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
  
 ABcxY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Mor-End-Neu

@  // Morphine  // v15

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
float l = img2bw(texture2D(TXB, uv));

vec2  uvr = uv;
      if (A>0.5) uvr = uv2rot(uv,f2z(mix(N4,R4,B))*PI);

vec2  uve = uv2exp(uvr,-5.0*R1,f2z(R2),f2z(R3));
      uve = uv2wav(uve,0.015,R2,R3);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,f2z(MY)*0.04,0.0,0.0);
vec4  imf = texture2D(TXF, uvf);

float s = f2slit(img.g,R5,R4*0.1,R4*0.1);
float r = fg2rect(uve,vec2(0.5),1.1/H2W,0.02);
      r = clamp(r+1.0-a2cnv(uvf),0.0,1.0);
float d = fg2dash(uve,R1,0.75,0.05,0.1);
float q = fg2drop(uve,R1,1.0,0.075,0.1);

float a = clamp(s-r+(q*R4+d*R5),0.0,1.0);
      img.rgb *= 1.0 + f2z(l)*0.5 + (1.0-l)*f2z(uv2frand(uv-R2))*0.15;

      img = mix ( mix(imf,img,a) , mix2ovr(imf,img,a) , step(R3*R5,0.2)*(1.0-2.0*distance(img2avg(imf),0.5)));
      gl_FragColor = img; 

 ACBXY #

@  // Enduser  // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec4  img = texture2D(TXP, uv);
vec4  imf = tx2d(TXF, uv);

vec3  hsb = rgb2hsb(img.rgb);
      hsb.r = mod(hsb.r+MX,1.0);
float a = step(pow(1.0-MY,2.0),hsb.r*hsb.g*abs(sin(hsb.b*PI-PI/6.0)));

vec4  bgr = vec4(0.941, 0.866, 0.835, 1.0);
      bgr.rgb *= 1.0+f2z(uv2frand(uv-R2))*0.05;
      if (A>0.5) img = mix(bgr,img,a);

      hsb = rgb2hsb(imf.rgb);
      hsb.r = mod(hsb.r+MX,1.0);
      a = step(pow(1.0-MY,2.0),hsb.r*hsb.g*abs(sin(hsb.b*PI-PI/6.0)));

      if (B>0.5) imf.rgb = rgb2ht(imf.rgb,-0.01);
      if (C>0.5) imf.rgb -= (imf.rgb-vec3(1.0))*0.05;
      imf.rgb = clamp(imf.rgb,vec3(0.0),vec3(2.0));
      img = mix(img,imf,a);
      gl_FragColor = img; 

 ACBXY #

@  // Neu  // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  imc = texture2D(TXP, uv);
vec4  imf = texture2D(TXF, uv);
      imf.g = 1.0-imf.g;
      imc.g = mix(
        sin(imc.g*TWO_PI*(0.5+MX)),
        sin((imc.g+imf.g)*PI*(0.5+MX)),
        C);
      imc.g = mix(imc.g,abs(imc.g),A);

vec4  img = texture2D(TXP, uv);
      img.rgb=rgb2hsb(img.rgb);
      img.rgb = sin(img.rgb*vec3(TWO_PI*(0.5+MX)));
      img.g = mix(1.0-img.g, abs(1.0-img.g-imf.g), C);

      gl_FragColor = mix(imc.ggga,img.bbbg,B);

 CBAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Mor-Pic

@  // Morphine  // v15

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
float l = img2bw(texture2D(TXB, uv));

vec2  uvr = uv;
      if (A==1.0) uvr = uv2rot(uv,f2z(mix(N4,R4,B))*PI);

vec2  uve = uv2exp(uvr,-5.0*R1,f2z(R2),f2z(R3));
      uve = uv2wav(uve,0.015,R2,R3);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,f2z(MY)*0.04,0.0,0.0);
vec4  imf = texture2D(TXF, uvf);

float s = f2slit(img.g,R5,R4*0.1,R4*0.1);
float r = fg2rect(uve,vec2(0.5),1.1/H2W,0.02);
      r = clamp(r+1.0-a2cnv(uvf),0.0,1.0);
float d = fg2dash(uve,R1,0.75,0.05,0.1);
float q = fg2drop(uve,R1,1.0,0.075,0.1);

float a = clamp(s-r+(q*R4+d*R5),0.0,1.0);
      img.rgb *= 1.0 + f2z(l)*0.5 + (1.0-l)*f2z(uv2frand(uv-R2))*0.15;

      img = mix ( mix(imf,img,a) , mix2ovr(imf,img,a) , step(R3*R5,0.2)*(1.0-2.0*distance(img2avg(imf),0.5)));
      gl_FragColor = img; 

 ACBXY #

@  // Pictures  // v9.8

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec4  img = texture2D(TXP, uv);
vec2  pos = vec2(R1,R2);

vec2  uvw = uv;
float kx = (1.0-C*0.5)*R4+C*0.5; 
float ky = (1.0-C*0.5)*R5+C*0.5;
float t = R3*10.0+C*1000.0;
      kx = kx*2.0+0.01;
vec2  t1 = vec2(kx,ky);
vec2  t2 = uvw;
      for(int i=1; i<10; i++) {
        t2.x+=0.3/float(i)*sin(float(i)*3.0*t2.y+t*kx)+t1.x;
        t2.y+=0.3/float(i)*cos(float(i)*3.0*t2.x+t*kx)+t1.y; }
vec3  tc1;
      tc1.r = cos(t2.x+t2.y+1.0)*0.5+0.5;
      tc1.g = sin(t2.x+t2.y+1.0)*0.5+0.5;
      tc1.b =(sin(t2.x+t2.y)+cos(t2.x+t2.y))*0.5+0.5;
      uvw = uvw +(tc1.rb*vec2(2.0)-vec2(1.0))*ky;
      uvw = cnv2abs(uvw);

float a = fg2circ(mix(uv,uvw,max(B,C)),pos,R4*0.4+0.1,mix(1.0-R5*0.5*max(B,C),0.1,A));
      img.a = a;
      gl_FragColor = img; 

 CBAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Mor-Vib

@  // Morphine  // v15

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
float l = img2bw(texture2D(TXB, uv));

vec2  uvr = uv;
      if (A>0.5) uvr = uv2rot(uv,f2z(mix(N4,R4,B))*PI);

vec2  uve = uv2exp(uvr,-5.0*R1,f2z(R2),f2z(R3));
      uve = uv2wav(uve,0.015,R2,R3);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,f2z(MY)*0.04,0.0,0.0);
vec4  imf = texture2D(TXF, uvf);

float s = f2slit(img.g,R5,R4*0.1,R4*0.1);
float r = fg2rect(uve,vec2(0.5),1.1/H2W,0.02);
      r = clamp(r+1.0-a2cnv(uvf),0.0,1.0);
float d = fg2dash(uve,R1,0.75,0.05,0.1);
float q = fg2drop(uve,R1,1.0,0.075,0.1);

float a = clamp(s-r+(q*R4+d*R5),0.0,1.0);
      img.rgb *= 1.0 + f2z(l)*0.5 + (1.0-l)*f2z(uv2frand(uv-R2))*0.15;

      img = mix ( mix(imf,img,a) , mix2ovr(imf,img,a) , step(R3*R5,0.2)*(1.0-2.0*distance(img2avg(imf),0.5)));
      gl_FragColor = img; 

 CBAXY #

@  // Vibravoid  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
      
      gl_FragColor = img;

 ACBXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Mor-Vib-Gas

@  // Morphine  // v15

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
float l = img2bw(texture2D(TXB, uv));

vec2  uvr = uv;
      if (A>0.5) uvr = uv2rot(uv,f2z(mix(N4,R4,B))*PI);

vec2  uve = uv2exp(uvr,-5.0*R1,f2z(R2),f2z(R3));
      uve = uv2wav(uve,0.015,R2,R3);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,f2z(MY)*0.04,0.0,0.0);
vec4  imf = texture2D(TXF, uvf);

float s = f2slit(img.g,R5,R4*0.1,R4*0.1);
float r = fg2rect(uve,vec2(0.5),1.1/H2W,0.02);
      r = clamp(r+1.0-a2cnv(uvf),0.0,1.0);
float d = fg2dash(uve,R1,0.75,0.05,0.1);
float q = fg2drop(uve,R1,1.0,0.075,0.1);

float a = clamp(s-r+(q*R4+d*R5),0.0,1.0);
      img.rgb *= 1.0 + f2z(l)*0.5 + (1.0-l)*f2z(uv2frand(uv-R2))*0.15;

      img = mix ( mix(imf,img,a) , mix2ovr(imf,img,a) , step(R3*R5,0.2)*(1.0-2.0*distance(img2avg(imf),0.5)));
      gl_FragColor = img; 

 BCAXY #

@  // Vibravoid  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
      
      gl_FragColor = img;

 BACXY #

@  // Gas  // v4

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

vec2  uve = uv2exp(uv,-3.0,0.0,0.0);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,MY*0.1,0.0,0.0);
      if(C>0.5) uvf = uv2rot(uvf,0.05);
vec4  imf = texture2D(TXF, uvf);

float f;
      if (B<0.5) f = fg2circ(uve,vec2(0.5) ,0.9,A*0.5+0.01);
      else        f = fg2rect(uve,vec2(0.5) ,0.9,A*0.5+0.01);
			
      img = mix(imf,img,f);
      gl_FragColor = img;

 ACBXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Per-Hex-EU-Neu

@  // Periskop  // v3

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
      
float kz = 1.0 - MY;
vec2  uvz = uv2exp( uv, 1.0-kz*kz, 0.0, 0.0);
vec4  imz = texture2D(TXP, uvz );

float kr = mix(0.0,mix(MX,1.0,B),abs(A-B));
vec2  uvt = (uv-0.5+kr*0.5)/kr;
vec4  img = texture2D(TXP, uvt);

float c = MX;
float a = 1.0-f2slit(uv.x,0.5,MX,mix(0.0,c,C))*f2slit(uv.y,0.5,MX,mix(0.0,c,C));
      a = mix(a2cnv(uvt),a,B);
      gl_FragColor = mix(imz,img,a); 

 BCAXY #

@  // Hexstatic  // v2

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  img = texture2D(TXP, uv);

float speed = 0.01*mix(-MY,MY,A);
float k = mix(0.0,0.01*(1.0-MX),B);
vec2  uvf = uv2exp(uv, speed, f2z(N1)*speed, f2z(N2)*speed );

      uvf = mix(
        uvf, 
        vec2(0.0,0.0),
        f2f( 
          step(uvf.x,0.0)+step(uvf.y,0.0)+
          step(1.0,uvf.x)+step(1.0,uvf.y)) );

vec4  imf = texture2D( TXF, uv2dspmd(uvf,sin(img.r*TWO_PI)*k,sin(img.b*TWO_PI)*k) );

vec2  uva = uv+vec2(f2z(R2),f2z(R3))*R1*0.3;
      uva = cnv2mod(uva);
vec4  ima = texture2D( TXP,  uva );

float mask = f2slit ( img2avg(ima), R1, R2*0.05, R2*0.05 );
      mask += mix( 0.0, step(0.97, f2rand(img.r+N1))*N2, 1.0);
  
      img.rgb = mix(imf.rgb,img.rgb,mask);
      img.a = mix(1.0,mask,C);
  
      gl_FragColor = img;
      
 BACXY #

@  // EU  // v1

vec2  uv = vTexCoord;
      uv.y = 1.0 - uv.y;
  
float timer = MX*PI;
  
vec4  q1 = texture2D( TXP,  vec2( uv.x*0.5,      uv.y*0.5    ) );
vec4  q2 = texture2D( TXP,  vec2( uv.x*0.5+0.5,  uv.y*0.5    ) );
vec4  q3 = texture2D( TXP,  vec2( uv.x*0.5,      uv.y*0.5+0.5) );
vec4  q4 = texture2D( TXP,  vec2( uv.x*0.5+0.5,  uv.y*0.5+0.5) );

vec4  w1 = mix(q1,q2,smoothstep( abs(sin(timer*0.4))-0.1 , abs(sin(timer*0.4))+0.1 , vec4(q2.g,q2.g,q2.g,1.0) ));
vec4  w2 = mix(q2,q3,smoothstep( sin(sin(timer*0.5))-0.1 , abs(sin(timer*0.5))+0.1 , vec4(q3.g,q3.g,q3.g,1.0) ));
vec4  w3 = mix(q3,q4,smoothstep( abs(sin(timer*0.6))-0.1 , abs(sin(timer*0.6))+0.1 , vec4(q4.g,q4.g,q4.g,1.0) ));
vec4  w4 = mix(q4,q1,smoothstep( abs(sin(timer*0.7))-0.1 , abs(sin(timer*0.7))+0.1 , vec4(q1.g,q1.g,q1.g,1.0) ));

vec4  img_output;

vec4  qt = 1.0-(1.0-q1)*(1.0-q2)*(1.0-q3)*(1.0-q4);

      if (A > 0.5 && B > 0.5 && C > 0.5) img_output = max(max(q1,q2),max(q3,q4));
else  if (A > 0.5 && B > 0.5 && C < 0.5) img_output = mix(q1,q2,max(q3,q4));
else  if (A > 0.5 && B < 0.5 && C > 0.5) img_output = mix(q1,q2,smoothstep(0.4,0.6,vec4(q3.r,q3.r,q3.r,1.0)));
else  if (A > 0.5 && B < 0.5 && C < 0.5) img_output = max(max(w1,w3),max(w2,w4));
else  if (A < 0.5 && B > 0.5 && C > 0.5) img_output = mix(w1,w2,max(w3,w4));
else  if (A < 0.5 && B > 0.5 && C < 0.5) img_output = mix(w1,w2,smoothstep(0.4,0.6,vec4(w3.r,w3.r,w3.r,1.0)));
else  if (A < 0.5 && B < 0.5 && C > 0.5) img_output = qt;
else  if (A < 0.5 && B < 0.5 && C < 0.5) img_output = dot(qt.rgb, vec3(0.33333))>0.5 ? (qt-0.01)*(qt-0.01)*(qt-0.01) : 1.0 - 3.0*(1.0-qt)*(1.0-qt)*(1.0-qt);

      gl_FragColor = img_output;

 CABXY #

@  // Neu  // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  imc = texture2D(TXP, uv);
vec4  imf = texture2D(TXF, uv);
      imf.g = 1.0-imf.g;
      imc.g = mix(
        sin(imc.g*TWO_PI*(0.5+MX)),
        sin((imc.g+imf.g)*PI*(0.5+MX)),
        C);
      imc.g = mix(imc.g,abs(imc.g),A);

vec4  img = texture2D(TXP, uv);
      img.rgb=rgb2hsb(img.rgb);
      img.rgb = sin(img.rgb*vec3(TWO_PI*(0.5+MX)));
      img.g = mix(1.0-img.g, abs(1.0-img.g-imf.g), C);

      gl_FragColor = mix(imc.ggga,img.bbbg,B);

 CBAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

p--ma-co-mu-p-

@  // p-  // Difference

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
		
 BcBxy # 


@  // ma  // Mix 4/4

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
    
 AcCxY # 

@  // co  // Replace color

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

 aBCxy #

@  // mu  // Blend with the camera

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
  
 bacXy # 

@  // p-  // Difference

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
		
 aBcXy #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Q-T-Vib-Mor

@  // Q-Tip  // v1

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  img = texture2D(TXP, uv);

float rndX =  R1 ; float rndY =  R2 ;
float aimX =  R3 ; float aimY =  R4 ;

float time5 = mix(R5,FRC,A);
      
vec2  uv0 = 1.0 - uv;
vec2  uv2 = vec2(cos(time5),sin(time5)) + ( uv0-vec2(cos(time5),sin(time5)) ) / sin(time5);

float ang1 = mix(0.0,TWO_PI*R1,C);
mat2  rot1 = mat2( 
            cos(ang1) , -sin(ang1) ,
            sin(ang1) ,  cos(ang1) );

float ang2 = mix(0.0,TWO_PI*R2,C);
mat2  rot2 = mat2( 
            cos(ang2) , -sin(ang2) ,
            sin(ang2) ,  cos(ang2) );

vec4  img0 = texture2D(TXP, uv2 * rot1);
vec4  img1 = texture2D(TXP, vec2( rndX, rndY ));

float xShift = (img0.r*2.0-1.0) * aimX * cos(time5);
float yShift = (img0.g*2.0-1.0) * aimY * sin(time5); 

vec4  img_out = texture2D(TXP, abs(1.0-abs(uv0*sin(time5) +vec2(xShift,yShift))) * rot2  );

float avg = dot(img_out.rgb, vec3(0.33333));
float isin = (sin(time5))*0.5+0.5;
float thr = smoothstep(isin,isin+0.05,avg)-smoothstep(isin+0.25,isin+0.30,avg);

      img_out = mix( vec4(img1.rgb,thr*0.65), img_out, step(R1+0.5,B) );

      gl_FragColor = img_out; 

 BACXY #

@  // Vibravoid  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
      
      gl_FragColor = img;

 ABCXY #

@  // Morphine  // v15

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
float l = img2bw(texture2D(TXB, uv));

vec2  uvr = uv;
      if (A>0.5) uvr = uv2rot(uv,f2z(mix(N4,R4,B))*PI);

vec2  uve = uv2exp(uvr,-5.0*R1,f2z(R2),f2z(R3));
      uve = uv2wav(uve,0.015,R2,R3);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,f2z(MY)*0.04,0.0,0.0);
vec4  imf = texture2D(TXF, uvf);

float s = f2slit(img.g,R5,R4*0.1,R4*0.1);
float r = fg2rect(uve,vec2(0.5),1.1/H2W,0.02);
      r = clamp(r+1.0-a2cnv(uvf),0.0,1.0);
float d = fg2dash(uve,R1,0.75,0.05,0.1);
float q = fg2drop(uve,R1,1.0,0.075,0.1);

float a = clamp(s-r+(q*R4+d*R5),0.0,1.0);
      img.rgb *= 1.0 + f2z(l)*0.5 + (1.0-l)*f2z(uv2frand(uv-R2))*0.15;

      img = mix ( mix(imf,img,a) , mix2ovr(imf,img,a) , step(R3*R5,0.2)*(1.0-2.0*distance(img2avg(imf),0.5)));
      gl_FragColor = img; 

 BCAXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Spi-Neu-Gas

@  // Spirallianz  // v14

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
float r = distance(vec2(0.5),vec2(MX,MY))*-sign(MX-0.5)*sign(MY-0.5);
vec2  uvr = uv2tr(uv,vec2(MX,MY),r,0.8);
vec4  img = texture2D(TXP, uv);
vec4  imf = tx2d(TXF,mix(cnv2abs(uvr),cnv2mod(uvr),B));
vec2  m = vec2(f2z(MX)*0.3,f2z(MY)*0.3);
float k = 0.3;
float a = clamp(fg2circ(uv,vec2(0.5)+m,1.2+distance(vec2(0.5),vec2(MX,MY)),k*A),0.0,1.0);
      if (C>0.5) a -= clamp(fg2circ(uv,vec2(0.5),0.4,k*A),0.0,1.0);
      img = mix(img,imf,a);
      gl_FragColor = img; 

 CBAXY #

@  // Neu  // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  imc = texture2D(TXP, uv);
vec4  imf = texture2D(TXF, uv);
      imf.g = 1.0-imf.g;
      imc.g = mix(
        sin(imc.g*TWO_PI*(0.5+MX)),
        sin((imc.g+imf.g)*PI*(0.5+MX)),
        C);
      imc.g = mix(imc.g,abs(imc.g),A);

vec4  img = texture2D(TXP, uv);
      img.rgb=rgb2hsb(img.rgb);
      img.rgb = sin(img.rgb*vec3(TWO_PI*(0.5+MX)));
      img.g = mix(1.0-img.g, abs(1.0-img.g-imf.g), C);

      gl_FragColor = mix(imc.ggga,img.bbbg,B);

 BCAXY #

@  // Gas  // v4

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

vec2  uve = uv2exp(uv,-3.0,0.0,0.0);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,MY*0.1,0.0,0.0);
      if(C>0.5) uvf = uv2rot(uvf,0.05);
vec4  imf = texture2D(TXF, uvf);

float f;
      if (B<0.5) f = fg2circ(uve,vec2(0.5) ,0.9,A*0.5+0.01);
      else        f = fg2rect(uve,vec2(0.5) ,0.9,A*0.5+0.01);
			
      img = mix(imf,img,f);
      gl_FragColor = img;

 ABCXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Vib-Hex-Jet

@  // Vibravoid  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
      
      gl_FragColor = img;

@

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  img = texture2D(TXP, uv);

float speed = 0.01*mix(-MY,MY,A);
float k = mix(0.0,0.01*(1.0-MX),B);
vec2  uvf = uv2exp(uv, speed, f2z(N1)*speed, f2z(N2)*speed );

      uvf = mix(
        uvf, 
        vec2(0.0,0.0),
        f2f( 
          step(uvf.x,0.0)+step(uvf.y,0.0)+
          step(1.0,uvf.x)+step(1.0,uvf.y)) );

vec4  imf = texture2D( TXF, uv2dspmd(uvf,sin(img.r*TWO_PI)*k,sin(img.b*TWO_PI)*k) );

vec2  uva = uv+vec2(f2z(R2),f2z(R3))*R1*0.3;
      uva = cnv2mod(uva);
vec4  ima = texture2D( TXP,  uva );

float mask = f2slit ( img2avg(ima), R1, R2*0.05, R2*0.05 );
      mask += mix( 0.0, step(0.97, f2rand(img.r+N1))*N2, 1.0);
  
      img.rgb = mix(imf.rgb,img.rgb,mask);
      img.a = mix(1.0,mask,C);
  
      gl_FragColor = img;

@ 

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

float k2 = (1.0-MY)*0.2;
vec2  uv2 = uv2p(uv,k2);
vec4  img2 = texture2D(TXP, uv2);

vec2  uv3 = uv2p(uv,sin(uv2.x+MX)*cos(uv2.y+MY)*k2);
      uv3 = uv2p(uv,  mod(img2.r,0.1)*10.0*k2+0.02)+0.5*k2;
      uv3.y = mix(uv3.y,uv.y,A);
vec4  img3 = texture2D(TXP, uv3);

float k4 = 0.9;
vec4  img4 = texture2D(TXP, uv2exp(uv,0.5,f2z(img3.r)*k4,f2z(img3.b)*k4));

vec4  imo = mix(img3,img4,A);

      img2.rgb = mod(img2.rgb,0.1)*10.0;
      
      uv3 = uv2p(uv,  img2.r *k2+0.04);
      img3 = texture2D(TXP, uv3);
      img3.rgb = mod(img3.rgb,0.2)*5.0;
      
      k4 = MX*0.5;
float kz = f2z(img2.g)*MY;
vec2  uv4 = uv2exp(uv, kz, f2z(img3.r)*k4, f2z(img3.b)*k4*0.5);
      uv4.x = mod(uv4.x,1.0);
      img4 = texture2D(TXP, uv4);
      
      imo = mix(imo,img4,B);
      imo = mix2sfl(imo,img4,C);

      gl_FragColor = imo;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Vib-Zee-Tim-Wor

@  // Vibravoid  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
      
      gl_FragColor = img;

 CBAXY #

@  // Zeebox  // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
      img.rgb *= vec3(5.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      
float a = img2avg(img);
      a = step(a,0.5);
      img.rgb = mix(vec3(a),1.0-vec3(a),B);
      
vec4  imf = texture2D(TXF, uv);
      img.rgb = mix(img.rgb, img.rgb + vec3(1.0-imf.rgb),B);
      imf.g = 1.0 - (img.g + imf.g);
vec4  imo = mix(img,imf.ggga,A);

      gl_FragColor = imo;

 BACXY #

@  // Timewriter  // v6

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));

float z = 2.0+R3*10.0;

float ang = R4*TWO_PI;

vec2  uvz = uv*z-vec2(R1*z,R2*z)+vec2(0.5);

uvz.y /= H2W;
float k = 5.0 * B;
vec2  uvr = uvz * mat2(cos(ang+N1*k) , -sin(ang+N2*k) ,sin(ang+N3*k) ,  cos(ang+N4*k) );

uvr.y *= H2W; uvz.y *= H2W;

vec2  uvf = mix(uvz, uvr, A);

      uvf = uv2wtr(uvf,0.1*k*f2z(R3),0.1*k*f2z(R4),MLS);

float a = step(uvf.x,1.0)*step(uvf.y,1.0)*step(0.0,uvf.x)*step(0.0,uvf.y);

vec4  img = texture2D(TXP, uvf);

      a = mix(a, a * f2slit( img2avg(img), R5, 0.3 , 0.1 ), C );
      img.a = a;

      gl_FragColor = img; 

 BACXY #

@  // Workshop  // v1

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);

vec2  uvt = vec2(R1<0.4 ? uv.x : mod(uv.x,R4*0.1    )+R2,
      R1>0.6 ? uv.y : mod(uv.y,R4*0.1*H2W)+R3);
vec4  img = texture2D( TXP, uvt );
float s = R4*0.05 + 0.01;
vec2  uvp = vec2(uv.x-mod(uv.x,s), uv.y-mod(uv.y,s*H2W));
float imp = img2avg(texture2D( TXP, uvp ));
float lvl = img2avg(texture2D( TXP, vec2(R2,R3) ));
      s = R5*0.15;
      img.a = f2slit ( imp, lvl, s, s );
      img.a = clamp( img.a - f2slit ( img2avg(img), lvl, s, s ), 0.0,1.0);

      gl_FragColor = img;

 BACXY #

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Wor-Hex-Gas

@  // Workshop  // v1

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);

vec2  uvt = vec2(R1<0.4 ? uv.x : mod(uv.x,R4*0.1    )+R2,
      R1>0.6 ? uv.y : mod(uv.y,R4*0.1*H2W)+R3);
vec4  img = texture2D( TXP, uvt );
float s = R4*0.05 + 0.01;
vec2  uvp = vec2(uv.x-mod(uv.x,s), uv.y-mod(uv.y,s*H2W));
float imp = img2avg(texture2D( TXP, uvp ));
float lvl = img2avg(texture2D( TXP, vec2(R2,R3) ));
      s = R5*0.15;
      img.a = f2slit ( imp, lvl, s, s );
      img.a = clamp( img.a - f2slit ( img2avg(img), lvl, s, s ), 0.0,1.0);

      gl_FragColor = img;

 cBAxy # 

@  // Hexstatic  // v2

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  img = texture2D(TXP, uv);

float speed = 0.01*mix(-MY,MY,A);
float k = mix(0.0,0.01*(1.0-MX),B);
vec2  uvf = uv2exp(uv, speed, f2z(N1)*speed, f2z(N2)*speed );

      uvf = mix(
        uvf, 
        vec2(0.0,0.0),
        f2f( 
          step(uvf.x,0.0)+step(uvf.y,0.0)+
          step(1.0,uvf.x)+step(1.0,uvf.y)) );

vec4  imf = texture2D( TXF, uv2dspmd(uvf,sin(img.r*TWO_PI)*k,sin(img.b*TWO_PI)*k) );

vec2  uva = uv+vec2(f2z(R2),f2z(R3))*R1*0.3;
      uva = cnv2mod(uva);
vec4  ima = texture2D( TXP,  uva );

float mask = f2slit ( img2avg(ima), R1, R2*0.05, R2*0.05 );
      mask += mix( 0.0, step(0.97, f2rand(img.r+N1))*N2, 1.0);
  
      img.rgb = mix(imf.rgb,img.rgb,mask);
      img.a = mix(1.0,mask,C);
  
      gl_FragColor = img;
      
 ABCxY # 

@  // Gas  // v4

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

vec2  uve = uv2exp(uv,-3.0,0.0,0.0);
vec4  img = texture2D(TXP, uve);

vec2  uvf = uv2exp(uv,MY*0.1,0.0,0.0);
      if(C>0.5) uvf = uv2rot(uvf,0.05);
vec4  imf = texture2D(TXF, uvf);

float f;
      if (B<0.5) f = fg2circ(uve,vec2(0.5) ,0.9,A*0.5+0.01);
      else        f = fg2rect(uve,vec2(0.5) ,0.9,A*0.5+0.01);
			
      img = mix(imf,img,f);
      gl_FragColor = img;

 BcBxY # 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Wor-Pic-Xen

@  // Workshop  // v1

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);

vec2  uvt = vec2(R1<0.4 ? uv.x : mod(uv.x,R4*0.1    )+R2,
      R1>0.6 ? uv.y : mod(uv.y,R4*0.1*H2W)+R3);
vec4  img = texture2D( TXP, uvt );
float s = R4*0.05 + 0.01;
vec2  uvp = vec2(uv.x-mod(uv.x,s), uv.y-mod(uv.y,s*H2W));
float imp = img2avg(texture2D( TXP, uvp ));
float lvl = img2avg(texture2D( TXP, vec2(R2,R3) ));
      s = R5*0.15;
      img.a = f2slit ( imp, lvl, s, s );
      img.a = clamp( img.a - f2slit ( img2avg(img), lvl, s, s ), 0.0,1.0);

      gl_FragColor = img;

 ABCxy #

@  // Pictures  // v9.8

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec4  img = texture2D(TXP, uv);
vec2  pos = vec2(R1,R2);

vec2  uvw = uv;
float kx = (1.0-C*0.5)*R4+C*0.5; 
float ky = (1.0-C*0.5)*R5+C*0.5;
float t = R3*10.0+C*1000.0;
      kx = kx*2.0+0.01;
vec2  t1 = vec2(kx,ky);
vec2  t2 = uvw;
      for(int i=1; i<10; i++) {
        t2.x+=0.3/float(i)*sin(float(i)*3.0*t2.y+t*kx)+t1.x;
        t2.y+=0.3/float(i)*cos(float(i)*3.0*t2.x+t*kx)+t1.y; }
vec3  tc1;
      tc1.r = cos(t2.x+t2.y+1.0)*0.5+0.5;
      tc1.g = sin(t2.x+t2.y+1.0)*0.5+0.5;
      tc1.b =(sin(t2.x+t2.y)+cos(t2.x+t2.y))*0.5+0.5;
      uvw = uvw +(tc1.rb*vec2(2.0)-vec2(1.0))*ky;
      uvw = cnv2abs(uvw);

float a = fg2circ(mix(uv,uvw,max(B,C)),pos,R4*0.4+0.1,mix(1.0-R5*0.5*max(B,C),0.1,A));
      img.a = a;
      gl_FragColor = img; 

 aBcXy #

@  // Xenakis  // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
      
vec4  imc = texture2D(TXP, uv);
vec4  imb = texture2D(TXB, uv);
float v = (1.0-distance(uv.y,0.5)*2.0);
float k = 0.25*v;

vec2  uvh = vec2(uv.x,MY);
      
      uvh.x = uv2dspxy(uvh,f2z(imc.r)*k,f2z(imc.b)*k).x;
      uvh.x += (uv.y*f2z(R1) + R2)/H2W;
      uvh = uv2dspmd(uvh,f2z(imb.r)*B,f2z(imb.b)*B);
      
vec4  imh = texture2D(TXP, cnv2mod(uvh));
      imh.a *= f2slit(img2avg(imh),R2,0.1,0.1);
      if (R3>MX*(1.0-A)) imh.rgb = imc.rgb;

      gl_FragColor = imh; 

 AbcxY #

`+/* -------------------------- END OF PRESETS LIST -------------------------- */``);
