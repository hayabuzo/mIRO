class Button {

  constructor(x, y, w, h, b = 0) {   // to create a button we need to know its position, size and border around it
    
    // we recalculate its position and size according to the border, set text size (tsize), stroke weight (sw), mouse position (xm/ym)
    
    this.x = x+b/2;           this.w = w-b;             this.tsize  = 15;          this.txt = [];          this.xm = 0;      
    this.y = y+b/2;           this.h = h-b;             this.border = 20;          this.sw  = 1;           this.ym = 0;      

    // by default we set the button clickable, show border around it, do not fill it with color (bgc) and do not draw a crossaim inside it
    
    this.clickable = true;    this.showborder = true;    this.pressed = false;     this.bgc    = null;
    mouseIsPressed = false;   this.ignore     = false;   this.clicked = false;     this.cross  = false;

  }
  
  show() {  // how the button will be shown and behave
     
    if (this.showborder) {    
      push();

      this.sw = this.pressed ? 5 : 1;

      if (this.bgc!=null) { 
        fill(color(this.bgc)) 
      } else {
        noFill();    
      };

      stroke(skin.btn).strokeWeight(this.sw);
      rect(this.x+this.sw/2, this.y+this.sw/2, this.w-this.sw+1, this.h-this.sw+1); 

      // draw a crossaim to track mouse position over the button                     
      if (this.cross) { 
        push(); 

        stroke(255,50); 
        strokeWeight(1);

        if (glsl.mx) { 
          rect(this.x+this.sw/2, this.y+this.sw/2, this.w*this.xm, this.h-this.sw+1);
        }
        if (glsl.my) { 
          rect(this.x+this.sw/2, this.y+this.sw/2, this.w-this.sw+1, this.h*this.ym); 
        }

        pop();
      } 

      pop(); 
    }

    // set the text appearance on the button, there are 5 possible positions
    push();  
    textSize(this.tsize); 
    noStroke(); 
		for (let i=0; i<2; i++) {
		  fill(skin.btn); 
      if (i==0) { 
        fill(skin.bgr);  
      }
      if(this.txt[0]!=null) textAlign(CENTER, CENTER).text(this.txt[0],i+this.x+this.w/2,  i+this.y+this.h/2               ); 
      if(this.txt[1]!=null) textAlign(LEFT,   TOP   ).text(this.txt[1],i+this.x+10,        i+this.y+10                     ); 
      if(this.txt[2]!=null) textAlign(RIGHT,  TOP   ).text(this.txt[2],i+this.x+this.w-10, i+this.y+10                     ); 
      if(this.txt[3]!=null) textAlign(LEFT,   BOTTOM).text(this.txt[3],i+this.x+10,        i+this.y+this.h-10+this.tsize/5 );
      if(this.txt[4]!=null) textAlign(RIGHT,  BOTTOM).text(this.txt[4],i+this.x+this.w-10, i+this.y+this.h-10+this.tsize/5 );
		}
    pop(); 

    if (this.clickable) {

      this.over = mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h;

      // if we are pressing outside the button and releasing over the button we need to block this button behavior
      if (!this.over && mouseIsPressed) {
        this.ignore = true; 
      } else if (!mouseIsPressed) { 
        this.ignore = false;
      }

      // calculations to distinguish pressing and clicking on the button
      if ( this.over && !this.ignore &&  mouseIsPressed && mouseButton !== RIGHT) {
        this.pressed = true;   
      } else if ( this.over && this.pressed && !mouseIsPressed) {  
        this.pressed = false; 
        this.clicked = true; 
      } else if (!this.over && this.pressed && !mouseIsPressed) {
        this.pressed = false;   
      } else { 
        this.clicked = false;
      }

      // calculate and normalize mouse position
      if (this.pressed && this.over) { 
        this.xm = (mouseX-this.x)/this.w; 
        this.ym = (mouseY-this.y)/this.h; 
      }

    }

  }

}

class Gui {
  
