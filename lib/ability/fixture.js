'use strict';

var Promise = require('promise');
var util = require('util');
var dateFormat = require('dateformat');
var Ability = require('../ability');
var FixtureService = require('../fixtureService');

/**
 * Respond to fixture information request
 */
class Fixture extends Ability {

    /**
     * Create new Fixture ability
     * @param {string} intent - The intent that the ability can handle
     */
    constructor (fixtureService) {
        super('next_fixture');

        this.fixtureService = fixtureService || new FixtureService();
    }

    /**
     * Generate response for message
     * @param {Message} - Chat Message
     * @return {Promise<string, Error>} message - Message received
     */
    respond(message) {
        return new Promise((resolve, reject) => {
            this.fixtureService.fixture(
                message.getTeam(),
                message.getOpposition(),
                message.hasHome(),
                message.hasAway()
            )
            .then(fixtures => {
                let responses = [];
                for (let fixture of fixtures) {
                    let location;
                    if (fixture.isHome(message.getTeam())) {
                        location = 'at home';
                    } else {
                        location = 'away at ' + fixture.location;
                    }

                    var response = util.format(
                        '%s play %s on %s %s.',
                        fixture.homeTeamName,
                        fixture.awayTeamName,
                        dateFormat(fixture.kickoff, 'dddd, dS mmmm, H:MM'),
                        location
                    );

                    responses.push(response);
                }

                resolve(responses.join('\n'));
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

module.exports = Fixture;
