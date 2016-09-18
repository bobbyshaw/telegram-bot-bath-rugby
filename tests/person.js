'use strict';

const assert = require('chai').assert;
const Person = require('../lib/person');

describe('The Person component', function () {

    it('Initialise person', function () {
        var chatter = new Person(1, 'Tom', 'Robertshaw', 'bobbyshaw');

        assert.equal(chatter.id, 1);
        assert.equal(chatter.firstName, 'Tom');
        assert.equal(chatter.lastName, 'Robertshaw');
        assert.equal(chatter.username, 'bobbyshaw');
    });
});
