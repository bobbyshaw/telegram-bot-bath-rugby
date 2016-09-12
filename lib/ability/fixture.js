'use strict';

var Promise = require('promise');
var Util = require('util');
var DateFormat = require('dateformat');
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
            .then(fixture => {
                let location;
                if (fixture.isHome(message.getTeam())) {
                    location = "at home";
                } else {
                    location = "away at " + fixture.location;
                }

                var response = Util.format(
                    "%s play %s on %s %s.",
                    fixture.homeTeamName,
                    fixture.awayTeamName,
                    DateFormat(fixture.kickoff, "dddd, dS mmmm, H:MM"),
                    location
                );

                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

module.exports = Fixture;
