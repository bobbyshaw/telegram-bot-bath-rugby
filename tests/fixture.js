'use strict';

const assert = require('chai').assert;
const Fixture = require('../lib/fixture');

describe('The Fixture component', function () {

    it('Initialise fixture', function () {
        var fix = new Fixture('Bath Rugby', 'Newcastle Falcons', 58, 5,
            'Recreation Ground', Date.parse('2016-09-10T14:00:00+00:00'));

        assert.equal(fix.homeTeamName, 'Bath Rugby');
        assert.equal(fix.homeTeamId, 'bath rugby');
        assert.equal(fix.awayTeamName, 'Newcastle Falcons');
        assert.equal(fix.awayTeamId, 'newcastle falcons');
        assert.equal(fix.homeTeamScore, 58);
        assert.equal(fix.awayTeamScore, 5);
        assert.equal(fix.location, 'Recreation Ground');
        assert.equal(fix.kickoff, Date.parse('2016-09-10T14:00:00+00:00'));
    });

    it('Test if fixture is result', function () {
        var fix1 = new Fixture('Bath Rugby', 'Newcastle Falcons', 58, 5,
            'Recreation Ground', Date.parse('2016-09-10T14:00:00+00:00'));

        var fix2 = new Fixture('Bath Rugby', 'Worcester Warriors', null , null,
                'Recreation Ground', Date.parse('2016-09-17T14:00:00+00:00'));

        assert.isOk(fix1.isResult());
        assert.isNotOk(fix2.isResult());

    });

    it('Test if fixture is home', function () {
        var fix1 = new Fixture('Bath Rugby', 'Newcastle Falcons', 58, 5,
            'Recreation Ground', Date.parse('2016-09-10T14:00:00+00:00'));

        var fix2 = new Fixture('Leicester Tigers', 'Bath Rugby', null , null,
                    'Welford Road', Date.parse('2016-09-25T14:00:00+00:00'));

        assert.isOk(fix1.isHome('bath rugby'));
        assert.isNotOk(fix2.isHome('bath rugby'));
    });

    it('Test if fixture is away', function () {
        var fix1 = new Fixture('Bath Rugby', 'Newcastle Falcons', 58, 5,
            'Recreation Ground', Date.parse('2016-09-10T14:00:00+00:00'));

        var fix2 = new Fixture('Leicester Tigers', 'Bath Rugby', null , null,
                    'Welford Road', Date.parse('2016-09-25T14:00:00+00:00'));

        assert.isNotOk(fix1.isAway('bath rugby'));
        assert.isOk(fix2.isAway('bath rugby'));
    });

    it('Test if fixture is against a team', function () {
        var fix1 = new Fixture('Bath Rugby', 'Newcastle Falcons', 58, 5,
            'Recreation Ground', Date.parse('2016-09-10T14:00:00+00:00'));

        var fix2 = new Fixture('Leicester Tigers', 'Bath Rugby', null , null,
                    'Welford Road', Date.parse('2016-09-25T14:00:00+00:00'));

        assert.isOk(fix1.isAgainst('newcastle falcons'));
        assert.isNotOk(fix2.isAgainst('worcester warriors'));
    });
});
