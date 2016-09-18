'use strict';

var Util = require('util');
var Promise = require('promise');
var Ability = require('../ability');
var FixtureService = require('../fixtureService');

/**
 * Respond to result information request
 */
class Result extends Ability {

    /**
     * Create new Result ability
     * @param {string} intent - The intent that the ability can handle
     */
    constructor (fixtureService) {
        super('result');

        this.fixtureService = fixtureService || new FixtureService();
    }

    /**
     * Generate response for message
     * @param {Message} - Chat Message
     * @return {Promise<String, Error>} message - Message received.
     */
    respond(message) {
        return new Promise((resolve, reject) => {
            this.fixtureService.result(
                    message.getTeam(),
                    message.getOpposition(),
                    message.hasHome(),
                    message.hasAway()
                )
                .then(fixtures => {

                    if (fixtures.length > 0) {
                        let responses = [];
                        for (let fixture of fixtures) {
                            var response = Util.format(
                                'The score between %s and %s was %d-%d.',
                                fixture.homeTeamName,
                                fixture.awayTeamName,
                                fixture.homeTeamScore,
                                fixture.awayTeamScore
                            );

                            responses.push(response);
                        }

                        resolve(responses.join('\n'));
                    } else {
                        resolve('We haven\'t played that game yet');
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = Result;
