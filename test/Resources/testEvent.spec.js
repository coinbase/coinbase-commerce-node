'use strict';

var assert = require('chai').assert,
	helpers = require('../helpers'),
	Client = require('../../lib/Client'),
	Event = require('../../lib/Resources/Event');

Client.init('test_key');

describe('resources.Event', function () {

	describe('initialize Event', function () {
		it('should initialize event without new', function () {
			var eventObj = Event({name: 'Test name'});

			assert.instanceOf(eventObj, Event);
			assert.property(eventObj, 'name');
		});
	});

	describe('list method', function () {
		it('should return list of events', function (done) {
			var responseData = helpers.loadResponse('eventList.json');

			helpers.registerRequest('GET', '/events', 200, responseData);

			Event.list({}, function (error, response) {
				var eventObj = response.pop();

				assert.equal(eventObj.type, 'charge:created');
				assert.equal(eventObj.data.name, 'Test 2 event');
				assert.isArray(response);
				assert.instanceOf(eventObj, Event);
				done();
			});
		});
	});

	describe('retrieve method', function () {
		it('should return event instance', function (done) {
			var responseData = helpers.loadResponse('event.json');
			var id = responseData.data.id;

			helpers.registerRequest('GET', '/events/' + id, 200, responseData);

			Event.retrieve(id, function (error, response) {
				assert.instanceOf(response, Event);
				done();
			});
		});
	});
});
