'use strict';

/**
 * Internal Intent definition that external communication
 * is transformed into for consistency and control.
 */
class Intent {

    /**
     * Create new intent
     * @param string intent - What is the intent
     * @param double confidence - How confident are we of this intent
     */
    constructor (intent, confidence) {
        this.intent = intent;
        this.confidence = confidence;
    }
}

module.exports = Intent;
