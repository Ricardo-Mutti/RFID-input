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


var RFIDDistributing;
var RFIDTesting;
var RFIDHandling;
var RFIDProcessing;
var RFIDSorting;



setInterval(addReaders,1000);


//Encontrar leitores RFID
function addReaders(){

var hasOneReader = false;
var devices = HID.devices();//Pega todos os HID devices
let i;
for(i=0; i<devices.length; i++){
	try{
		var  device = new HID.HID(devices[i].path);
		console.dir(device,getDeviceInfo());
	}catch (Error){
		console.dir("nuuee");
	}

	
	// Verificar se o fabricante é o desejado
	if(device != null && device.getDeviceInfo().manufacturer==manufacturer){
		hasOneReader = true;
		if(RFIDDistributing==null){
		   RFIDDistributing = device;
		   RFIDDistributing.machine ='Distributing';
		   console.log(RFIDDistributing.machine);
		}else{
		  if(RFIDTesting==null){
		     RFIDTesting = device;
		     RFIDTesting.machine ='Testing';
		      console.log(RFIDTesting.machine);
		     }
		     // else{	
		//      	if(RFIDProcessing==null){
		//           RFIDProcessing = device;
		//            console.dir(RFIDProcessing.path);
		//      }else{	
		   
		//   }
	 //   }
	 }
  }else{
  	 if(device==null){
  		hasOneReader = true;
   }
  }
 }
   if(i==devices.length && !hasOneReader){
  	throw new Error("Nenhuma tag RFID conectada!");
  }
}		
    // RFIDArray[j].write([03, 01]); //Disable sounds and lights
	// RFIDArray[j].read(readFunc(j));//Seta a função read como listener
	// console.log('rfid device', RFID.getDeviceInfo());


// if(!RFIDArray.length==0) {//Caso não tenha devices conectados
//     console.log("No RFID reader devices found");
//     process.exit(0);
// }

function readFunc(err, data) {

	if(firstTrigger && data){

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
      RFIDArray[index].read(readFunc);
	}else{//Caso contrario o device desconectou
	  console.log("RFID reader disconnected!");
	}
}

