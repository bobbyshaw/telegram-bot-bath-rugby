'use strict';

var http = require('http');
var rugbybot = require('./lib/rugbybot');
var webserver = require('./lib/webserver');

var team = 'bath rugby';
var bot = new rugbybot(team, true);
bot.initialise();


var server = new webserver();
server.start();
