'use strict';

var util = require('util');
var Promise = require('promise');
var dotenv = require('dotenv').config();
var Analyser = require('./analyser');
var FixtureAbility = require('./ability/fixture');
var GreetingAbility = require('./ability/greeting');
var HelpAbility = require('./ability/help');
var ProductsAbility = require('./ability/products');
var ResultAbility = require('./ability/result');
var TableAbility = require('./ability/table');
var TelegramBot = require('./telegramBot');
var TicketsAbility = require('./ability/tickets');

/*
 * Telegram chat bot that answers requests for fixture info.
 */
class RugbyBot {
    constructor(team, debug) {
        this.team = team;
        this.debug = debug || false;
    }

    /**
     * Start listening for telegram messages
     */
    initialise() {
        this.bot = new TelegramBot(null, null, {"team": this.team});
        this.analyser = new Analyser();
        this.abilities = [
            new GreetingAbility(),
            new HelpAbility(),
            new FixtureAbility(),
            new ResultAbility(),
            new TableAbility(),
            new TicketsAbility(),
            new ProductsAbility()
        ];

        this.bot.onTextMessage(this.logError.bind(this), this.onTextMessage.bind(this));
    }

    /**
     * Handle receiving a text message and send a response
     * @param {Message} message - Message Received
     */
    onTextMessage(message) {
        this.log('Received message: ' + message.text);

        this.analyser.analyse(message)
            .then(message => {
                return this.generateResponse(message);
            })
            .then(messsage => {
                return this.sendResponse(message);
            })
            .catch(error => {
                this.logError(error);
            });
    }

    /**
     * Go through abilities to find one that can generate a response
     * @param {Message} message - Received message
     * @returns {Promise<Message, Error>} Promise with updated message
     */
    generateResponse(message) {
        return new Promise((resolve, reject) => {
            var responses = [];
            var intentPromises = [];
            for (let ability of this.abilities) {
                if (message.hasIntent(ability.intent)) {
                    intentPromises.push(ability.respond(message));
                }
            }

            Promise.all(intentPromises)
                .then(responses => {
                    message.response = responses.join('\n');
                    if (!message.response) {
                        message.response = 'Sorry, I\'m not able to help you with that.';
                    }

                    resolve(message);
                }).catch(error => {
                    this.logError(error);
                });
        });
    }

    /**
     * Send reply to chat message
     * @param Message message - Message object
     * @param {Promise}
     */
    sendResponse(message) {
        return this.bot.sendMessage(message.chatId, message.response);
    }

    /**
     * Generic error handler
     * We always log when there's an error.
     * @param {Error} e - Error
     */
    logError(e) {
        console.log(e.name + ': ' + e.message);
    }

    /**
     * Log Error message if debug mode enabled
     * @param message - Message to log to console.
     * @param object - Optional object to dump
     */
    log(message, object) {
        if (this.debug) {
            if (object === 'undefined') {
                console.log(message);
            } else {
                console.log(message, object);
            }
        }
    }
}

module.exports = RugbyBot;
