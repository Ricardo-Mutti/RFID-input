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
var firstTrigger = true;

//Path das usbs
var pathDistributing = 'USB_08ff_0009_14100000';
var pathTesting = 'USB_08ff_0009_1a121000';
var pathHandling = 'USB_08ff_0009_1a122000';
var pathProcessing = 'USB_08ff_0009_1a123000';
var pathSorting = 'USB_08ff_0009_1a124000';

var devices = HID.devices();//Pega todos os HID devices
var devicesArray = [];
var readersArray = [];
var readersArrayAux = [];

var RFIDDistributing;
var RFIDTesting;
var RFIDHandling;
var RFIDProcessing;
var RFIDSorting;

// console.dir(devices);

// setInterval(addReaders,1000);

for(var i=0; i<devices.length; i++){

	switch(devices[i].path){

		case pathDistributing:
			console.dir("Registrou Distributing");
			RFIDDistributing = new HID.HID(devices[i].path);
			RFIDDistributing.read(readFuncDistributing);
		break;

		case pathTesting:
			console.dir("Registrou Testing");
			RFIDTesting = new HID.HID(devices[i].path);
			RFIDTesting.read(readFuncTesting);
		break;

		case pathHandling:
			console.dir("Registrou Handling");
			RFIDHandling = new HID.HID(devices[i].path);
			RFIDHandling.read(readFuncHandling);
		break;

		case pathProcessing:
			console.dir("Registrou Processing");
			RFIDProcessing = new HID.HID(devices[i].path);
			RFIDProcessing.read(readFuncProcessing);
		break;

		case pathSorting:
			console.dir("Registrou Sorting");
			RFIDSorting = new HID.HID(devices[i].path);
			RFIDSorting.read(readFuncSorting);
		break;
	}
};


function readFuncDistributing(err, data) {

	if(firstTrigger && data){

		console.dir('Distributing');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Distributing";
		body.inputDate = isodate;

 		request({//Monta o request
          url: inputUrl + "/register-rfid-input-redes",
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
      RFIDDistributing.read(readFuncDistributing);
	}else{//Caso contrario o device desconectou
	  console.log("RFID reader disconnected!");
	}
}

function readFuncTesting(err, data) {

	if(firstTrigger && data){

		console.dir('Testing');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Testing";
		body.inputDate = isodate;
 		request({//Monta o request
          url: inputUrl + "/register-rfid-input-redes",
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
      RFIDTesting.read(readFuncTesting);
	}else{//Caso contrario o device desconectou
	  console.log("RFID reader disconnected!");
	}
}

function readFuncHandling(err, data) {

	if(firstTrigger && data){

		console.dir('Handling');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Handling";
		body.inputDate = isodate;
 		request({//Monta o request
          url: inputUrl + "/register-rfid-input-redes",
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
      RFIDTesting.read(readFuncTesting);
	}else{//Caso contrario o device desconectou
	  console.log("RFID reader disconnected!");
	}
}

function readFuncProcessing(err, data) {

	if(firstTrigger && data){

		console.dir('Processing');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Processing";
		body.inputDate = isodate;
 		request({//Monta o request
          url: inputUrl + "/register-rfid-input-redes",
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
      RFIDTesting.read(readFuncTesting);
	}else{//Caso contrario o device desconectou
	  console.log("RFID reader disconnected!");
	}
}

function readFuncSorting(err, data) {

	if(firstTrigger && data){

		console.dir('Sorting');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Sorting";
		body.inputDate = isodate;
 		request({//Monta o request
          url: inputUrl + "/register-rfid-input-redes",
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
      RFIDTesting.read(readFuncTesting);
	}else{//Caso contrario o device desconectou
	  console.log("RFID reader disconnected!");
	}
}
