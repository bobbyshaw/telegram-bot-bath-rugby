'use strict';

var watson = require('watson-developer-cloud');

/**
 * Communicate with IBM Watson Conversation API to identify
 * intents in chat messages
 */
class Intents {
    constructor(username, password, workspaceId, versionDate, version) {
        this.username = username || process.env.CONVERSATION_USERNAME;
        this.password = password || process.env.CONVERSATION_PASSWORD;
        this.workspaceId = workspaceId || process.env.WORKSPACE_ID;
        this.versionDate = versionDate || '2016-07-11';
        this.version = version || 'v1';

        this.watsonConversation =  watson.conversation({
            username: this.username,
            password: this.password,
            version_date: this.versionDate,
            version: 'v1'
        });
    }

    /**
     * Identify intents in text message
     * @param function err - Error handler
     * @param function callback - Function to call on success
     * @param Object message - Telegram chat object
     */
    getIntents(err, callback, message) {
        this.watsonConversation.message({
            workspace_id: this.workspaceId,
            input: {'text': message.text}
        }, function messageResponse (error, response) {
            if (error) {
                err(error);
            } else {
                callback(response, message);
            }
        });
    }
}

module.exports = Intents;
