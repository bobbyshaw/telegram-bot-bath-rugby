'use strict';

/**
 * Internal Entity definition that external communication
 * is transformed into for consistency and control.
 */
class Entity {

    /**
     * Create new entity
     * @param {string} type - What type of entity was found
     * @param {string} value - What was the value of the entity type
     */
    constructor (type, value) {
        this.type = type;
        this.value = value;
    }
}

module.exports = Entity;
