'use strict';

const assert = require('chai').assert;
const Entity = require('../lib/entity');

describe('The Entity component', function () {

    it('Initialise entity', function () {
        var ent = new Entity('team', 'Bath Rugby');

        assert.equal(ent.type, 'team');
        assert.equal(ent.value, 'Bath Rugby')
    });
});