  constructor(w,h) { 

    // check if the sketch is running on a mobile device
    this.mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
    
    // set default values for object variables
    this.w = w;        
    this.h = h;        
    this.stream  = {};        
    this.buttons = {};        
    this.showhelp = false;        
    this.compiled = false;
    this.horient = false;               
    this.kfps = 1.0;      
    this.timestamp = '';         
    this.frc = 0.0;       
    this.trig = [0,0,0];
    this.x0 = (width-this.w)*0.5;        
    
    // set stabilization values and create camera
    this.shake = {};     
    this.shake.array = [];     
    this.shake.average = 0;    
     this.shake.steps = 10;          		
     
     this.createCamera();

    this.showGui = true;
    this.controlX = 0.0;
    this.controlY = 0.0;

    this.fileName = ""

  }
  
  createCamera() {

    // break the previous connection with the camera, also in case of image loading instead of camera stream
    if (typeof this.stream.camera !== 'undefined' && typeof this.stream.camera.canvas === 'undefined') {
      this.stream.camera.remove();  
    }
    
    // create a new camera stream with user setting, hide it from the screen and set that it has not yet been completely loaded (only created) 
    this.stream.settings = { 
      audio: false, 
      video: { 
        width: {
          ideal: profile.resolution == "min" ? 640 : profile.resolution == "max" ? 4000 : profile.resolution == "wide" ? 1280 : 1280,
        }, 
        height: {
          ideal: profile.resolution == "min" ? 480 : profile.resolution == "max" ? 3000 : profile.resolution == "wide" ? 720 : 960,  
        }, 
        facingMode: profile.frontal ? "user" : "environment" 
      } 
    };

    this.stream.camera = createCapture(this.stream.settings).hide(); this.stream.camera.loaded = false;

    // to load both camera stream and image file as the same object
    this.stream.camera.width = 1; 

  }
  
  // load an image from device instead of camera stream
  createImage(file) {  

    this.stream.camera = loadImage(file.data);
    this.stream.camera.loaded = false;

  }
  
  // the camera and image loading procedure
  loading() {  

    // create graphics for output (stack) image, shader processing image (imgx), blurred iamge (imgb)
    this.stream.stack = createGraphics(this.stream.camera.width * profile.resize, this.stream.camera.height * profile.resize); //.background(50);
    this.stream.imgx  = createGraphics(this.stream.stack.width, this.stream.stack.height, WEBGL);
    this.stream.imgb  = createGraphics(this.stream.stack.width*0.025, this.stream.stack.height*0.025);
    
    // fit the output image into screen, calculate its aspect ratio, create shaders and load frame #1
    this.stream.scale = profile.window*((height*0.8/width >= this.stream.stack.height/this.stream.stack.width) ? width/this.stream.stack.width : height*0.8/this.stream.stack.height); 
    this.stream.camera.loaded = true;  
    this.createShader();  
    this.frame = "F1L";
    
		// check URL parameters if there are filter name to load
		if (getURLParams().f!=null) { 
      document.getElementById("presetSelectorId").value = getURLParams().f; 
      loadPreset(); 
    }
		
  }
  
  // operations for every frame of sketch
  run() {  

    // show the gui if camera is fully loaded, if it's not then try to load it and show the loading animation
    if (this.stream.camera.loaded) {
      this.show(); 
    } else if ((this.stream.camera.loadedmetadata || this.stream.camera.width>1) && !this.stream.camera.loaded) {
      this.loading();    
    } else {
      push();
			textFont('Sans-serif');
      textAlign(LEFT,CENTER).noFill().stroke(150).textSize(80);
      text( "mIRO"+(frameCount%80<20?'':frameCount%80<40?')':frameCount%80<60?'))':')))') , width/2-150, height/2-20 );
      textStyle(ITALIC).textAlign(LEFT,CENTER).fill(150).noStroke().textSize(12);
      text( "NOW LOADING "+ (frameCount%60<20?'/':frameCount%60<40?'–':'\\') ,width/2-50, height/2+20 ); 
			pop();
    }
    
  }  
  
