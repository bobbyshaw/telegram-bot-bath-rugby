'use strict';

var Bot = require('node-telegram-bot-api');
var Message = require('./message');
var Person = require('./person');

/**
 * Send and receive telegram messages
 */
class TelegramBot {

    /**
     * Initialise telegram bot
     * @param {string} token - Telegram bot API token
     * @param {object} options - Any options to be passed to the telegram bot
     * @param {object} context - Any shared context between all chat messages
     */
    constructor (token, options, context) {
        this.token = token || process.env.TELEGRAM_TOKEN;
        this.options = options || { polling: true };
        this.context = context || {};

        this.bot = new Bot(this.token, this.options);
    }

    /**
     * Start listening for text messages
     * @param function err - error callback
     * @param function callback - Function to call with success
     */
    onTextMessage(err, callback) {
        this.bot.on('message', msg => {
            if (msg['text']) {
                let person = new Person(
                    msg.from.id,
                    msg.from.first_name,
                    msg.from.last_name,
                    msg.from.username
                );

                let message = new Message(
                    'telegram',
                    msg.chat.id,
                    msg.message_id,
                    msg.date,
                    person,
                    this.context,
                    msg.text
                );

                return callback(message);
            }
        });
    }

    /**
     * Send telegram message
     * @param {number} chatId - Telegram chatId,
     * @param {string} message - Response to send
     * @param {object} options - Any additional Telegram options
     * @returns {Promise}
     */
    sendMessage(chatId, message, options) {
        return this.bot.sendMessage(chatId, message, options);
    }
}

module.exports = TelegramBot;
