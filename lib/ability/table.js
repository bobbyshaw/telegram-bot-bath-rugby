'use strict';

var Promise = require('promise');
var Ability = require('../ability');

/**
 * Respond to Premiership table information request
 */
class Table extends Ability {

    /**
     * Create new Table ability
     * @param {string} intent - The intent that the ability knows how to deal with.
     */
    constructor () {
        super('table');
    }

    /**
     * Generate response for message
     * @return {Promise<String, Error>} Message response
     */
    respond(message) {
        return Promise.resolve("I don't have table information right now, but I'm working on it!")
    }
}

module.exports = Table;
