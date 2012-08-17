//create an app server
var express = require("express")
var app = express();
app.use(express.bodyParser());
//set path to the views (template) directory
app.set('views', __dirname + '/views');
//set path to static files
app.use(express.static(__dirname + '/public'));
//handle GET requests on /
app.get('/', function(req, res){res.render('layout.jade', {title: 'Virtual Compute Fabric'});});
app.post('/launch', function(req, res){
	var appname = req.param('appname',null);
	console.log('req.body.appname', appname);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("Got: appname=" +appname,"utf8");
  res.end();

});
//listen on localhost:3000
app.listen(3000);
