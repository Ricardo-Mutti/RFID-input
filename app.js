//SCRIPT PARA LER O INPUT DE UMA TAG RFID E FAZER UMA REQUISIÇÃO

//Bibliotecas usadas
var HID = require('node-hid');
var request = require('request');

/*O boolean firstTrigger foi criado pra a requisição ser disparada uma
vez por leitura, caso contrario a função readFunc() ia ser disparada
diversas vezes.
*/

var manufacturer = 'Sycreader RFID Technology Co., Ltd';
var inputUrl = 'http://localhost:8080/v1/';
var machine = 'Sorting';
var firstTrigger = true;

var devices = HID.devices();//Pega todos os HID devices
var RFID;

for(i=0; i<devices.length; i++){
	var  device = new HID.HID(devices[i].path);
	//Verificar se o fabricante é o desejado
	if(device.getDeviceInfo().manufacturer==manufacturer){
		RFID = device;
		RFID.write([03, 01]); //Disable sounds and lights
		RFID.read(readFunc);//Seta a função read como listener
		console.log('rfid device', RFID.getDeviceInfo());
	}
}

if(!RFID) {//Caso não tenha devices conectados
    console.log("No RFID reader devices found");
    process.exit(0);
}

function readFunc(err, data) {
 
	if(firstTrigger && data){

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = machine;
		body.inputDate = isodate;

 		request({//Monta o request
          url: inputUrl + "/register-rfid-input",
          method: "POST",
          json: true,
          body: body},
          function(err,response,body){
            if (!err && response.statusCode == 200){
                console.log("Sucesso ao enviar o request");
            }else{
            	console.log("Não foi possível enviar o request");
            }
        });
 		//Tempo pra poder ler outra entrada de tag
		setTimeout(function(){firstTrigger=true},1000);
		firstTrigger=false;
	}

	if(data){//Caso tenha data mantem o listener
      RFID.read(readFunc);
	}else{//Caso contrario o device desconectou
	  RFID.close();
	  console.log("RFID reader disconnected!");
	}
}

