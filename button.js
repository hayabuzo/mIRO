class button {                     // here is a button class

  constructor(x,y,w,h,b=0) {       // to create a button we need to know its position, size and border around it
    
    // we recalculate its position and size according to the border, set text size (tsize), stroke weight (sw), mouse position (xm/ym)
    
    this.x = x+b/2;           this.w = w-b;             this.tsize  = 15;          this.txt = [];          this.xm = 0;      
    this.y = y+b/2;           this.h = h-b;             this.border = 20;          this.sw  = 1;           this.ym = 0;      

    // by default we set the button clickable, show border around it, do not fill it with color (bgc) and do not draw a crossaim inside it
    
    this.clickable = true;    this.showborder = true;    this.pressed = false;       this.bgc    = null;
    mouseIsPressed = false;   this.ignore     = false;   this.clicked = false;       this.cross  = false;

  }
  
  show() {  // how the button will be shown and behave
     
    if (this.showborder)    { push();

        // make a stroke bolder when we clicking the button                     
        if (this.pressed)   { noFill();    if (this.bgc!=null) fill(color(this.bgc));    this.sw = 5;     }
        else                 { noFill();   if (this.bgc!=null) fill(color(this.bgc));    this.sw = 1;     }
        stroke(skin[profile.theme].btn).strokeWeight(this.sw).rect(this.x+this.sw/2, this.y+this.sw/2, this.w-this.sw+1, this.h-this.sw+1); 

        // draw a crossaim to track mouse position over the button                     
        if (this.cross)     { push(); stroke(255,50); strokeWeight(1);
                              if (glsl.mx) rect(this.x+this.sw/2, this.y+this.sw/2, this.w*this.xm, this.h-this.sw+1);    
                              if (glsl.my) rect(this.x+this.sw/2, this.y+this.sw/2, this.w-this.sw+1, this.h*this.ym); 
                              pop(); } 
    pop(); }

    // set the text appearance on the button, there are 5 possible positions
    push();  textSize(this.tsize); noStroke().fill(skin[profile.theme].btn);  
    if(this.txt[0]!=null) textAlign(CENTER, CENTER).text(this.txt[0],this.x+this.w/2,  this.y+this.h/2               ); 
    if(this.txt[1]!=null) textAlign(LEFT,   TOP   ).text(this.txt[1],this.x+10,        this.y+10                     ); 
    if(this.txt[2]!=null) textAlign(RIGHT,  TOP   ).text(this.txt[2],this.x+this.w-10, this.y+10                     ); 
    if(this.txt[3]!=null) textAlign(LEFT,   BOTTOM).text(this.txt[3],this.x+10,        this.y+this.h-10+this.tsize/5 );
    if(this.txt[4]!=null) textAlign(RIGHT,  BOTTOM).text(this.txt[4],this.x+this.w-10, this.y+this.h-10+this.tsize/5 );
    pop(); 
    
    if (this.clickable) { // some calculations to track pressing and clicking on the button 
      
      // check if mouse is over the button
      if (mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h) this.over = true; else this.over = false;
      
      // if we are pressing outside the button and releasing over the button we need to block this button behavior
      if (!this.over && mouseIsPressed) this.ignore = true; else if (!mouseIsPressed) this.ignore = false;
      
           // calculations to distinguish pressing and clicking on the button
           if ( this.over && !this.ignore &&  mouseIsPressed)    this.pressed = true;   
      else if ( this.over && this.pressed && !mouseIsPressed) {  this.pressed = false; this.clicked = true; } 
      else if (!this.over && this.pressed && !mouseIsPressed)    this.pressed = false;   
      else                                                       this.clicked = false;
      
      // calculate and normalize mouse position
      if (this.pressed && this.over) { this.xm = (mouseX-this.x)/this.w; this.ym = (mouseY-this.y)/this.h; }
      
    }
      
  }

}

