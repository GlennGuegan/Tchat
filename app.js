var app = require('express')()
  , server = require('http').createServer(app)
  , fs = require('fs')
  , io = require('socket.io').listen(server)
  , ent = require('ent');


app.get('/',function(req,res){
  res.sendfile(__dirname + '/index.html');
});

var i = 1;

io.sockets.on('connection', function(socket){
  
//  socket.broadcast.emit("message", socket.pseudo+ " vient de se connecter ! ");
  socket.on("message", function(message){
    socket.message = ent.encode(message)
    socket.broadcast.emit("msg-broadcast" , {pseudo:socket.pseudo,message:socket.message});
    i++;
  });
  socket.on("pseudo", function(pseudo){
    socket.pseudo = ent.encode(pseudo);
    socket.messageFirstConnection = "<i>vient de se connecter !</i>";
    socket.broadcast.emit("new-user", {pseudo:socket.pseudo, message:socket.messageFirstConnection});
  });
});


server.listen(8080);