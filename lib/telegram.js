'use strict';

var Bot = require('node-telegram-bot-api');

/**
 * Send and receive telegram messages
 */
class Telegram {
    constructor (token, options) {
        this.token = token || process.env.TELEGRAM_TOKEN;
        this.options = options || { polling: true };

        this.bot = new Bot(this.token, this.options);
    }

    /**
     * Start listening for text messages
     * @param function err - error callback
     * @param function callback - Function to call with success
     */
    onTextMessage(err, callback) {
        this.bot.on('message', function(msg) {
            if (msg['text']) {
                return callback(msg);
            }
        });
    }

    /**
     * Send telegram message
     * @param integer chatId - Telegram chatId,
     * @param string message - Response to send
     * @param Object options - Any additional Telegram options
     */
    sendMessage(chatId, message, options) {
        this.bot.sendMessage(chatId, message, options);
    }
}

module.exports = Telegram;
