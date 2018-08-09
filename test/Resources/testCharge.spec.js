'use strict';

var assert = require('chai').assert,
	helpers = require('../helpers'),
	Client = require('../../lib/Client'),
	Charge = require('../../lib/Resources/Charge');

Client.init('test_key');

describe('resources.Charge', function () {
	describe('initialize Charge', function () {
		it('should initialize charge without new', function () {
			var chargeObj = Charge({name: 'Test name', description: 'Test description'});

			assert.instanceOf(chargeObj, Charge);
			assert.property(chargeObj, 'name');
		});
	});

	describe('list method', function () {
		it('should return list of charges', function (done) {
			var responseData = helpers.loadResponse('firstPageChargeList.json');

			helpers.registerRequest('GET', '/charges', 200, responseData);

			Charge.list({}, function (error, response) {
				var chargeObj = response.pop();

				assert.isArray(response);
				assert.equal(chargeObj.name, 'The Sovereign Individual');
				assert.instanceOf(chargeObj, Charge);
				done();
			});
		});
	});

	describe('retrieve method', function () {
		it('should return charge instance', function (done) {
			var responseData = helpers.loadResponse('charge.json');
			var id = responseData.data.id;

			helpers.registerRequest('GET', '/charges/' + id, 200, responseData);

			Charge.retrieve(id, function (error, response) {
				assert.instanceOf(response, Charge);
				assert.equal(response.name, 'Test Name');
				done();
			});
		});
	});

	describe('create method', function () {
		it('should create charge and return created charge', function (done) {
			var responseData = helpers.loadResponse('charge.json');

			helpers.registerRequest('POST', '/charges', 201, responseData);

			var data = {
				'description': 'Mastering the Transition to the Information Age',
				'metadata': {
					'customer_id': 'id_1005',
					'customer_name': 'Satoshi Nakamoto'
				},
				'name': 'Test Name',
				'payments': [],
				'pricing_type': 'no_price',
				'resource': 'charge'
			};

			Charge.create(data, function (error, response) {
				assert.instanceOf(response, Charge);
				assert.equal(response.name, 'Test Name');
				done();
			});
		});
	});
});
