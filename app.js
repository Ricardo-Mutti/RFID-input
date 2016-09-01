
// https://github.com/node-hid/node-hid - Biblioteca do RFID
var HID = require('node-hid');
var request = require('request');


var manufacturer = 'Sycreader RFID Technology Co., Ltd';
var machine = 'Sorting';
var inputUrl = 'http://localhost:8080/v1/';
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
 
	if(firstTrigger && data){
		var isodate = new Date().toISOString();
		console.log("Date", isodate);

		var body = {};
		body.inputMachine = machine;
		body.inputDate = isodate;

 		request({
          url: inputUrl + "/register-rfid-input",
          method: "POST",
          json: true,
          body: body},
          function(err,response,body){
            if (!err && response.statusCode == 200)
            console.log("Sucesso ao enviar o post");
        });

		setTimeout(function(){firstTrigger=true},1000);
		firstTrigger=false;
	}

	if(data){
     RFID.read(readFunc);
	}
	else{
	RFID.close();
	console.log("RFID reader disconnected!");
	}

		}
