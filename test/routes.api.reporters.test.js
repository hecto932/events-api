const assert = require('assert');
const proxyquire = require('proxyquire');
const { config } = require('../config');
const EventService = require('../services/events');

const eventService = new EventService(config);

const {
  eventsMock,
  EventServiceMock,
  getByUuid
} = require('../utils/mocks/events');

const testServer = require('../utils/testServer');

describe('routes - reporters', function () {
  const route = proxyquire('../routes/reporters', {});

  const request = testServer(route);

  describe('GET /reporters', function () {
    it('should respond with status 200', function (done) {
      request.get('/reporters').expect(200, done);
    });

    it('should respond with content json', function (done) {
      request.get('/reporters').expect('Content-Type', /json/, done);
    })

    it('should respond with not error', function (done) {
      request.get('/reporters').end((err, res) => {
        assert.equal(err, null);
      });
      done();
    })

    it('should respond with the list of reporters', function (done) {
      request.get('/reporters').end((err, res) => {
        const events = eventService.getEventsReport();
        assert.deepEqual(res.body, {
          error: false,
          results: events
        });
        done();
      });
    })
  });
})