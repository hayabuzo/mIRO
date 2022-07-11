keyboard = [];
controls =  { play:false, alpha:1.0, xm:-1.0, ym:-1.0, am:1.0, recChan:0, record: -1, keyset:[]};
keylog = "";
//mbeat = [[],["y"],["t"],["w","1"],["w","2"]];
mbeat = [[],[],[],[],[]];

function keyPressed()  { if (keyIsPressed) keyboard.push(key); controls.keyset.push(key); }
function keyReleased() { keyUp(key); } 

function keyDown(k)    { keyboard.push(k); }
function keyUp(k)      { if(isKey(k)) { delVal(keyboard,k); }  } 

function onKey(k)      { let t=keyboard.includes(k); keyUp(k); return t; }
function isKey(k)      { return keyboard.includes(k); }

function delVal(arr,v) { let indexOfObject = arr.findIndex(object => { return arr === v }); arr.splice(indexOfObject, 1); }

// -----------------------------------

function keyCheck() {
	
	if (onKey("h")) { profile.keymode = !profile.keymode; }
	
	if (controls.play && profile.keymode) gui.update();
	
if (controls.record==-1 && profile.keymode) {
	
	if (onKey("z")) gui.trig[0] = !gui.trig[0];
	if (onKey("x")) gui.trig[1] = !gui.trig[1];
	if (onKey("c")) gui.trig[2] = !gui.trig[2];
	
	if (onKey("t")) { for (let i in gui.trig) { gui.trig[i] = random([true,false]); } }
	if (onKey("y")) { controls.xm = random(); controls.ym = random(); }
	
	if (onKey("s")) { gui.saveImage();  toLog("image saved");  }
	if (onKey("f")) { gui.saveFilter(); toLog("filter saved"); }
	
	if (isKey("n")) gui.stream.stack.image(gui.stream.camera,0,0,gui.stream.stack.width,gui.stream.stack.height);
	if (onKey("m")) controls.play = !controls.play;
	if (onKey("o")) { ear.detection = !ear.detection; toLog("beat detection: "+ear.detection); }
	if (onKey("i")) controls.record = 0 ;
	
	for (let i=0; i<=9; i++) { if (onKey(str(i))) {
		if (i>=1 && i<=5) {  
			if (isKey("`")) keyRecontrol(i);
		  if (isKey("q")) { keyReplace(i);   controls.alpha = 0.0; controls.am = 1.0; }
			if (isKey("w")) keySwitch(i); 
		  if (isKey("e")) keyErase(i);   
		  if (isKey("r")) { keyRandomMix(i); controls.alpha = 0.0; controls.am = 1.0; }
		  if (isKey("a") && gui.stream.shader.length<5) keyAdd(i);   
		}
		if (isKey(",")) controls.xm = i*0.11;
		if (isKey(".")) controls.ym = i*0.11;
		if (isKey("/")) controls.am = i==0? 1.0 : i*0.1;
	} } 
	
	if (controls.xm >= 0.0) gui.buttons.f1.play.xm += (controls.xm - gui.buttons.f1.play.xm)/20;
  if (controls.ym >= 0.0) gui.buttons.f1.play.ym += (controls.ym - gui.buttons.f1.play.ym)/20;
	if (gui.buttons.f1.play.clicked) { controls.xm = -1; controls.ym = -1; }
	
}
	
	if (controls.record==0) { 
		toLog("select channel"); 
		controls.record = 1; 		
	}
	
	if (controls.record==1) { 
		for (let i=1; i<=5; i++) { 
			if (onKey(str(i))) { 
				controls.recChan = i;
			  controls.record = 2; 	
				toLog("channel #"+i+" selected"); 
				controls.keyset = [];
			} 
		}
	}
	
	if (controls.record == 2 && keyCode === ENTER)  { 
		controls.record = 3; 
		delVal(controls.keyset,"Enter");
	}
	
	if (controls.record == 3)  { 
		toLog("recorded macro #"+controls.recChan+": "+controls.keyset); 
		mbeat[controls.recChan-1] = controls.keyset.slice(); 
		controls.record = -1; 
		controls.recChan = 0; 
	}
	
	controls.alpha += (controls.am - controls.alpha)/20;
	
	if (!keyIsPressed) keyboard = [];
	
	for (let n=mbeat.length; n>=0; n--) {
		if (ear.b[n] && mbeat[n]!="") { 
			for (let i in mbeat[n]) { 
				if (mbeat[n][i]!="") keyDown(mbeat[n][i]);
			} 
		}
	}	
	
	//print(keyboard, controls.recChan);	
	
}
	
// -----------------------------------

function keyAdd(layer) { let m = keyTGet();
	m.splice(layer, 0, keyRandomShader()); 
  keyTSet(m); }

function keyErase(layer) { let m = keyTGet();
  m.splice(layer, 1); 
	keyTSet(m);	}

function keyReplace(layer) { let m = keyTGet();
	m.splice(layer, 1, keyRandomShader()); 
	keyTSet(m);	}

function keySwitch(layer) { let m = keyTGet();
	if (layer<m.length-1) {
		let t = m[layer+1]; 
		m.splice(layer+1 , 1); 
		m.splice(layer, 0, t); }
	keyTSet(m);	}

function keyRecontrol(layer) { let m = keyTGet();
	if (layer<m.length) {
	  m[layer] = m[layer].split(" # ");
	  m[layer] = " # " + m[layer][1] + " # " + keyRandomControl(1) + " # \n";	}
	keyTSet(m); }

function keyRandomMix(amount) {
	let m = [];
	for (let i=1; i<=amount; i++) {
		m[i] = keyRandomShader();
	} keyTSet(m);	
}
	
// -----------------------------------

function keyRandomShader() { print(glsl.names); return (" # "+random(glsl.names)+" # "+keyRandomControl(0)+" #\n"); }

function keyRandomControl(mode) {
  if (mode==0) return random(["A","a"])+random(["B","b"])+random(["C","c"])+random(["X","x"])+random(["Y","y"]);
	if (mode==1) { let c = ""; for (let i=0; i<3; i++) { c+=random(["A","B","C","a","b","c"]); } c+=random(["X","x"]); c+=random(["Y","y"]); return c; }
	if (mode==2) { let c = ""; for (let i=0; i<5; i++) { c+=random(["A","B","C","a","b","c","X","x","Y","y"]); } return c; }
}
	
function keyNameUpdate(m) {
  m[0] = "";
  if (m[1]!=null) for (let i=1; i<m.length; i++) { 
    m[0] = m[0] + "-" + m[i].substring(3,3+3);
  } m[0] = m[0].substring(1).replace(/\s/g, '') + "\n";
}
	
// -----------------------------------

function keyTGet()  { return txtar.value().split("@"); }
function keyTSet(m) { keyNameUpdate(m); txtar.value(join(m,"@")); gui.compile(); gui.setHead();	}

// -----------------------------------

function toLog(txt) {
	let a = keylog.split("\n");
	if (a.length<4) keylog += "\n"+txt+" •";
	else { a.splice(0,1); keylog = join(a,"\n")+"\n"+txt+" •"; } 
}