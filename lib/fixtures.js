'use strict';

var request = require('request-promise');

/**
 * Retrieves fixture information from drop22.net
 */
class Fixtures {

    constructor(url) {
        this.url = url || 'http://api.drop22.net/fixtures/aviva/';
    }

    /**
     * Get previous result for a team (or team and opposition combination)
     */
    result(err, callback, team, opposition, data) {
        this.fetchAll(err, function(results) {
            var latest;
            var today = new Date();
            for (let result of results) {
                if (Date.parse(result.kickoff) < today) {
                    latest = result;
                } else {
                    break;
                }
            }

            callback(latest, data);

        }, team);
    }

    /**
     * Get upcoming fixtures for a team (or team and opposition combination)
     */
    fixture(err, callback, team, opposition, data) {
        this.fetchAll(err, callback, team);
    }

    /**
     * Get all fixtures
     */
    fetchAll(err, callback, team) {
        var options = {
            method: 'GET',
            uri: this.url + encodeURIComponent(team),
            json: true
        };

        request(options)
        .then(function (response) {
            if (response.data) {
                callback(response.data);
            } else {
                err('No fixture data returned');
            }
        })
        .catch(function (error) {
            err(error);
        })
    }
}

module.exports = Fixtures;
