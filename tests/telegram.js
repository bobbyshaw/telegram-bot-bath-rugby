'use strict';

const assert = require('assert');
const sinon = require('sinon');
const TelegramBot = require('../lib/telegramBot');

describe('The Telegram component', function () {
    it ('Initialisation', function() {
        var bot = new TelegramBot('token', { 'option1': 'value2'} );

        assert(bot.token, 'token');
        assert(bot.options.option1, 'value2');
    });

    it('Send Message', function () {
        var bot = new TelegramBot();
        var spy = sinon.spy();

        bot.bot.sendMessage = spy;

        bot.sendMessage(1, 'test');

        assert(spy.calledWith(1, 'test'));

    });
});
