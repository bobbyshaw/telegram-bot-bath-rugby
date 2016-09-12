'use strict';

var request = require('request-promise');
var Promise = require('promise');
var Fixture = require('./fixture');

/**
 * Retrieves fixture information from drop22.net
 */
class FixtureService {

    constructor(url) {
        this.url = url || 'http://api.drop22.net/fixtures/aviva/';
    }

    /**
     * Get previous result for a team (or team and opposition combination)
     * @param {string} team - primary team name
     * @param {string|null} opposition - secondary team name
     * @param {boolean} isHome - requesting home result
     * @param {boolean} isAway - requesting away result
     * @result {Promise<Fixture, Error>} - Fixture returned via Promise
     */
    result(team, opposition, isHome, isAway) {
        console.log("Opposition: ", opposition);
        return new Promise((resolve, reject) => {
            this.fetchAll(team)
                .then(fixtures => {
                    var latest;
                    var today = new Date();
                    for (let fixture of fixtures) {
                        if (!fixture.isResult()) {
                            break;
                        }

                        if (!opposition) {
                            if ( (isHome && fixture.isHome(team))
                                || (isAway && fixture.isAway(team))
                                || (!isHome && !isAway)) {
                                latest = fixture;
                                continue;
                            }
                        } else if (opposition && fixture.isAgainst(opposition)) {
                            if ( (isHome && fixture.isHome(team))
                                || (isAway && fixture.isAway(team))
                                || (!isHome && !isAway)) {
                                latest = fixture;
                                continue;
                            }
                        }
                    }
                    resolve(latest);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Get upcoming fixtures for a team (or team and opposition combination)
     * @param {string} team - Primary team for fixture
     * @param {string|null} opposition - Secondary team for fixture (optional)
     * @param {boolean} isHome - requesting home fixture
     * @param {boolean} isAway - requesting away fixture
     * @return {Promise<Fixture, Error>} - Fixture via Promise
     */
    fixture(team, opposition, isHome, isAway) {
        return new Promise((resolve, reject) => {
            this.fetchAll(team)
                .then(fixtures => {
                    for (let fixture of fixtures) {
                        if (fixture.isResult()) {
                            continue;
                        }

                        if (opposition === null) {
                            if ( (isHome && fixture.isHome(team))
                                || (isAway && fixture.isAway(team))
                                || (!isHome && !isAway)) {
                                return resolve(fixture);
                            }

                        } else if (fixture.isAgainst(opposition)) {
                            if ( (isHome && fixture.isHome(team))
                                || (isAway && fixture.isAway(team))
                                || (!isHome && !isAway)) {
                                return resolve(fixture);
                            }
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    /**
     * Get all fixtures
     * @param {string} team - Team name to find fixtures for
     * @return {Promise<Fixture[], Error>} Promise to return array of Fixtures
     */
    fetchAll(team) {
        return new Promise((resolve, reject) => {
            request({
                method: 'GET',
                uri: this.url + encodeURIComponent(team),
                json: true
            })
            .then(function (response) {
                if (response.data) {
                    let fixtures = [];
                    for (let fixture of response.data) {
                        fixtures.push(new Fixture(
                            fixture.home_team.name,
                            fixture.away_team.name,
                            fixture.home_score,
                            fixture.away_score,
                            fixture.location,
                            Date.parse(fixture.kickoff)
                        ));
                    }
                    resolve(fixtures);
                } else {
                    reject(new Error('Fixture information unavailable'));
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

module.exports = FixtureService;
