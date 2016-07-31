/*
    NOCKETS.IO - a collaborative effort between NODE.js and SOCKETS.io
*/

var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;

    switch(path){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('hello wirld');
            res.end();
            break;
        case '/socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if(error){
                    res.writeHead(404);
                    res.write("page doesn't exist - 404");
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data, 'utf8');
                    res.end();
                }
            });
            break;
       default:
            res.writeHead(404);
            res.write("sorry, this doesn't exist - 404");
            res.end();
            break;
    }
});

server.listen(8001);

var listener = io.listen(server);

listener.sockets.on('connection', function(socket){
    socket.emit('message', {'message': 'hey yeaaah!'});
});


listener.sockets.on('connection', function(socket){
    // server to client emit
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 1000);
    // client to server emit
    socket.on('client_data', function(data){
        process.stdout.write(data.letter);
    });
});

    