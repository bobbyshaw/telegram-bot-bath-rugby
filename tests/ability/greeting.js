'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const GreetingAbility = require('../../lib/ability/greeting');
const Message = require('../../lib/message');

describe('The Greeting Ability component', function () {

    it('Get Greeting Ability Message', function () {
        var ability = new GreetingAbility();
        var message = new Message(null, null, null, null, null, { 'team': 'Bath Rugby'});

        return ability.respond(message)
            .then(response => {
                assert.typeOf(response, 'string');
            })
            .catch(error => {
                console.log(error);
            })
            .done();
    });
});
