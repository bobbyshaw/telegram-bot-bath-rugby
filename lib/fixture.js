'use strict';

/**
 * Internal Fixture definition that external communication
 * is transformed into for consistency and control.
 */
class Fixture {

    /**
     * Create new fixture
     * @param {string} homeTeamName - Home Team Name
     * @param {string} awayTeamName - Away Team Name
     * @param {number} homeTeamScore - Home Team Score
     * @param {number} awayTeamScore - Away Team Score
     * @param {string} location - Game location
     * @param {Date} kickoff - Game kickoff time
     */
    constructor (homeTeamName, awayTeamName, homeTeamScore, awayTeamScore,
        location, kickoff) {

        this.homeTeamName = homeTeamName;
        this.homeTeamId = this.homeTeamName.toLowerCase();
        this.awayTeamName = awayTeamName;
        this.awayTeamId = this.awayTeamName.toLowerCase();
        this.homeTeamScore = homeTeamScore;
        this.awayTeamScore = awayTeamScore;
        this.location = location;
        this.kickoff = kickoff;
    }

    /**
     * Is this fixture a result?
     * @returns {boolean} True if the fixture has scores
     */
    isResult() {
        return !(this.homeTeamScore === null || this.awayTeamScore === null);
    }

    /**
     * Is home fixture?
     * @param {string} team - Team that the question in context of
     * @return {boolean} True if fixture is home game
     */
    isHome(team) {
        return this.homeTeamId === team.toLowerCase();
    }

    /**
     * Is away fixture?
     * @param {string} team - Team that the question in context of
     * @return {boolean} True if fixture is away game
     */
    isAway(team) {
        return this.awayTeamId === team.toLowerCase();
    }

    /**
     * Is the fixture against provided opposition team
     * @param {string} opposition - opposing team
     */
    isAgainst(opposition) {
        if (typeof opposition !== 'string' ) {
            return false;
        }

        opposition = opposition.toLowerCase();
        if (this.homeTeamId === opposition ||
            this.awayTeamId === opposition) {
            return true;
        }

        return false;
    }
}

module.exports = Fixture;
