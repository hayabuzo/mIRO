class Ear {
	
	constructor() { 

		//this.detection = false;

	  //this.mic = new p5.AudioIn();       this.mic.start();    
		//this.fft = new p5.FFT(0.8, 16);    this.mic.connect(this.fft);
		//this.pdt = new p5.PeakDetect();    this.sync = false;

		this.beatArray = [0,0,0,0,0];  		this.peakArray = [];     		                       
		this.beatCount = [0,0,0,0,0];  		this.peakTime = 0;    		         
    this.beatTime  = 0;		            this.peakSize = 0;  
    this.beatDelay = 60000/120;
		
		this.b = [false,false,false,false,false];
		this.txt = "";
		
	}
	
	listen() {
		
	  //this.fft.analyze(); 
		//this.pdt.update(this.fft);

		this.peakSize *= 0.9; 
		if (onKey("b") ) {
			this.peakSize = 1.0;
			this.peakArray.push(int(millis()-this.peakTime)); this.peakTime = millis();
			if (this.peakArray.length > this.beatArray.length) { 
				this.peakArray.splice(0,1);
				this.beatDelay = 0;
				for (let i = 0; i<this.beatArray.length; i++ ) { this.beatDelay += this.peakArray[i]; } 
				this.beatDelay /= this.beatArray.length ;
			} // print(this.peakArray.join("+")+" "+this.beatDelay);
		}		
		
		for (let i=0; i<this.beatArray.length; i++) {
			if (this.beatArray[i] == 1.0) {
				this.beatCount[i] += 1.0;
			  if (this.beatCount[i] % 2.0 == 1.0 && i != this.beatArray.length-1) this.beatArray[i+1] = 1.0;
				this.b[i] = true;
			} else this.b[i] = false;
			this.beatArray[i] *= 0.9;
		}
		
		if(random()<0.8 && this.peakSize==1.0) this.sync = true; else this.sync = false;
		if (this.beatDelay!=0 && ( (this.beatTime + this.beatDelay/2*0.99 < millis()) || (this.sync && this.beatCount[0] % 2.0 == 0.0)  ) ) {
			this.beatTime = millis();	this.beatArray[0] = 1.0;
			if (this.sync) toLog("beat sync: "+int(60000/this.beatDelay)+" <");
		}
		
		this.txt = ""; for (let i=0; i<this.beatArray.length; i++) { this.txt += this.beatArray[i]>0.5 ? mbeat[i]==""?"▮":"●" : mbeat[i]==""?"▯":"◌"; }

	}
	
}