'use strict';

var Promise = require('promise');
var Ability = require('../ability');

/**
 * Respond to request for help
 */
class Help extends Ability {

    /**
     * Create new Help ability
     * @param {string} intent - The intent that the ability can handle.
     */
    constructor () {
        super('help');
    }

    /**
     * Generate response for message
     * @param {Message} - Chat Message
     * @return {Promise<string, Error>} message - Message received
     */
    respond(message) {
        return Promise.resolve('Ask me about previous results, upcoming fixures'
            + ', and the Aviva league table.');
    }
}

module.exports = Help;
