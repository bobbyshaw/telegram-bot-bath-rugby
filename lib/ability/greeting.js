'use strict';

var Promise = require('promise');
var Ability = require('../ability');

/**
 * Respond to greeting
 */
class Greeting extends Ability {

    /**
     * Create new Greeting ability
     * @param {string} intent - The intent that the ability can handle
     */
    constructor () {
        super('greeting');
    }

    /**
     * Generate response for message
     * @param {Message} - Chat Message
     * @return {string} message - Message received
     */
    respond(message) {
        return Promise.resolve('Hi there! You can ask me about Aviva '
            + 'Premiership fixtures,results and shakers and movers in the table.');
    }
}

module.exports = Greeting;
