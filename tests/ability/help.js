'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const HelpAbility = require('../../lib/ability/help');
const Message = require('../../lib/message');

describe('The Help Ability component', function () {

    it('Get Help Ability Message', function () {
        var ability = new HelpAbility();
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
