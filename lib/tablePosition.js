'use strict';

/**
 * Internal table position definition that external communication
 * is transformed into for consistency and control.
 */
class TablePosition {

    /**
     * Create new Table position
     * @param {number} position - Table position
     * @param {string} teamName - Team in this position
     * @param {number} played - Number of games played
     * @param {number} won - Number of games won
     * @param {number} drawn - Number of games drawn
     * @param {number} lost - Number of games lost
     * @param {number} pointsFor - Points for
     * @param {number} pointsAgainst - Points against
     * @param {number} bonusPoints - Bonus points awarded
     * @param {number} points - Number of points awarded
     */
    constructor (position, teamName, played, won, drawn, lost, pointsFor,
        pointsAgainst, bonusPoints, points) {
        this.position = position;
        this.teamName = teamName;
        this.played = played;
        this.won = won;
        this.drawn = drawn;
        this.lost = lost;
        this.pointsFor = pointsFor;
        this.pointsAgainst = pointsAgainst;
        this.bonusPoints = bonusPoints;
        this.points = points;
    }
}

module.exports = TablePosition;
