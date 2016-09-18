'use strict';

var http = require('http');
var Rugbybot = require('./lib/rugbybot');
var Webserver = require('./lib/webserver');

var team = 'bath rugby';
var bot = new Rugbybot(team, true);
bot.initialise();


var server = new Webserver();
server.start();
