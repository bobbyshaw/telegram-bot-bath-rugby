'use strict';

const assert = require('assert');
const request = require('request-promise');
const sinon = require('sinon');
const TableService = require('../lib/tableService');
const exampleResponse = require('./tableService.json');

describe('The TableService component', function () {
    it ('Initialisation', function() {
        var service = new TableService('http://www.example.com');
        assert(service.url, 'http://www.example.com');
    });

    it('Get Team Position', function () {
        var service = new TableService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.getPosition('bath rugby')
            .then(position => {
                assert.deepEqual(position.position, 2);
                assert.deepEqual(position.teamName, 'Bath Rugby');
                assert.deepEqual(position.played, 2);
                assert.deepEqual(position.won, 2);
                assert.deepEqual(position.drawn, 0);
                assert.deepEqual(position.lost, 0);
                assert.deepEqual(position.pointsFor, 76);
                assert.deepEqual(position.pointsAgainst, 19);
                assert.deepEqual(position.bonusPoints, 1);
                assert.deepEqual(position.points, 9);
            });
    });
});
