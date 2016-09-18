'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const TicketsAbility = require('../../lib/ability/tickets');
const Message = require('../../lib/message');

describe('The Tickets Ability component', function () {

    it('Get Tickets Ability Message', function () {
        var ability = new TicketsAbility();
        var message = new Message(null, null, null, null, null, { "team": "Bath Rugby"});

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
