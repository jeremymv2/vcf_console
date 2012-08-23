var stomp = require('stomp');
var receipt = false;

var stomp_args = {
    port: 61613,
    host: '127.0.0.1',
    debug: false,
}

function sendMsg(appname) {
	var client = new stomp.Stomp(stomp_args);
	var queue = '/queue/incoming.vcf';
	client.connect();

	client.on('connected', function() {
    client.send({
          'destination': queue,
          'body': JSON.stringify({ name: appname }),
          'persistent': 'true'
      }, receipt);
  	console.log('Produced message with body ' + appname);
  	client.disconnect();
  	//process.exit(0);
	});

	client.on('receipt', function(receipt) {
    console.log("RECEIPT: " + receipt);
	});

	client.on('error', function(error_frame) {
    console.log(error_frame.body);
    client.disconnect();
	});
}

exports.sendMsg = sendMsg;
