'use strict';

var Promise = require('promise');
var Ability = require('../ability');

/**
 * Respond to product information request
 */
class Products extends Ability {

    /**
     * Create new Products ability
     * @param {string} intent - The intent that the ability can handle
     */
    constructor () {
        super('products');
    }

    /**
     * Generate response for message
     * @return {Promise<string, Error>} message - Message received
     */
    respond(message) {
        return Promise.resolve('I\'m not in the know about our product catalogue'
            + ', but I\'m learning!');
    }
}

module.exports = Products;
