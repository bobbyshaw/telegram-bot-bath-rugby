'use strict';

const assert = require('chai').assert;
const Ability = require('../lib/ability');
const Message = require('../lib/message');

describe('The Ability component', function () {

    it('Get Ability Message', function () {
        var ab = new Ability('test');
        var message = new Message(null, null, null, null, null, { "team": "Bath Rugby"});

        return ab.respond(message)
            .then(response => {

                assert.typeOf(response, 'string');
            })
            .catch(error => {
                console.log(error);
            })
            .done();
    });
});
