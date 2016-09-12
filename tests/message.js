'use strict';

const assert = require('assert');
const message = require('../lib/message');

describe('The message component', function () {
    it('Initialisation', function () {
        var msg = new message('telegram', 1);

        assert.equal(msg.chatNetwork, 'telegram');
        assert.equal(msg.chatId, 1);
    });

    it('Updating', function () {
        var msg = new message('telegram', 1);

        msg.intent = 'greeting';
        assert.equal(msg.intent, 'greeting');
    });
});
