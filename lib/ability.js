'use strict';

var Promise = require('promise');

/**
 * Declare an ability to generate a response for a specific intent given a message
 */
class Ability {

    /**
     * Create new ability
     * @param string intent - The intent that the ability knows how to deal with.
     */
    constructor (intent) {
        this.intent = intent;
    }

    /**
     * Generate response for message
     * @param {Message} message - Chat message
     * @return {Promise<String, Error>} Message response via promise
     */
    respond(message) {
        return Promise.resolve('');
    }
}

module.exports = Ability;
