'use strict';

var request = require('request-promise');
var Promise = require('promise');
var TablePosition = require('./tablePosition');

/**
 * Retrieves table information from drop22.net
 */
class TableService {

    constructor(url) {
        this.url = url || 'http://api.drop22.net/table/aviva';
    }

    /**
     * Get table position information for a team
     * @param {string} team - Team to find in table
     * @returns {Promise<TablePosition, Error>} - Table position for team
     */
    getPosition(team) {
        return new Promise((resolve, reject) => {
            this._fetch()
                .then(positions => {
                    for (let position of positions) {
                        if (position.teamName.toLowerCase()
                            == team.toLowerCase()) {
                            return resolve(position);
                        }
                    }
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }

    /**
     * Get all table information
     * @return {Promise<TablePosition[], Error>} Promise to return array of Fixtures
     */
    _fetch() {
        return new Promise((resolve, reject) => {
            request.call(request, {
                method: 'GET',
                uri: this.url,
                json: true
            })
            .then(response => {
                if (response.data) {
                    let positions = [];
                    for (let position of response.data) {
                        positions.push(new TablePosition(
                            position.position,
                            position.team.name,
                            position.played,
                            position.won,
                            position.drawn,
                            position.lost,
                            position.for,
                            position.against,
                            position.bonus_points,
                            position.points
                        ));
                    }
                    return resolve(positions);
                } else {
                    return reject(new Error('Table information unavailable'));
                }
            })
            .catch(error => {
                return reject(error);
            });
        });
    }
}

module.exports = TableService;
