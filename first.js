'use strict';



const Promise = require('promise');

const util = require('util');

const numeral = require('numeral');

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

     * @param {Message} - Chat Message

     * @return {Promise<String, Error>} Message response

     */

    respond(message) {

        return new Promise((resolve, reject) => {

            let teams = message.getTeams();

            if (teams.length === 0) {

                teams.push(message.getTeam());

            }



            this.tableService.getPositions(teams)

                .then(positions => {

                    let responses = [];

                    for (let position of positions) {

                        responses.push(

                            util.format(

                                '%s are %s with %d points.',

                                position.teamName,

                                numeral(position.position).format('0o'),

                                position.points

                            )

                        );

                    }

                    resolve(responses.join('\n'));

                });

        });

    }

}



module.exports = Table;
