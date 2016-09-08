'use strict';

var http = require('http');
var rugbybot = require('./lib/rugbybot');

var team = 'bath rugby';
var bot = new rugbybot(team, true);
bot.initialise();

/* Listen to web requests in order to make sure
 * that bluemix doesn't shut the app down because it
 * thinks that it's crashed.
 */
var server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('The Rugby Bot is listening for messages for ' + team);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

var port = process.env.VCAP_APP_PORT || 8080;
server.listen(port);
