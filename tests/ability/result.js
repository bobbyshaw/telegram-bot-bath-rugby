'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const ResultAbility = require('../../lib/ability/result');
const Message = require('../../lib/message');
const FixtureService = require('../../lib/fixtureService');
const Fixture = require('../../lib/fixture');

describe('The Result Ability component', function () {

    it('Get Result Ability Message', function () {
        var ability = new ResultAbility();
        var message = new Message(null, null, null, null, null, { "team": "Bath Rugby"});

        var requestStub = this.sandbox.stub(FixtureService.prototype, 'result');
        requestStub.returns(
            Promise.resolve(
                [new Fixture('Bath Rugby', 'Newcastle Falcons', 58, 5, 'Recreation Ground', Date.parse('2016-09-10T14:00:00+00:00'))]
            )
        );

        return ability.respond(message)
            .then(response => {
                assert.equal(response, 'The score between Bath Rugby and Newcastle Falcons was 58-5.');
            })
            .catch(error => {
                console.log(error);
            })
            .done();
    });
});
