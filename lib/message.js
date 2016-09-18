'use strict';

/**
 * Internal message definition that external communication
 * is transformed into for consistency and control.
 */
class Message {

    /**
     * Create new message
     * @param {string} chatNetwork - Chat network message came from, e.g. telegram
     * @param {integer} chatId - Unique Identifier for chat
     * @param {integer} messageId - Unique Identifier for message
     * @param {integer} date - Date time that the message was sent
     * @param {Person} person - Person that sent the message
     * @param {Object} context - Context of the message
     * @param {string} context.team - Team in context
     * @param {string} text - Message content
     * @param {integer} inReplyToMessageId - Message ID of previous message if in a thread
     * @param {Intent[]} intents - What are the intents of the message
     * @param {Entity[]} entities - What entities are in the message
     * @param {string} response - What is the response to the message
     */
    constructor (chatNetwork, chatId, messageId, date, person, context,
        text = '', inReplyToMessageId, intents = [], entities = [],
        response = '') {

        this.chatNetwork = chatNetwork;
        this.chatId = chatId;
        this.messageId = messageId;
        this.person = person;
        this.context = context;
        this.text = text;
        this.inReplyToMessageId = inReplyToMessageId;
        this.intents = intents;
        this.entities = entities;
    }

    /**
     * Get opposition mentioned, if any
     * @return {string[]} List of opposition teams, if any
     */
    getOpposition() {
        var opposition = [];
        for (let entity of this.entities) {
            let value = entity.value.toLowerCase();
            if (entity.type === 'Team' && value !== this.context.team) {
                opposition.push(value);
            }
        }

        return opposition;
    }

    /**
     * Is home mentioned in the message?
     * @return {boolean}
     */
    hasHome() {
        return this._hasLocationValue('home');
    }

    /**
     * Is away mentioned in the message?
     * @return {boolean}
     */
    hasAway() {
        return this._hasLocationValue('away');
    }

    /**
     * Get team that the message is in context of.
     * @return {string} Team
     */
    getTeam() {
        return this.context.team;
    }

    /**
     * Get all teams mentioned and team in context
     * @return {string[]} List of team names
     */
    getTeams() {
        let teams = this.getOpposition();
        teams.push(this.getTeam());
        return teams;
    }

    /**
     * Does this message have the provided intent?
     * @param {string} intent - Needle of intent
     * @returns {boolean} True if message has intent
     */
    hasIntent(intent) {
        for (let item of this.intents) {
            if (item.intent === intent) {
                return true;
            }
        }

        return false;
    }

    /**
     * Is location value mentioned in the message?
     * @return {boolean}
     */
    _hasLocationValue(value) {
        for (let entity of this.entities) {
            if (entity.type === 'Location') {
                if (entity.value === value) {
                    return true;
                }
            }
        }

        return false;
    }
}

module.exports = Message;
