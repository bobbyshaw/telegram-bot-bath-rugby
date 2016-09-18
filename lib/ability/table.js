'use strict';

const Promise = require('promise');
const Util = require('util');
const Numeral = require('numeral');
const Ability = require('../ability');
const TableService = require('../tableService');

/**
 * Respond to Premiership table information request
 */
class Table extends Ability {

    /**
     * Create new Table ability
     * @param {string} intent - The intent that the ability knows how to deal with.
     */
    constructor (tableService) {
        super('table');

        this.tableService = tableService || new TableService();
    }

    /**
     * Generate response for message
     * @return {Promise<String, Error>} Message response
     */
    respond(message) {
        return new Promise((resolve, reject) => {
            this.tableService.getPositions(message.getTeams())
                .then(positions => {
                    let responses = [];
                    for (let position of positions) {
                        responses.push(
                            Util.format(
                                "%s are %s with %d points.",
                                position.teamName,
                                Numeral(position.position).format('0o'),
                                position.points
                            )
                        );
                    }
                    resolve(responses.join('\n'));
                })
        });
    }
}

module.exports = Table;
