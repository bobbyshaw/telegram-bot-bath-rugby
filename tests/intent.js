'use strict';

const assert = require('chai').assert;
const Intent = require('../lib/intent');

describe('The Intent component', function () {

    it('Initialise intent', function () {
        var intention = new Intent('greeting', 0.98);

        assert.equal(intention.intent, 'greeting');
        assert.equal(intention.confidence, 0.98);
    });
});
