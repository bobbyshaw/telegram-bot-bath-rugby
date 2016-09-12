'use strict';

/**
 * Internal person definition that external communication
 * is transformed into for consistency and control.
 */
class Person {

    /**
     * Create new person
     * @param {number} id - Unique Identifier for person (External ID)
     * @param {string} firstName - Person's first name
     * @param {string} lastName - Person's last name
     * @param {string} username - Chat network username
     */
    constructor (id, firstName, lastName, username) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}

module.exports = Person;
