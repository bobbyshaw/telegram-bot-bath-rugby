'use strict';

var watson = require('watson-developer-cloud');
var Entity = require('./entity');
var Intent = require('./intent');

/**
 * Communicate with IBM Watson Conversation API to identify
 * intents and entities in chat messages
 */
class Analyser {
    /**
     * Initialise Analyser
     * @param {string} username - Watson API username
     * @param {string} password - Watson API password
     * @param {string} workspaceId - Watson workspace identifier
     * @param {string} versionDate - Watson API version date to use
     * @param {string} version - Watson API version to use
     * @param {Object} library - Watson library instance to use. Expects message()
     */
    constructor(username, password, workspaceId, versionDate, version, library) {
        this.username = username || process.env.CONVERSATION_USERNAME;
        this.password = password || process.env.CONVERSATION_PASSWORD;
        this.workspaceId = workspaceId || process.env.WORKSPACE_ID;
        this.versionDate = versionDate || '2016-07-11';
        this.version = version || 'v1';
        this.watsonConversation = library || watson.conversation({
            username: this.username,
            password: this.password,
            version_date: this.versionDate,
            version: 'v1'
        });
    }

    /**
     * Analyse message for intents and entities
     * @param {Message} message - Chat Message
     * @return {Promise<Messsage, Error>} Message with analysis
     */
    analyse(message) {
        return new Promise((resolve, reject) => {
            this.watsonConversation.message({
                workspace_id: this.workspaceId,
                input: {'text': message.text}
            }, function messageResponse (error, response) {
                if (error) {
                    reject(error);
                } else {
                    for (let intent of response.intents) {
                        message.intents.push(new Intent(intent.intent, intent.confidence));
                    }

                    console.log("Response entities: ", response);
                    for (let entity of response.entities) {
                        message.entities.push(new Entity(entity.entity, entity.value))
                    }

                    resolve(message);
                }
            });
        });
    }
}

module.exports = Analyser;
