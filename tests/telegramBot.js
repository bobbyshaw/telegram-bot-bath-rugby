'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const TelegramBot = require('../lib/telegramBot');

describe('The Telegram component', function () {
    it ('Initialisation', function() {
        var bot = new TelegramBot('token', { 'option1': 'value2'} );

        assert.equal(bot.token, 'token');
        assert.equal(bot.options.option1, 'value2');
    });

    it('Receive message', function() {
        var bot = new TelegramBot();

        var spy = sinon.stub(bot.bot, 'on');
        spy.yields(
            {
                "from": {
                    "id": 1,
                    "first_name": "Tom",
                    "last_name": "Robertshaw",
                    "username": "bobbyshaw"
                },
                "chat": {
                    "id": 1
                },
                "message_id": 2,
                "date": "",
                "context": {"team": "bath rugby"},
                "text": "Did we win?"
            }
        );

        bot.onTextMessage(function() {}, function(message) {
            assert.equal(
                message.text, "Did we win?"
            );
        })


    });

    it('Send Message', function () {
        var bot = new TelegramBot();
        var spy = sinon.spy();

        bot.bot.sendMessage = spy;

        bot.sendMessage(1, 'test');

        assert.isOk(spy.calledWith(1, 'test'));

    });
});
