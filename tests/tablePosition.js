'use strict';

const assert = require('chai').assert;
const TablePosition = require('../lib/tablePosition');

describe('The TablePosition component', function () {

    it('Initialise tableposition', function () {
        var pos = new TablePosition(2, 'Bath Rugby', 2, 2, 0, 0, 76, 19, 1, 9);

        assert.equal(pos.position, 2);
        assert.equal(pos.teamName, 'Bath Rugby');
        assert.equal(pos.played, 2);
        assert.equal(pos.won, 2);
        assert.equal(pos.drawn, 0);
        assert.equal(pos.lost, 0);
        assert.equal(pos.pointsFor, 76);
        assert.equal(pos.pointsAgainst, 19);
        assert.equal(pos.bonusPoints, 1);
        assert.equal(pos.points, 9);
    });
});
