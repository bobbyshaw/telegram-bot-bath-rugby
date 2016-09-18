'use strict';

const assert = require('assert');
const sinon = require('sinon');
const TableAbility = require('../../lib/ability/table');
const Message = require('../../lib/message');
const TableService = require('../../lib/tableService');
const TablePosition = require('../../lib/tablePosition');

describe('The Table Ability component', function () {

    it('Get Table Ability Message', function () {
        var ability = new TableAbility();
        var message = new Message(null, null, null, null, null, { "team": "Bath Rugby"});

        var requestStub = this.sandbox.stub(TableService.prototype, 'getPositions');
        requestStub.returns(
            Promise.resolve(
                [new TablePosition(2, 'Bath Rugby', 2, 2, 0, 0, 76, 19, 1, 9)]
            )
        );

        /** @type {TablePosition} */
        return ability.respond(message)
            .then(response => {
                assert.deepEqual(response, 'Bath Rugby are 2nd with 9 points.');
            })
            .catch(error => {
                console.log(error);
            })
            .done();
    });
});
