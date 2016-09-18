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

    it('Get Team Positions', function () {
        var service = new TableService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        var answers = {
            'Bath Rugby': {
                'position': 2,
                'teamName': 'Bath Rugby',
                'played': 2,
                'won': 2,
                'drawn': 0,
                'lost': 0,
                'pointsFor': 76,
                'pointsAgainst': 19,
                'bonusPoints': 1,
                'points': 9
            },
            'Gloucester Rugby': {
                'position': 9,
                'teamName': 'Gloucester Rugby',
                'played': 2,
                'won': 0,
                'drawn': 1,
                'lost': 1,
                'pointsFor': 54,
                'pointsAgainst': 61,
                'bonusPoints': 2,
                'points': 4
            }
        };

        /** @type {TablePosition} */
        return service.getPositions(['bath rugby', 'Gloucester Rugby'])
            .then(positions => {
                for (let position of positions) {
                    if (position.teamName in answers) {
                        let team = answers[position.teamName];
                        assert.deepEqual(position.position, team.position);
                        assert.deepEqual(position.teamName, team.teamName);
                        assert.deepEqual(position.played, team.played);
                        assert.deepEqual(position.won, team.won);
                        assert.deepEqual(position.drawn, team.drawn);
                        assert.deepEqual(position.lost, team.lost);
                        assert.deepEqual(position.pointsFor, team.pointsFor);
                        assert.deepEqual(position.pointsAgainst, team.pointsAgainst);
                        assert.deepEqual(position.bonusPoints, team.bonusPoints);
                        assert.deepEqual(position.points, team.points);
                    } else {
                        throw Error(position.teamName + ' should not have been returned');
                    }
                }

                if (positions.length != Object.keys(answers).length) {
                    throw Error("Incorrect number of team positions returned");
                }
            });
    });
});
