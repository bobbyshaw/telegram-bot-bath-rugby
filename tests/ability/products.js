'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const ProductsAbility = require('../../lib/ability/products');
const Message = require('../../lib/message');

describe('The Products Ability component', function () {

    it('Get Products Ability Message', function () {
        var ability = new ProductsAbility();
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
