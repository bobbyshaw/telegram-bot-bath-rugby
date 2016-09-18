'use strict';

const assert = require('assert');
const request = require('request-promise');
const sinon = require('sinon');
const FixtureService = require('../lib/fixtureService');
const exampleResponse = require('./fixtureService.json');

describe('The FixtureService component', function () {
    it ('Initialisation', function() {
        var service = new FixtureService('http://www.example.com');
        assert(service.url, 'http://www.example.com');
    });

    it('Get Next Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.fixture('bath rugby')
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'worcester warriors');
                assert.deepEqual(fixture.awayTeamName, 'Worcester Warriors');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-17T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });

    it('Get Next Away Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        return service.fixture('bath rugby', null, false, true)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'leicester tigers');
                assert.deepEqual(fixture.homeTeamName, 'Leicester Tigers');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-25T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Welford Road');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });

    it('Get Next Home Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        return service.fixture('bath rugby', null, true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'worcester warriors');
                assert.deepEqual(fixture.awayTeamName, 'Worcester Warriors');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-17T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });

    it('Get Next Home Leicester Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        return service.fixture('bath rugby', ['leicester tigers'], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'leicester tigers');
                assert.deepEqual(fixture.awayTeamName, 'Leicester Tigers');
                assert.deepEqual(fixture.kickoff, Date.parse('2017-04-08T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Twickenham Stadium');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });

    it('Get Next Away Leicester Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        return service.fixture('bath rugby', ['leicester tigers'], false, true)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'leicester tigers');
                assert.deepEqual(fixture.homeTeamName, 'Leicester Tigers');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-25T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Welford Road');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });


    it('Get Last Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby')
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.awayTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-10T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 58);
                assert.deepEqual(fixture.awayTeamScore, 5);
            });
    });

    it('Get Last Home Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', null, true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.awayTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-10T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 58);
                assert.deepEqual(fixture.awayTeamScore, 5);
            });
    });

    it('Get Last Away Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', null, false, true)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'northampton saints');
                assert.deepEqual(fixture.homeTeamName, 'Northampton Saints');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-03T14:30:00+00:00'));
                assert.deepEqual(fixture.location, 'Franklin&#039;s Gardens');
                assert.deepEqual(fixture.homeTeamScore, 14);
                assert.deepEqual(fixture.awayTeamScore, 18);
            });
    });


    it('Get Last Home Northampton Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['northampton saints'], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 0);
            });
    });

    it('Get Last Away Newcastle Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['newcastle falcons'], false, true)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 0);
            });
    });

    it('Get Last Home Newcastle Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['newcastle falcons'], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.awayTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-10T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 58);
                assert.deepEqual(fixture.awayTeamScore, 5);
            });
    });

    it('Get Last Home Newcastle and Northampton Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['newcastle falcons', 'northampton saints'], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.awayTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-10T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 58);
                assert.deepEqual(fixture.awayTeamScore, 5);
            });
    });

    it('Get Last Northampton and Newcastle Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['northampton saints', 'newcastle falcons'])
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 2);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.awayTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-10T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 58);
                assert.deepEqual(fixture.awayTeamScore, 5);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'northampton saints');
                assert.deepEqual(fixture.homeTeamName, 'Northampton Saints');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-03T14:30:00+00:00'));
                assert.deepEqual(fixture.location, 'Franklin&#039;s Gardens');
                assert.deepEqual(fixture.homeTeamScore, 14);
                assert.deepEqual(fixture.awayTeamScore, 18);
            });
    });

    it('Get Last Newcastle and Northampton Result (reverse date order)', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['newcastle falcons', 'northampton saints'])
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 2);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.awayTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-10T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 58);
                assert.deepEqual(fixture.awayTeamScore, 5);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'northampton saints');
                assert.deepEqual(fixture.homeTeamName, 'Northampton Saints');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2016-09-03T14:30:00+00:00'));
                assert.deepEqual(fixture.location, 'Franklin&#039;s Gardens');
                assert.deepEqual(fixture.homeTeamScore, 14);
                assert.deepEqual(fixture.awayTeamScore, 18);
            });
    });
});
