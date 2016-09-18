'use strict';

const assert = require('chai').assert;
const Message = require('../lib/message');
const Entity = require('../lib/entity');
const Intent = require('../lib/intent');

describe('The message component', function () {
    it('Initialisation', function () {
        var msg = new Message('telegram', 1);

        assert.equal(msg.chatNetwork, 'telegram');
        assert.equal(msg.chatId, 1);
    });

    it('Checking Intent', function () {
        var msg = new Message('telegram', 1);

        msg.intents = [new Intent('greeting')];
        assert.isOk(msg.hasIntent('greeting'));
        assert.isNotOk(msg.hasIntent('help'));

    });

    it('Get Opposition in Message', function () {
        var ent = new Entity('Team', 'Sale Sharks');
        var msg = new Message(
            'telegram', 1, 1, 1, null, {'team': 'bath rugby'},
            'Hi', null, null, [ent]
        );

        assert.deepEqual(msg.getOpposition(), ['sale sharks']);
    });

    it('Does message mention home?', function () {
        var ent = new Entity('Location', 'home');
        var msg = new Message(
            'telegram', 1, 1, 1, null, {'team': 'bath rugby'},
            'Hi', null, null, [ent]
        );

        var msg2 = new Message(
            'telegram', 1, 1, 1, null, {'team': 'bath rugby'},
            'Hi', null, null
        );

        assert.isOk(msg.hasHome());
        assert.isNotOk(msg2.hasHome());
    });

    it('Does message mention away?', function () {
        var ent = new Entity('Location', 'away');
        var msg = new Message(
            'telegram', 1, 1, 1, null, {'team': 'bath rugby'},
            'Hi', null, null, [ent]
        );

        var msg2 = new Message(
            'telegram', 1, 1, 1, null, {'team': 'bath rugby'},
            'Hi', null, null
        );

        assert.isOk(msg.hasAway());
        assert.isNotOk(msg2.hasAway());
    });

    it('Get message team context?', function () {
        var msg = new Message(
            'telegram', 1, 1, 1, null, {'team': 'bath rugby'},
            'Hi', null, null
        );

        assert.equal(msg.getTeam(), 'bath rugby');
    });

    it('Get teams mentioned in message', function () {
        var ent = new Entity('Team', 'Sale Sharks');
        var msg = new Message(
            'telegram', 1, 1, 1, null, {'team': 'bath rugby'},
            'Hi', null, null, [ent]
        );

        assert.deepEqual(msg.getTeams(), ['sale sharks', 'bath rugby']);
    });
});
