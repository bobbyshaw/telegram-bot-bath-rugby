'use strict';

const Promise = require('promise');
const assert = require('chai').assert;
const sinon = require('sinon');
const Analyser = require('../lib/analyser');
const Message = require('../lib/message');
const exampleResponse = require('./analyser.json');
const watson = require('watson-developer-cloud');

describe('The Message Analysis component', function () {
    it ('Initialisation', function() {
        var service = new Analyser('username', 'password', 1, '2016-11-01', 'v1', 'test');

        assert.equal(service.username, 'username');
        assert.equal(service.password, 'password');
        assert.equal(service.workspaceId, 1);
        assert.equal(service.versionDate, '2016-11-01');
        assert.equal(service.version, 'v1');
        assert.equal(service.watsonConversation, 'test');
    });

    it('Analyse Message', function () {
        var conversation = { message() {} };

        var requestStub = this.sandbox.stub(conversation, 'message');
        requestStub.yields(null, exampleResponse);

        var service = new Analyser('username', 'password', 1, '2016-11-01', 'v1', conversation);
        var msg = new Message('telegram', 1, 1, 12345, null, null, 'When do Bath play Leicester Tigers away?');

        return service.analyse(msg)
            .then(message => {
                var intent = message.intents.shift();
                assert.equal(intent.intent, 'next_fixture');

                var entity = message.entities.shift();
                assert.equal(entity.type, 'Team');
                assert.equal(entity.value, 'Leicester Tigers');

                var entity = message.entities.shift();
                assert.equal(entity.type, 'Team');
                assert.equal(entity.value, 'Bath Rugby');

                var entity = message.entities.shift();
                assert.equal(entity.type, 'location');
                assert.equal(entity.value, 'away');
            });
    });
});
