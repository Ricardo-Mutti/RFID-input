
// https://github.com/node-hid/node-hid - Biblioteca do RFID
var HID = require('node-hid');


var manufacturer = 'Sycreader RFID Technology Co., Ltd';
var machine = 'Sorting';
var firstTrigger = true;

var devices = HID.devices();
var RFID;

	for(i=0; i<devices.length; i++){
		var  device = new HID.HID(devices[i].path);
		if(device.getDeviceInfo().manufacturer==manufacturer){
			RFID = device;
			RFID.write([03, 01]); //Disable sounds and lights
   			RFID.read(readFunc);
			console.log('rfid device', RFID.getDeviceInfo());
		}
	}

	if(!RFID) {
	    console.log("No RFID reader devices found");
	    process.exit(0);
	}


function readFunc(err, data) {

	if(firstTrigger){
		console.log("TODO: Gravar a hora atual no back");
		setTimeout(function(){firstTrigger=true},1000);
		firstTrigger=false;
	}

	RFID.read(readFunc);	
		}
