'use strict';

const assert = require('assert');
const sinon = require('sinon');
const FixtureAbility = require('../../lib/ability/fixture');
const Message = require('../../lib/message');
const FixtureService = require('../../lib/fixtureService');
const Fixture = require('../../lib/fixture');

describe('The Fixture Ability component', function () {

    it('Get Fixture Ability Message', function () {
        var ability = new FixtureAbility();
        var message = new Message(null, null, null, null, null, { "team": "Bath Rugby"});

        var requestStub = this.sandbox.stub(FixtureService.prototype, 'fixture');
        requestStub.returns(
            Promise.resolve(
                [new Fixture('Bath Rugby', 'Worcester Warriors', null, null, 'Recreation Ground', Date.parse('2016-09-17T14:00:00+00:00'))]
            )
        );

        return ability.respond(message)
            .then(response => {
                assert.deepEqual(response, 'Bath Rugby play Worcester Warriors on Saturday, 17th September, 15:00 at home.');
            })
            .done();
    });
});
