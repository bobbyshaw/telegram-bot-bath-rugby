'use strict';

var util = require('util');
var dotenv = require('dotenv').config();
var telegram = require('./telegram');
var intents = require('./intents');
var fixtures = require('./fixtures');

/*
 * Telegram chat bot that answers requests for fixture info.
 */
class RugbyBot {
    constructor(team, debug) {
        this.team = team;
        this.debug = debug || false;
    }

    /**
     * Start listening for telegram messages
     */
    initialise() {
        this.bot = new telegram();
        this.intents = new intents();
        this.fixtures = new fixtures();

        this.bot.onTextMessage(this.logError.bind(this), this.findIntents.bind(this));
    }

    /**
     * Handle text from telegram and request intents.
     * @param Object message - Message object received from telegram
     */
    findIntents(message) {
        this.log("Received message: " + message.text);
        this.intents.getIntents(
            this.logError.bind(this),
            this.processIntents.bind(this),
            message
        );
    }

    processIntents(intentsResponse, message) {
        this.log("Received Intents: ", intentsResponse.intents);

        // Have we found any intents in the message?
        if (intentsResponse.intents) {
            // Just process the first intent
            var intent = intentsResponse.intents.shift();
            if (intent.intent === 'result') {
                this.fixtures.result(
                    this.logError.bind(this),
                    this.replyWithResult.bind(this),
                    this.team,
                    undefined,
                    message
                );
            } else if (intent.intent === 'next_fixture') {
                this.fixtures.nextFixture(
                    this.logError.bind(this),
                    this.replyWithUpcomingFixture.bind(this),
                    this.team,
                    undefined,
                    message
                );
            } else {
                this.sendReply(
                    message.chat.id,
                    "Sorry, I don't know what you want"
                );
            }
        } else {
            // Response with I didn't understand
            this.sendReply(message.chat.id, "Sorry, I'm still learning");
        }
    }

    /**
     * Reply with the score for the requested fixture
     * @param Object result - Fixture result
     * @param Object message - Telegram message
     */
    replyWithResult(result, message) {
        this.log(result);
        this.sendReply(
            message.chat.id,
            util.format(
                "The score between %s and %s was %d-%d",
                result.home_team.name,
                result.away_team.name,
                result.home_score,
                result.away_score
            )
        );
    }

    /**
     * Reply with details on upcoming fixture
     * @param Object fixtures - Upcoming fixtures
     * @param Object message - Telegram message
     */
    replyWithUpcomingFixture(fixture, message) {
        this.log("Received Fixtures: " + fixtures);
        this.sendReply(
            message.chat.id,
            util.format(
                "%s play %s on %s at %s",
                fixture.home_team.name,
                fixture.away_team.name,
                fixture.kickoff,
                fixture.location
            )
        );
    }

    /**
     * Send Telegram message
     * @param integer chatId - Telegram Chat ID
     * @param string message - Message to send
     */
    sendReply(chatId, message) {
        this.bot.sendMessage(chatId, message);
    }

    /**
     * Generic error handler
     * We always log when there's an error.
     * @param message - Error message
     */
    logError(message) {
        console.log("Error: ", message);
    }

    /**
     * Log Error message if debug mode enabled
     * @param message - Message to log to console.
     */
    log(message) {
        if (this.debug) {
            console.log(message);
        }
    }
}

module.exports = RugbyBot;