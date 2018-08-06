'use strict';

var assert = require('chai').assert,
	helpers = require('../helpers'),
	Client = require('../../lib/Client'),
	Checkout = require('../../lib/Resources/Checkout');

Client.init('test_key');

describe('resources.Checkout', function () {
	describe('initialize Charge', function () {
		it('should initialize checkout without new', function () {
			var checkoutObj = Checkout({name: 'Test name'});

			assert.instanceOf(checkoutObj, Checkout);
			assert.property(checkoutObj, 'name');
		});
	});

	describe('list method', function () {
		it('should return list of checkouts', function (done) {
			var responseData = helpers.loadResponse('checkoutList.json');

			helpers.registerRequest('GET', '/checkouts', 200, responseData);

			Checkout.list({}, function (error, response, pagination) {
				assert.isArray(response);
				assert.instanceOf(response.pop(), Checkout);
				assert.property(pagination, 'cursor_range');
				done();
			});
		});
	});

	describe('retrieve method', function () {
		it('should return checkouts instance', function (done) {
			var responseData = helpers.loadResponse('checkout.json');
			var id = responseData.data.id;

			helpers.registerRequest('GET', '/checkouts/' + id, 200, responseData);

			Checkout.retrieve(id, function (error, response) {
				assert.instanceOf(response, Checkout);
				done();
			});
		});
	});

	describe('create method', function () {
		it('should create charge and return created checkouts', function (done) {
			var responseData = helpers.loadResponse('checkout.json');

			helpers.registerRequest('POST', '/checkouts', 201, responseData);

			var data = {
				'description': 'test description',
				'local_price': {
					'amount': '100.00',
					'currency': 'USD'
				},
				'name': 'Test Name',
				'pricing_type': 'fixed_price',
				'requested_info': [
					'email'
				]
			};

			Checkout.create(data, function (error, response) {
				assert.instanceOf(response, Checkout);
				done();
			});
		});
	});

	describe('update method', function () {
		it('should update checkout by id and return updated checkouts', function (done) {
			var responseData = helpers.loadResponse('checkout.json');
			var id = responseData.data.id;
			var description = 'New description';
			var data = {
				'description': description
			};

			responseData.data.description = description;

			helpers.registerRequest('PUT', '/checkouts/' + id, 200, responseData);

			Checkout.updateById(id, data, function (error, response) {
				assert.instanceOf(response, Checkout);
				done();
			});
		});

		it('should update checkout object and return updated checkouts', function (done) {
			var responseData = helpers.loadResponse('checkout.json');
			var id = responseData.data.id;
			var description = 'New description';

			responseData.data.description = description;

			var checkoutObj = new Checkout();

			helpers.registerRequest('PUT', '/checkouts/' + id, 200, responseData);

			checkoutObj.id = id;
			checkoutObj.description = description;

			checkoutObj.save(function (error, response) {
				assert.instanceOf(response, Checkout);
				done();
			});
		});
	});

	describe('delete method', function () {
		it('should delete checkout by id and return empty checkout', function (done) {
			var responseData = helpers.loadResponse('checkout.json');
			var id = responseData.data.id;

			helpers.registerRequest('DELETE', '/checkouts/' + id, 204);

			Checkout.deleteById(id, function (error, response) {
				assert.instanceOf(response, Checkout);
				assert.deepEqual(response.getProps(), {});
				done();
			});
		});

		it('should delete checkout and return empty checkout', function (done) {
			var responseData = helpers.loadResponse('checkout.json');
			var id = responseData.data.id;
			var checkoutObj = new Checkout();

			helpers.registerRequest('DELETE', '/checkouts/' + id, 204);

			checkoutObj.id = id;
			checkoutObj.delete(function (error, response) {
				assert.instanceOf(response, Checkout);
				assert.deepEqual(response.getProps(), {});
				done();
			});
		});
	});
});