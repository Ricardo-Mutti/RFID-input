//SCRIPT PARA LER O INPUT DE UMA TAG RFID E FAZER UMA REQUISIÇÃO

//Bibliotecas usadas
var HID = require('node-hid');
var request = require('request');

/*O boolean firstTrigger foi criado pra a requisição ser disparada uma
vez por leitura, caso contrario a função readFunc() ia ser disparada
diversas vezes.
*/

var manufacturer = 'Sycreader RFID Technology Co., Ltd';
var inputUrl = 'http://ec2-52-38-92-76.us-west-2.compute.amazonaws.com:8080/v1/';

//Boolean pra bater so uma vez a tag por segundo
var firstTriggerDistributing = true;
var firstTriggerTesting = true;
var firstTriggerHandling = true;
var firstTriggerProcessing = true;
var firstTriggerSorting = true;


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

	if(firstTriggerDistributing && data){

		console.dir('Distributing');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Distributing";
		body.inputDate = isodate;

 		request({//Monta o request
          url: inputUrl + "/register-rfid-input",
          method: "POST",
          json: true,
          body: body},
          function(err,response,body){
            if (!err && response.statusCode == 200){
                console.log("Sucesso ao enviar o Distributing request");
                console.log(isodate);
            }else{
            	console.log("Não foi possível enviar o Distributing request");
            }
        });
 		//Tempo pra poder ler outra entrada de tag
		setTimeout(function(){firstTriggerDistributing=true},1000);
		firstTriggerDistributing=false;
	}

	if(data){//Caso tenha data mantem o listener
      RFIDDistributing.read(readFuncDistributing);
	}else{//Caso contrario o device desconectou
	  console.log("RFID Distributing reader disconnected!");
	}
}

function readFuncTesting(err, data) {

	if(firstTriggerTesting && data){

		console.dir('Testing');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Testing";
		body.inputDate = isodate;
 		request({//Monta o request
          url: inputUrl + "/register-rfid-input",
          method: "POST",
          json: true,
          body: body},
          function(err,response,body){
            if (!err && response.statusCode == 200){
                console.log("Sucesso ao enviar o Testing request");
                console.log(isodate);
            }else{
            	console.log("Não foi possível enviar o Testing request");
            }
        });
 		//Tempo pra poder ler outra entrada de tag
		setTimeout(function(){firstTriggerTesting=true},1000);
		firstTriggerTesting=false;
	}

	if(data){//Caso tenha data mantem o listener
      RFIDTesting.read(readFuncTesting);
	}else{//Caso contrario o device desconectou
	  console.log("RFID reader disconnected!");
	}
}

function readFuncHandling(err, data) {

	if(firstTriggerHandling && data){

		console.dir('Handling');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Handling";
		body.inputDate = isodate;
 		request({//Monta o request
          url: inputUrl + "/register-rfid-input",
          method: "POST",
          json: true,
          body: body},
          function(err,response,body){
            if (!err && response.statusCode == 200){
                console.log("Sucesso ao enviar o Handling request");
                console.log(isodate);
            }else{
            	console.log("Não foi possível enviar o Handling request");
            }
        });
 		//Tempo pra poder ler outra entrada de tag
		setTimeout(function(){firstTriggerHandling=true},1000);
		firstTriggerHandling=false;
	}

	if(data){//Caso tenha data mantem o listener
      RFIDHandling.read(readFuncHandling);
	}else{//Caso contrario o device desconectou
	  console.log("RFID reader disconnected!");
	}
}

function readFuncProcessing(err, data) {

	if(firstTriggerProcessing && data){

		console.dir('Processing');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Processing";
		body.inputDate = isodate;
 		request({//Monta o request
          url: inputUrl + "/register-rfid-input",
          method: "POST",
          json: true,
          body: body},
          function(err,response,body){
            if (!err && response.statusCode == 200){
                console.log("Sucesso ao enviar o Processing request");
                console.log(isodate);
            }else{
            	console.log("Não foi possível enviar o Processing request");
            }
        });
 		//Tempo pra poder ler outra entrada de tag
		setTimeout(function(){firstTriggerProcessing=true},1000);
		firstTriggerProcessing=false;
	}

	if(data){//Caso tenha data mantem o listener
      RFIDProcessing.read(readFuncProcessing);
	}else{//Caso contrario o device desconectou
	  console.log("RFID processing reader disconnected!");
	}
}

function readFuncSorting(err, data) {

	if(firstTriggerSorting && data){

		console.dir('Sorting');

		var isodate = new Date().toISOString();//Pega hora local atual
		var body = {};//Cria o body da requisição
		body.inputMachine = "Sorting";
		body.inputDate = isodate;
 		request({//Monta o request
          url: inputUrl + "/register-rfid-input",
          method: "POST",
          json: true,
          body: body},
          function(err,response,body){
            if (!err && response.statusCode == 200){
                console.log("Sucesso ao enviar o Sorting request");
                console.log(isodate);
            }else{
            	console.log("Não foi possível enviar o Sorting request");
            }
        });
 		//Tempo pra poder ler outra entrada de tag
		setTimeout(function(){firstTriggerSorting=true},1000);
		firstTriggerSorting=false;
	}

	if(data){//Caso tenha data mantem o listener
      RFIDSorting.read(readFuncSorting);
	}else{//Caso contrario o device desconectou
	  console.log("RFID sorting reader disconnected!");
	}
}
