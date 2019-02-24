var express = require('express')
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var port = 80;
var fs = require('fs');

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.render('index.ejs',{'title':'Hello World'});
});

io.on('connection', function(socket){

	console.log('a user connected');

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


http.listen(port, function(){
  console.log('listening on *:8000');
});
