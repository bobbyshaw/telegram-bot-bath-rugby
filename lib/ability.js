'use strict';

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
     * @return string
     */
    respond(message) {
        return '';
    }
}

module.exports = Ability;
