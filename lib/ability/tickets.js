'use strict';

var Promise = require('promise');
var Ability = require('../ability');

/**
 * Respond to tickets information request
 */
class Tickets extends Ability {

    /**
     * Create new Tickets ability
     * @param string intent - The intent that the ability knows how to deal with.
     */
    constructor () {
        super('tickets');
    }

    /**
     * Generate response for message
     * @param {Message} - Chat Message
     * @return {Promise<string, Error>} Message response
     */
    respond(message) {
        return Promise.resolve('Sorry, I don\'t know about tickets, check the website.');
    }
}

module.exports = Tickets;
