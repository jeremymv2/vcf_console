var express = require("express")
var app = express();
var producer = require("./producer");

app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){res.render('layout.jade', {title: 'Virtual Compute Fabric'});});
app.post('/launch', function(req, res){
	var appname = req.param('appname',null);
	console.log('req.body.appname', appname);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("Got: appname=" +appname,"utf8");
  //res.writeHead(302, {
  //	'Location': '/status'
	//});
  res.end();
  producer.sendMsg(appname);

});
app.listen(3000);
