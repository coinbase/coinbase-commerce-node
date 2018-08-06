'use strict';

var assert = require('chai').assert,
	Event = require('../lib/Resources/Event'),
	SignatureVerificationError = require('../lib/Errors/SignatureVerificationError'),
	InvalidResponseError = require('../lib/Errors/InvalidResponseError'),
	Webhook = require('../lib/Webhook');

describe('Webhook', function () {

	it('should successfully verify signature and return event', function () {
		var secret = '30291a20-0bd1-4267-9b0f-e6e7b123c0bf';
		var payload = '{"id":1,"scheduled_for":"2017-01-31T20:50:02Z","attempt_number":1,"event":{"id":"24934862-d980-46cb-9402-43c81b0cdba6","type":"charge:created","api_version":"2018-03-22","created_at":"2017-01-31T20:49:02Z","data":{"code":"66BEOV2A","name":"The Sovereign Individual","description":"Mastering the Transition to the Information Age","hosted_url":"https://commerce.coinbase.com/charges/66BEOV2A","created_at":"2017-01-31T20:49:02Z","expires_at":"2017-01-31T21:04:02Z","timeline":[{"time":"2017-01-31T20:49:02Z","status":"NEW"}],"metadata":{},"pricing_type":"no_price","payments":[],"addresses":{"bitcoin":"0000000000000000000000000000000000","ethereum":"0x0000000000000000000000000000000000000000","litecoin":"3000000000000000000000000000000000","bitcoincash":"bitcoincash:000000000000000000000000000000000000000000"}}}}';
		var headerSignature = '8be7742c7d372f08a6a3224edadf18a22b65fa9e28f3f2de97376cdaa092590d';
		var eventObj = Webhook.verifyEventBody(payload, headerSignature, secret);

		assert.instanceOf(eventObj, Event);
		assert.property(eventObj, 'id');
	});

	it('should fail verification with invalid secret key', function () {
		var invalidSecret = '30291a20-0bd1-4267-9b0f-e6e7b123c0bg';
		var payload = '{"id":1,"scheduled_for":"2017-01-31T20:50:02Z","attempt_number":1,"event":{"id":"24934862-d980-46cb-9402-43c81b0cdba6","type":"charge:created","api_version":"2018-03-22","created_at":"2017-01-31T20:49:02Z","data":{"code":"66BEOV2A","name":"The Sovereign Individual","description":"Mastering the Transition to the Information Age","hosted_url":"https://commerce.coinbase.com/charges/66BEOV2A","created_at":"2017-01-31T20:49:02Z","expires_at":"2017-01-31T21:04:02Z","timeline":[{"time":"2017-01-31T20:49:02Z","status":"NEW"}],"metadata":{},"pricing_type":"no_price","payments":[],"addresses":{"bitcoin":"0000000000000000000000000000000000","ethereum":"0x0000000000000000000000000000000000000000","litecoin":"3000000000000000000000000000000000","bitcoincash":"bitcoincash:000000000000000000000000000000000000000000"}}}}';
		var headerSignature = '8be7742c7d372f08a6a3224edadf18a22b65fa9e28f3f2de97376cdaa092590d';

		assert.throws(function () {
			Webhook.verifyEventBody(payload, headerSignature, invalidSecret);
		}, SignatureVerificationError);
	});

	it('should fail verification due to invalid response', function () {
		var secret = '30291a20-0bd1-4267-9b0f-e6e7b123c0bf';
		var invalidPayload = 'Not json';
		var headerSignature = '8be7742c7d372f08a6a3224edadf18a22b65fa9e28f3f2de97376cdaa092590d';

		assert.throws(function () {
			Webhook.verifyEventBody(invalidPayload, headerSignature, secret);
		}, InvalidResponseError);
	});

	it('should fail verification due to event is not in response', function () {
		var secret = '30291a20-0bd1-4267-9b0f-e6e7b123c0bf';
		var invalidPayload = '{"id":1,"scheduled_for":"2017-01-31T20:50:02Z","attempt_number":1}';
		var headerSignature = '8be7742c7d372f08a6a3224edadf18a22b65fa9e28f3f2de97376cdaa092590d';

		assert.throws(function () {
			Webhook.verifyEventBody(invalidPayload, headerSignature, secret);
		}, InvalidResponseError, 'Invalid payload provided.');
	});
});