  // creation of shaders array
  createShader() {  
		
    // create an empty array and fill it with shaders created from all fragments code we have
    this.stream.shader = [];
    for (let i=0;i<glsl.frags.length;i++) { 
      this.stream.shader[i] = this.stream.imgx.createShader(glsl.vert, glsl.frags[i]); 
    }  
		
  }


  // what will be shown when gui is running: there are several frames (F1,F2...) and each frame must be loaded before being shown (F1L,F2L...)
  show() { 
  
    // ----------------------------------------------------------- F1

    switch(this.frame) {

      // loading frame #1 (main frame)
      case "F1L":
      
        // create all buttons for the frame
        this.frame = "F1"; this.buttons.f1 = {}; 
        this.buttons.f1.play = new Button( this.x0, this.h*0.1, this.w    , this.h*0.4 , 10); this.buttons.f1.play.txt[4] = "PLAY"; this.buttons.f1.play.cross = true;
        this.buttons.f1.save = new Button( this.x0, this.h*0.5, this.w    , this.h*0.4 , 10); this.buttons.f1.save.txt[4] = "SAVE"; this.buttons.f1.save.txt[1] = this.stream.stack.width+'x'+this.stream.stack.height;
        this.buttons.f1.dir  = new Button( this.x0, this.h*0.9, this.h*0.1, this.h*0.1 , 10); this.buttons.f1.dir .txt[0] = this.horient?"→":"↑"; this.buttons.f1.dir.tsize = 30;
        this.buttons.f1.mode = new Button( this.x0+this.h*0.1,  this.h*0.9, this.h*0.1, this.h*0.1 , 10); this.buttons.f1.mode.txt[0]=profile.clicking?">":">>>";
        this.buttons.f1.edit = new Button( this.x0,             this.h*0.0, this.h*0.1, this.h*0.1 , 10); this.buttons.f1.edit.txt[0] = "</>";
        this.buttons.f1.pres = new Button( this.x0+this.h*0.1,  this.h*0.0, this.w-this.h*(glsl.n*0.1+0.1), this.h*0.1 , 10);
        this.buttons.f1.set  = new Button( this.x0+this.h*0.3,  this.h*0.9, this.w-this.h*0.3, this.h*0.1 , 10); this.buttons.f1.set .txt[4] = "SETTINGS";
        this.buttons.f1.a    = new Button( this.x0+this.w-this.h*0.1*glsl.n              , glsl.a ? 0.0 : - this.h , this.h*0.1, this.h*0.1 , 10); this.buttons.f1.a.txt[0] = "A";
        this.buttons.f1.b    = new Button( this.x0+this.w-this.h*0.1*(glsl.n-int(glsl.a)), glsl.b ? 0.0 : - this.h , this.h*0.1, this.h*0.1 , 10); this.buttons.f1.b.txt[0] = "B";
        this.buttons.f1.c    = new Button( this.x0+this.w-this.h*0.1                     , glsl.c ? 0.0 : - this.h , this.h*0.1, this.h*0.1 , 10); this.buttons.f1.c.txt[0] = "C";
        this.buttons.f1.r    = new Button( this.x0+this.h*0.2,  this.h*0.9, this.h*0.1, this.h*0.1 , 10); this.buttons.f1.r.txt[4]="RND";
        this.setHead();
          
        presetSelectorEl.position(this.x0+this.h*0.1+5, this.h*0.0+6).size(this.w-this.h*(glsl.n*0.1+0.1)-10, this.h*0.1-9); 
        presetSelectorEl.style('visibility:visible'); 
        packSelectorEl.style('visibility:hidden'); 
        codeAreaEl.style('visibility:hidden'); 
        
        // process and save the setting profile each time we enter the main frame
        this.process(); 
        this.saveProfile();

      break;

      // showing frame #1 (main frame)
      case "F1":

        // in each frame we update the main image, in every second we recount and update the FPS value 
        this.preview();
        if (frameCount%floor(frameRate())==0) { 
          this.kfps = 60 / frameRate();
          this.frameRate = frameRate().toFixed(1);
        }
        this.buttons.f1.play.txt[3] = profile.clicking ? "" : profile.stablevel > 0 ? nfs(this.shake.average,1,2) : "";
        
        // setting up behavior of preset selector colors
        if (document.getElementById('presetSelectorId') === document.activeElement) presetSelectorEl.style('background-color',skin.bgr).style('color',skin.txt);
        else presetSelectorEl.style('background-color:transparent').style('color:transparent');
        
        this.buttons.f1.play.txt[1] = this.frameRate;
        this.buttons.f1.play.txt[4] = "PLAY";
        this.buttons.f1.save.y = this.h*0.5+5;
        this.buttons.f1.play.h = this.h*0.4-10;
        this.buttons.f1.play.cross = true;
        
        // show all buttons for the frame and check if they are clicked
        if (this.showGui) {
          for (let i in this.buttons.f1) { 
            this.buttons.f1[i].show(); 
          }  
        }

        this.buttons.f1.play.txt[2] = (glsl.mx ? nfs(this.buttons.f1.play.xm,1,2)+"\n":"")+(glsl.my ? nfs(this.buttons.f1.play.ym,1,2) : "");
        if ((profile.clicking ? this.buttons.f1.play.clicked : this.buttons.f1.play.pressed || (profile.stablevel > 0 && this.shake.average >= profile.stablevel) )) { 
          this.controlX = this.buttons.f1.play.xm;
          this.controlY = this.buttons.f1.play.ym;
          this.update(); 
        }
        if (this.buttons.f1.dir .clicked) { this.horient = !this.horient; this.buttons.f1.dir .txt[0] = this.horient?"→":"↑"; }
        if (this.buttons.f1.edit.clicked)   this.frame = "F2L";
        if (this.buttons.f1.save.clicked)   this.saveImage();
        if (this.buttons.f1.set .clicked)   this.frame = "F3L";
        if (this.buttons.f1.a   .clicked)   this.trig[0] = !this.trig[0]; this.buttons.f1.a.tsize = this.trig[0] ? 30 : 15;
        if (this.buttons.f1.b   .clicked)   this.trig[1] = !this.trig[1]; this.buttons.f1.b.tsize = this.trig[1] ? 30 : 15;
        if (this.buttons.f1.c   .clicked)   this.trig[2] = !this.trig[2]; this.buttons.f1.c.tsize = this.trig[2] ? 30 : 15;
        if (this.buttons.f1.mode.clicked) { profile.clicking = !profile.clicking; this.buttons.f1.mode.txt[0]=profile.clicking?">":">>>"; this.saveProfile(); }
        if (this.buttons.f1.r   .clicked) { 
          generateRandomPresetMix(3); 
          codeAreaEl.value(profile.code);
          // buildShader(); 
          this.compile();
          this.frame = "F1L";
        }

        if (mouseIsPressed && mouseButton === RIGHT) {
          mouseIsPressed = false;
          this.showGui = !this.showGui;
          if (this.showGui) {
            presetSelectorEl.style('visibility:visible');
          } else {
            presetSelectorEl.style('visibility:hidden');
          }
        }

        if (keyIsDown(69)) { // E
          this.controlX = Math.random();
          this.controlY = Math.random();
          this.buttons.f1.play.xm = this.controlX;
          this.buttons.f1.play.ym = this.controlY;
        }

        if (keyIsDown(82)) { // R
          for (let i=0; i<3; i++) {
            this.trig[i] = random([true,false]);
          }
        } 

        if (keyIsDown(32)) { // Space
          this.update(); 
        } 

        if (keyIsPressed === true) {

          switch(keyCode) {

            case 90: // Z
              this.trig[0] = !this.trig[0]; 
              this.buttons.f1.a.tsize = this.trig[0] ? 30 : 15;
            break;

            case 88: // X
              this.trig[1] = !this.trig[1]; 
              this.buttons.f1.b.tsize = this.trig[1] ? 30 : 15;
            break;

            case 67: // C
              this.trig[2] = !this.trig[2]; 
              this.buttons.f1.c.tsize = this.trig[2] ? 30 : 15;
            break;

            case 86: // V
              profile.clicking = !profile.clicking; 
              this.buttons.f1.mode.txt[0]=profile.clicking?">":">>>"; 
              this.saveProfile();
            break;

            case 70: // F
              this.frc = 0.0;
              this.update(); 
            break;

            case 83: // S
              this.saveImage();
            break;

            case 65: // A
              this.update();   
            break;

          }

          keyIsPressed = false;
          
        } 

        if (!this.showGui) {

          this.controlX = mouseX/width;
          this.controlY = mouseY/height;

          this.update();

        }

      break;

      // ----------------------------------------------------------- F2

      // loading frame #2 (shader editor)
      case "F2L": 

        // create all buttons for the frame
        this.frame = "F2"; 
        this.buttons.f2 = {};
        this.buttons.f2.help = new Button( this.x0+this.w*0.000, this.h*0.0, this.w*0.333, this.h*0.1 , 10); this.buttons.f2.help.txt[0] = "HELP";
        this.buttons.f2.run  = new Button( this.x0+this.w*0.333, this.h*0.0, this.w*0.333, this.h*0.1 , 10); this.buttons.f2.run .txt[0] = "RUN";
        this.buttons.f2.back = new Button( this.x0+this.w*0.666, this.h*0.0, this.w*0.333, this.h*0.1 , 10); this.buttons.f2.back.txt[0] = "BACK";
        this.buttons.f2.new  = new Button( this.x0+this.w*0.000, this.h*0.9, this.w*0.333, this.h*0.1 , 10); this.buttons.f2.new .txt[0] = "NEW";
        this.buttons.f2.load = new Button( this.x0+this.w*0.333, this.h*0.9, this.w*0.333, this.h*0.1 , 10); this.buttons.f2.load.txt[0] = "LOAD";
        this.buttons.f2.save = new Button( this.x0+this.w*0.666, this.h*0.9, this.w*0.333, this.h*0.1 , 10); this.buttons.f2.save.txt[0] = "SAVE";
        presetSelectorEl.style('color',skin.txt);
        packSelectorEl.style('visibility:visible'); 
        presetSelectorEl.position(this.x0+this.w/2,this.h*0.9-40).size(this.w/2-6,40);
        profile.code = codeAreaEl.value(); 
        codeAreaEl.style('visibility:visible'); 
        packSelectorEl.position(this.x0+4,this.h*0.9-40).size(this.w/2-8,40);

      break;

      // showing frame #2 (shader editor)
      case "F2": 

        if (profile.livecode) {  // livecoding mode draws preview under coding textarea
          this.preview();
          if (this.compiled) { 
            this.update(); 
          }
          let clr = color(skin.bgr); 
          clr.setAlpha(180);
          noStroke().fill(clr);
          rect(0,0,width,height);
        }
        
        if (!this.showhelp) {  // text area is in the shader edit mode

          // change text field and buttons according to mode
          document.getElementById("codeAreaEl").disabled = false; 
          presetSelectorEl.style('visibility:visible'); 
          packSelectorEl.style('visibility:visible');  
          codeAreaEl.size(gui.w-15,this.h*0.8-50);  
          profile.code = codeAreaEl.value();
          this.buttons.f2.help.txt[0] = "HELP"; 
          this.buttons.f2.help.w = this.w*0.333-10;

          presetSelectorEl.style('background-color', document.getElementById('presetSelectorId')  === document.activeElement? skin.bgr : 'transparent');
          packSelectorEl.style('background-color'  , document.getElementById('packSelectorId') === document.activeElement ? skin.bgr : 'transparent'); 

          // show all buttons for the frame and check if they are clicked
          for (let i in this.buttons.f2) { 
            this.buttons.f2[i].show(); 
          }  

          if (this.buttons.f2.help.clicked) { this.showhelp = true; codeAreaEl.value(glsl.library.replace(/\*\//g,'').replace(/\/\*\*/g,'').replace(/\/\*/g,'●')        ); }
          if (this.buttons.f2.run .clicked) { this.compile(); this.frc = 0.0; }
          if (this.buttons.f2.back.clicked) { this.frame = "F1L"; codeAreaEl.value(profile.code); }
          if (this.buttons.f2.new .clicked) codeAreaEl.value(glsl.default);
          if (this.buttons.f2.load.clicked) document.getElementById('fileInputId').click();
          if (this.buttons.f2.save.clicked) this.saveFilter(); 

        } else {  // text area is in the help (library) mode

          // change text field and buttons according to mode
          document.getElementById("codeAreaEl").disabled=true; presetSelectorEl.style('visibility:hidden'); 
          packSelectorEl.style('visibility:hidden'); 
          codeAreaEl.size(this.w-15,this.h*0.9-15); 
          this.buttons.f2.help.show(); 
          this.buttons.f2.help.txt[0] = "BACK"; 
          this.buttons.f2.help.w = this.w-10; 
          if (this.buttons.f2.help.clicked) { 
            this.showhelp = false; codeAreaEl.value(profile.code); 
          }

        }

      break;

      // ----------------------------------------------------------- F3

      // loading frame #3 (settings)
      case "F3L":

        // create all buttons for the frame
        this.frame = "F3"; // textFont('Monospace');
        presetSelectorEl.style('visibility:hidden');
        this.buttons.f3 = {
          head:0,
          camr:0,
          canv:0,
          fron:0,
          stab:0,
          ftyp:0,
          floa:0,
          live:0,
          okay:0,
        }; 
        let n=0;
        for (let i in this.buttons.f3) { 
          this.buttons.f3[i] = new Button( this.x0, 15+this.h*0.07*n, this.w, this.h*0.07 , 10);  
          this.buttons.f3[i].showborder = false; 
          n++; 
        }
        this.buttons.f3.head.tsize = 30;
        this.buttons.f3.okay.tsize = 30;
        this.buttons.f3.okay.y += 15;
        
        // save the previous setting to temporary profile to compare it with new setting
        p_temp.resize = profile.resize;     
        p_temp.resolution = profile.resolution;    
        p_temp.frontal = profile.frontal;   

      break;

      // showing frame #3 (settings)
      case "F3":

        // show all buttons for the frame and check if they are clicked
        for (let i in this.buttons.f3) { 
          this.buttons.f3[i].show(); 
        }  
        
        this.buttons.f3.head.txt[0] = "SETTINGS";     
        this.buttons.f3.camr.txt[1] = " Camera Resolution: " + (profile.resolution == 'min' ? '640x480' : profile.resolution == 'med' ? '1280x960' : profile.resolution == 'wide' ? '1280x720' : '4000x3000');                  
        this.buttons.f3.canv.txt[1] = "     Canvas Resize: " + nfs(profile.resize,1,1).slice(1);                  
        this.buttons.f3.fron.txt[1] = "    Frontal Camera: " + (profile.frontal  ? "ON" : "OFF");                  
        this.buttons.f3.stab.txt[1] = "     Stabilization: " + (profile.stablevel > 0 ? nfs(profile.stablevel,1,2).slice(1) : "OFF");  
        this.buttons.f3.ftyp.txt[1] = "         File Type: " + profile.filetype.toUpperCase();                  
        this.buttons.f3.floa.txt[1] = "     Force Loading: " + (profile.forcing  ? "ON" : "OFF"); 
        this.buttons.f3.live.txt[1] = "       Live Coding: " + (profile.livecode  ? "ON" : "OFF");   
        this.buttons.f3.okay.txt[0] = "OK";
        
        if (this.buttons.f3.camr.clicked) profile.resolution = profile.resolution == 'min' ? 'wide' : profile.resolution == 'wide' ? 'med' : profile.resolution == 'med' ? 'max' : 'min';
        if (this.buttons.f3.canv.clicked) profile.resize     = profile.resize >= 3.0 ? 0.5 : profile.resize + 0.5;
        if (this.buttons.f3.fron.clicked) profile.frontal    = !profile.frontal;
        if (this.buttons.f3.stab.clicked) profile.stablevel  = profile.stablevel <= 0.0 ? 0.5 : ceil(profile.stablevel*100 - 5)/100;
        if (this.buttons.f3.ftyp.clicked) profile.filetype   = profile.filetype == 'jpg' ? 'png' : 'jpg';
        if (this.buttons.f3.floa.clicked) profile.forcing    = !profile.forcing;
        if (this.buttons.f3.live.clicked) profile.livecode   = !profile.livecode;

        // recreate camera or rescale window if needed and return to frame #1
        if (this.buttons.f3.okay.clicked) {  
          if (p_temp.resolution!=profile.resolution || p_temp.resize!=profile.resize || p_temp.frontal != profile.frontal) {
            this.createCamera();  
          }
          this.frame = "F1L"; 
        }

      break;

    }

    // ======================================================== end of frames
    
  }
	
	// show stack image on screen
  preview() {	
    imageMode(CENTER); 
    image(this.stream.stack, width*0.5, height*0.5, this.stream.stack.width*this.stream.scale, this.stream.stack.height*this.stream.scale);	
  }
  
  // try to compile and run the shaders
  compile() { 
    buildShader(); 
    this.createShader(); 
    this.process(); 
    this.saveProfile(); 
  } 
  
  // check is it possible to run the shaders
  process() {  

    // we try to run the shaders and send them uniforms, then paint 'run' button with 'successful' color
    try {  
      for (let i = 0; i < glsl.frags.length; i++) { 
        this.unisend(i); 
        this.stream.imgx.shader(this.stream.shader[i]).rect(0,0,1,1); 
      }
      if (this.frame == "F2") {
        this.buttons.f2.run.bgc = skin.run; 
      }
      if (this.frame == "F1") {
        this.frc ++; 
      }
			this.compiled = true; 
    } 

    // if we cannot run the shaders we paint 'run' button with 'error' color
    catch(e) { 
      if (this.frame == "F2") { 
        this.buttons.f2.run.bgc = skin.err; 
      } 
      this.compiled = false; 
    } 
    
    // after each processing we take the timestamp to save it as the processed image name 
    this.timestamp = year()+nf(month(),2)+nf(day(),2)+" - "+nf(hour(),2)+nf(minute(),2)+nf(second(),2);
    
    // stabilization calculations
    this.shake.array.push(abs(accelerationX)+abs(accelerationY)+abs(accelerationZ));
    if(this.shake.array.length>this.shake.steps) { 
      this.shake.array = this.shake.array.slice(1); 
      this.shake.average = 0;
      for (let i=0; i<this.shake.steps; i++) { 
        this.shake.average += this.shake.array[i]; 
      }
      this.shake.average /= this.shake.steps;
    }
    
  }
	
	// set filter header
	setHead()     { 
		let l = this.mobile ? 12 : 24; 
		this.buttons.f1.pres.txt[0] = this.mobile ? 'Load' : (this.getName()=="myShaderName"?"Load Preset":this.getName().substring(0,l)+(this.getName().length>l?"…":"") ); 
		this.buttons.f1.pres.w = this.w-this.h*(glsl.n*0.1+0.1) - 10;
		this.buttons.f1.a.x = 5 + this.x0+this.w-this.h*0.1*glsl.n;               			this.buttons.f1.a.y = 5 + (glsl.a ? 0.0 : - this.h);
    this.buttons.f1.b.x = 5 + this.x0+this.w-this.h*0.1*(glsl.n-int(glsl.a));       this.buttons.f1.b.y = 5 + (glsl.b ? 0.0 : - this.h);
    this.buttons.f1.c.x = 5 + this.x0+this.w-this.h*0.1;                            this.buttons.f1.c.y = 5 + (glsl.c ? 0.0 : - this.h);
	}
		
  // update processed image on screen
	update() { 
    this.process(); this.stream.stack.image(this.stream.imgx,0,0); 
  }

  // get the name of current filter
  getName() { 
    return codeAreaEl.value().split(char(10))[0].split('@')[0]; 
  }
  
  // export filter as .txt file
  saveFilter() { 
    save([revealName()], "[+] "+sketch+" - "+this.getName()+".txt");  
  }

  // save settings profile to the browser memory
  saveProfile() { 
    profile.code = codeAreaEl.value(); 
    storeItem('settings_profile', {...profile});  
  }      
  
  // saving the graphic file
  saveImage() {  
    
    // to allow image orientation turning, we create temporary graphic object with size according to the current image orientation
    let simg = createGraphics(!this.horient ? this.stream.stack.width : this.stream.stack.height, this.horient ? this.stream.stack.width : this.stream.stack.height);
    
    // in case of horizontal (turned) orientation we need to rotate the stack image to fit it into temporary one
    if (this.horient) { 
      simg.translate(this.stream.stack.height*0.5, this.stream.stack.width*0.5).rotate(-PI*0.5).imageMode(CENTER);
    }
    
    // describing active controls for filename
    const t = (glsl.a&&this.trig[0])||(glsl.b&&this.trig[1])||(glsl.a&&this.trig[2]);
    const controls = ''+(t?' [':'')+(glsl.a && this.trig[0]?'a':'')+(glsl.b && this.trig[1]?'b':'')+(glsl.c && this.trig[2]?'c':'')+(t?']':'');
    
    // we put the the stack image into the temporary one, and save temporary image with timestamp, filter name and controls
    simg.image(this.stream.stack, 0, 0); 
    save(simg, sketch+" - "+this.timestamp+" - "+this.fileName+this.getName()+controls+'.'+profile.filetype); 
    simg.remove();
    
  }
  
  // sending uniforms to shaders
  unisend(i) {  
    
    // checking of what textures are used in shader code to send them as uniforms
    if (glsl.TXC) { 
      this.stream.shader[i].setUniform( 'TXC' , this.stream.camera ); 
    }
    if (glsl.TXP) { 
      this.stream.shader[i].setUniform( 'TXP' , i == 0 ? this.stream.camera : this.stream.imgx ); 
    }
    if (glsl.TXF) { 
      this.stream.shader[i].setUniform( 'TXF' , this.frc <= 1 ? this.stream.camera : this.stream.stack ); 
    }
    if (glsl.TXB) { 
      this.stream.imgb.image(i == 0 ? this.stream.camera : this.stream.imgx,0,0,this.stream.imgb.width,this.stream.imgb.height);
      this.stream.imgb.filter(BLUR, this.stream.stack.width*0.002); this.stream.shader[i].setUniform( 'TXB' , this.stream.imgb ); 
    }
    
    // checking of what control coordinates are used in shader code to send them as uniforms
    this.stream.shader[i].setUniform( 'MX' , this.controlX ); 
    this.stream.shader[i].setUniform( 'MY' , this.controlY ); 
    
    // sending random and noise uniforms
    for (let n = 1; n<=5; n++) {
      if(glsl.R[n]) {
        this.stream.shader[i].setUniform( 'R'+n , Math.random() ); 
      }
      if(glsl.N[n]) {
        this.stream.shader[i].setUniform( 'N'+n , 1.0-abs(1.0 - abs(noise(frameCount*(0.003*n)+n*1000)*2.0-0.5)) ); 
      }
    }
    
    // sending image size as uniforms
    this.stream.shader[i].setUniform( 'WIDTH'  , this.stream.stack.width  ); 
    this.stream.shader[i].setUniform( 'HEIGHT' , this.stream.stack.height ); 
    this.stream.shader[i].setUniform( 'H2W'    , this.stream.stack.width/this.stream.stack.height);
    
    // sending time uniforms
    this.stream.shader[i].setUniform( 'MLS' , (millis()/1000) ); 
    this.stream.shader[i].setUniform( 'FRC' , (this.frc/60) ); 
    this.stream.shader[i].setUniform( 'FSK' , this.kfps ); 
    
    // sending control uniforms
    this.stream.shader[i].setUniform( 'A' , this.trig[0] ? 1.0 : 0.0 ); 
    this.stream.shader[i].setUniform( 'B' , this.trig[1] ? 1.0 : 0.0 ); 
    this.stream.shader[i].setUniform( 'C' , this.trig[2] ? 1.0 : 0.0 ); 
		this.stream.shader[i].setUniform( 'alpha' , i == glsl.frags.length-1 ? controls.alpha : 1.0 ); 

  }
  
}