function getProfile() {          // load profile with program settings

  skin    = [];                                                                                   // create array of visual themes
  skin[0] = { bgr: '#424949', btn: '#CACFD2', txt: '#FFFFFF', run: '#0B5345', err: '#641E16' };   // dark theme
  skin[1] = { bgr: '#F8F9F9', btn: '#5D5F61', txt: '#000000', run: '#D5F5E3', err: '#FADBD8' };   // light theme

  default_profile = {            // default profile setting are:
    resolution: "min",           // set minimal resolution
    resize:     1,               // do not enlarge image size
    frontal:    false,           // use main camera
    clicking:   false,           // do not use clicking mode
    stablevel:  0.0,             // stabilization off
    filetype:   "jpg",           // save files in 'jpg'
    forcing:    false,           // do not use force loading
    livecode:   true,            // livecoding enabled;
    window:     1,               // do not reduce window size
    code:       glsl.default,    // load default shader code
    theme:      0,               // load dark skin
		keymode:    false,           // keymode off
		pack:       0,               // select default preset pack
  };

  // if URL ends with "?r=1" do the profile reset
  if (getURLParams().r==1) removeItem('settings_profile');            

  // create temporary profile and try to load data into it from the browser's memory
  p_temp = {}; if (getItem('settings_profile')!=null) p_temp = getItem('settings_profile');

  // load profile of settings
  profile = getItem('settings_profile');
	
	print(default_profile);
	print(profile);
  
  // check if there are missing variables in loaded profile
	if (profile == null) profile = [];
  for (let i in default_profile) { if (profile[i] == undefined || profile[i] == null) profile[i] = default_profile[i]; }
  
  // force loading is needed to allow the browser to save multiple files at startup
  if (profile.forcing) { save('','?.txt'); save('','?.txt'); }
  
}