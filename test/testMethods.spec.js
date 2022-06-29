'use strict';

var assert = require('chai').assert,
	helpers = require('./helpers'),
	Client = require('../lib/Client'),
	InternalServerError = require('../lib/Errors/InternalServerError'),
	Checkout = require('../lib/Resources/Checkout'),
	Charge = require('../lib/Resources/Charge');


Client.init('test_key');

describe('Methods', function () {
	it('create method test', function (done) {
		var method = require('../lib/Methods/CreateMethod');
		var responseData = helpers.loadResponse('checkout.json');

		helpers.registerRequest('POST', '/checkouts', 201, responseData, 2);

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

		method.resourcePath = 'checkouts';

		// Run with callback
		method.create(data, function (error, response) {
			assert.instanceOf(response, Checkout);
		});

		// Run with promise
		method.create(data).then(function (response) {
			assert.instanceOf(response, Checkout);
			done();
		});
	});

	it('create method test failed', function (done) {
		var method = require('../lib/Methods/CreateMethod');
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});

		helpers.registerRequest('POST', '/checkouts', 500, responseData, 2);

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

		method.resourcePath = 'checkouts';

		// Run with callback
		method.create(data, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.create(data).then(function () {

		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('retrieve method test', function (done) {
		var method = require('../lib/Methods/RetrieveMethod');
		var responseData = helpers.loadResponse('checkout.json');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';

		helpers.registerRequest('GET', '/checkouts/' + id, 200, responseData, 2);

		method.resourcePath = 'checkouts';

		// Run with callback
		method.retrieve(id, function (error, response) {
			assert.instanceOf(response, Checkout);
		});

		// Run with promise
		method.retrieve(id).then(function (response) {
			assert.instanceOf(response, Checkout);
			done();
		});
	});

	it('retrieve method test failed', function (done) {
		var method = require('../lib/Methods/RetrieveMethod');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});

		helpers.registerRequest('GET', '/checkouts/' + id, 500, responseData, 2);

		method.resourcePath = 'checkouts';

		// Run with callback
		method.retrieve(id, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.retrieve(id).then(function () {

		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('updateById method test', function (done) {
		var method = require('../lib/Methods/UpdateByIdMethod');
		var responseData = helpers.loadResponse('checkout.json');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var data = {
			'description': 'new description'
		};

		helpers.registerRequest('PUT', '/checkouts/' + id, 200, responseData, 2);

		method.resourcePath = 'checkouts';

		// Run with callback
		method.updateById(id, data, function (error, response) {
			assert.instanceOf(response, Checkout);
		});

		// Run with promise
		method.updateById(id, data).then(function (response) {
			assert.instanceOf(response, Checkout);
			done();
		});
	});

	it('updateById method test failed', function (done) {
		var method = require('../lib/Methods/UpdateByIdMethod');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var data = {
			'description': 'new description'
		};
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});

		helpers.registerRequest('PUT', '/checkouts/' + id, 500, responseData, 2);

		method.resourcePath = 'checkouts';

		// Run with callback
		method.updateById(id, data, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.updateById(id, data).then(function () {

		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('cancelById method test', function (done) {
		var method = require('../lib/Methods/CancelByIdMethod');
		var id = '488fcbd5-eb82-42dc-8a2b-10fdf70e0bfe';

		helpers.registerRequest('POST', '/charges/' + id + '/cancel', 200, '', 2);

		// Run with callback
		method.cancelById.call(Charge, id, function (error, response) {
			assert.instanceOf(response, Charge);
		});

		// Run with promise
		method.cancelById.call(Charge, id).then(function (response) {
			assert.instanceOf(response, Charge);
			done();
		});
	});

	it('cancelById method test failed', function (done) {
		var method = require('../lib/Methods/CancelByIdMethod');
		var id = '488fcbd5-eb82-42dc-8a2b-10fdf70e0bfe';
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});

		helpers.registerRequest('POST', '/charges/' + id + '/cancel', 500, responseData, 2);

		// Run with callback
		method.cancelById.call(Charge, id, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.cancelById.call(Charge, id).then(function () {

		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('deleteById method test', function (done) {
		var method = require('../lib/Methods/DeleteByIdMethod');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';

		helpers.registerRequest('DELETE', '/checkouts/' + id, 204, '', 2);

		// Run with callback
		method.deleteById.call(Checkout, id, function (error, response) {
			assert.instanceOf(response, Checkout);
		});

		// Run with promise
		method.deleteById.call(Checkout, id).then(function (response) {
			assert.instanceOf(response, Checkout);
			done();
		});
	});

	it('deleteById method test failed', function (done) {
		var method = require('../lib/Methods/DeleteByIdMethod');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});

		helpers.registerRequest('DELETE', '/checkouts/' + id, 500, responseData, 2);

		// Run with callback
		method.deleteById.call(Checkout, id, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.deleteById.call(Checkout, id).then(function () {

		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('delete method test', function (done) {
		var method = require('../lib/Methods/DeleteMethod');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var checkoutObj = new Checkout();

		helpers.registerRequest('DELETE', '/checkouts/' + id, 204, '', 2);

		checkoutObj.id = id;

		// Run with callback
		method.delete.call(checkoutObj, function (error, response) {
			assert.instanceOf(response, Checkout);
		});

		// Run with promise
		method.delete.call(checkoutObj).then(function (response) {
			assert.instanceOf(response, Checkout);
			done();
		});
	});

	it('delete method test failed', function (done) {
		var method = require('../lib/Methods/DeleteMethod');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var checkoutObj = new Checkout();
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});


		helpers.registerRequest('DELETE', '/checkouts/' + id, 500, responseData, 2);

		checkoutObj.id = id;

		// Run with callback
		method.delete.call(checkoutObj, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.delete.call(checkoutObj).then(function () {

		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('update method test', function (done) {
		var method = require('../lib/Methods/UpdateMethod');
		var responseData = helpers.loadResponse('checkout.json');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var checkoutObj = new Checkout();

		helpers.registerRequest('PUT', '/checkouts/' + id, 200, responseData, 2);
		checkoutObj.id = id;
		checkoutObj.name = 'New name';

		// Run with callback
		method.update.call(checkoutObj, function (error, response) {
			assert.instanceOf(response, Checkout);
		});

		// Run with promise
		method.update.call(checkoutObj).then(function (response) {
			assert.instanceOf(response, Checkout);
			done();
		});
	});

	it('update method test failed', function (done) {
		var method = require('../lib/Methods/UpdateMethod');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var checkoutObj = new Checkout();
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});

		helpers.registerRequest('PUT', '/checkouts/' + id, 500, responseData, 2);
		checkoutObj.id = id;
		checkoutObj.name = 'New name';

		// Run with callback
		method.update.call(checkoutObj, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.update.call(checkoutObj).then(function () {

		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('save as insert method test', function (done) {
		var method = require('../lib/Methods/SaveMethod');
		var responseData = helpers.loadResponse('checkout.json');
		var checkoutObj = new Checkout();

		helpers.registerRequest('POST', '/checkouts', 200, responseData, 2);
		checkoutObj.name = 'New name';

		// Run with callback
		method.save.call(checkoutObj, function (error, response) {
			assert.instanceOf(response, Checkout);
		});

		// Run with promise
		method.save.call(checkoutObj).then(function (response) {
			assert.instanceOf(response, Checkout);
			done();
		});
	});

	it('save as insert method test failed', function (done) {
		var method = require('../lib/Methods/SaveMethod');
		var checkoutObj = new Checkout();
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});

		helpers.registerRequest('POST', '/checkouts', 500, responseData, 2);
		checkoutObj.name = 'New name';

		// Run with callback
		method.save.call(checkoutObj, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.save.call(checkoutObj).then(function () {
		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('save as update method test', function (done) {
		var method = require('../lib/Methods/SaveMethod');
		var responseData = helpers.loadResponse('checkout.json');
		var id = '4b830904-f4c5-4c22-8bec-062fcd643921';
		var checkoutObj = new Checkout();

		helpers.registerRequest('PUT', '/checkouts/' + id, 200, responseData, 2);
		checkoutObj.id = id;
		checkoutObj.name = 'New name';

		// Run with callback
		method.save.call(checkoutObj, function (error, response) {
			assert.instanceOf(response, Checkout);
		});

		// Run with promise
		method.save.call(checkoutObj).then(function (response) {
			assert.instanceOf(response, Checkout);
			done();
		});
	});


	it('list method test', function (done) {
		var method = require('../lib/Methods/ListMethod');

		var responseData = helpers.loadResponse('firstPageChargeList.json');

		helpers.registerRequest('GET', '/charges', 200, responseData, 2);

		// Run with callback
		method.list.call(Charge, {}, function (error, list) {
			assert.instanceOf(list.pop(), Charge);
		});

		// Run with promise
		method.list.call(Charge, {}).then(function (response) {
			var pagination = response.pop();
			var list = response.pop();

			assert.instanceOf(list.pop(), Charge);
			assert.property(pagination, 'cursor_range');
			done();
		});
	});

	it('list method test failed', function (done) {
		var method = require('../lib/Methods/ListMethod');
		var responseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});

		helpers.registerRequest('GET', '/charges', 500, responseData, 2);

		// Run with callback
		method.list.call(Charge, {}, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.list.call(Charge, {}).then(function () {

		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});

	it('all method test', function (done) {
		var method = require('../lib/Methods/ListMethod');
		var firstPageResponseData = helpers.loadResponse('firstPageChargeList.json');
		var secondPageResponseData = helpers.loadResponse('secondPageChargeList.json');
		var startingAfter = firstPageResponseData.pagination.cursor_range.slice(-1).pop();

		helpers.registerRequest('GET', '/charges', 200, firstPageResponseData);
		helpers.registerRequest('GET', '/charges?starting_after=' + startingAfter, 200, secondPageResponseData);
		helpers.registerRequest('GET', '/charges', 200, firstPageResponseData);
		helpers.registerRequest('GET', '/charges?starting_after=' + startingAfter, 200, secondPageResponseData);

		// Run with callback
		method.all.call(Charge, {}, function (error, list) {
			assert.lengthOf(list, 3);
			assert.instanceOf(list.pop(), Charge);
		});

		// Run with promise
		method.all.call(Charge, {}).then(function (list) {
			assert.lengthOf(list, 3);
			assert.instanceOf(list.pop(), Charge);
			done();
		});
	});

	it('all method test failed', function (done) {
		var method = require('../lib/Methods/ListMethod');
		var firstPageResponseData = helpers.loadResponse('firstPageChargeList.json');
		var secondPageResponseData = JSON.stringify({
			'error': {
				'type': 'internal_server_error',
				'message': 'Internal server error'
			}
		});
		var startingAfter = firstPageResponseData.pagination.cursor_range.slice(-1).pop();

		helpers.registerRequest('GET', '/charges', 200, firstPageResponseData);
		helpers.registerRequest('GET', '/charges?starting_after=' + startingAfter, 500, secondPageResponseData);
		helpers.registerRequest('GET', '/charges', 200, firstPageResponseData);
		helpers.registerRequest('GET', '/charges?starting_after=' + startingAfter, 500, secondPageResponseData);

		// Run with callback
		method.all.call(Charge, {}, function (error) {
			assert.instanceOf(error, InternalServerError);
		});

		// Run with promise
		method.all.call(Charge, {}).then(function () {
		}, function (error) {
			assert.instanceOf(error, InternalServerError);
			done();
		});
	});
});
