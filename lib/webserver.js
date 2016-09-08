'use strict';

var http = require('http');

/**
 * Listen to web requests in order to make sure
 * that bluemix doesn't shut the app down because it
 * thinks that it's crashed.
 */
class Webserver {
    constructor (port) {
        this.port = port || process.env.VCAP_APP_PORT || 8080;
    }

    start() {
        this.server = http.createServer((request, response) => {
          response.writeHead(200, {'Content-Type': 'text/plain'});
          response.end('The Rugby Bot is listening for messages.');
        });

        this.server.on('clientError', (err, socket) => {
          socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        });

        this.server.listen(this.port);
    }
}

module.exports = Webserver;
