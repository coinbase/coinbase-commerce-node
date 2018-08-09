'use strict';

var assert = require('chai').assert,
	buildApiError = require('../lib/buildApiError'),
	ApiError = require('../lib/Errors/ApiError'),
	CoinbaseError = require('../lib/Errors/CoinbaseError'),
	InvalidRequestError = require('../lib/Errors/InvalidRequestError'),
	AuthenticationError = require('../lib/Errors/AuthenticationError'),
	ResourceNotFoundError = require('../lib/Errors/ResourceNotFoundError'),
	RateLimitExceededError = require('../lib/Errors/RateLimitExceededError'),
	InternalServerError = require('../lib/Errors/InternalServerError'),
	ServiceUnavailableError = require('../lib/Errors/ServiceUnavailableError'),
	ParamRequiredError = require('../lib/Errors/ParamRequiredError'),
	ValidationError = require('../lib/Errors/ValidationError');

var fixtures = [
	{
		response: {
			statusCode: 400,
			body: JSON.stringify({
				'error': {
					'type': 'invalid_request',
					'message': 'Pricing type is not included in the list'
				}
			})
		},
		errorClass: InvalidRequestError
	},
	{
		response: {
			statusCode: 401,
			body: JSON.stringify({
				'error': {
					'type': 'authorization_error',
					'message': 'You are not authorized to do that.'
				}
			})
		},
		errorClass: AuthenticationError
	},
	{
		response: {
			statusCode: 404,
			body: JSON.stringify({
				'error': {
					'type': 'not_found',
					'message': 'Not found'
				}
			})
		},
		errorClass: ResourceNotFoundError
	},
	{
		response: {
			statusCode: 429,
			body: JSON.stringify({
				'error': {
					'type': 'rate_limit_exceeded',
					'message': 'Rate limit exceeded'
				}
			})
		},
		errorClass: RateLimitExceededError
	},
	{
		response: {
			statusCode: 500,
			body: JSON.stringify({
				'error': {
					'type': 'internal_server_error',
					'message': 'Internal server error'
				}
			})
		},
		errorClass: InternalServerError
	},
	{
		response: {
			statusCode: 503,
			body: ''
		},
		errorClass: ServiceUnavailableError
	},
	{
		response: {
			statusCode: 400,
			body: JSON.stringify({
				'error': {
					'type': 'param_required',
					'message': 'Param required'
				}
			})
		},
		errorClass: ParamRequiredError
	},
	{
		response: {
			statusCode: 400,
			body: JSON.stringify({
				'error': {
					'type': 'validation_error',
					'message': 'Validation error'
				}
			})
		},
		errorClass: ValidationError
	}
];


describe('test for buildApiError', function () {
	fixtures.forEach(function (fixture) {
		var serverResponse = fixture.response;
		var errorClass = fixture.errorClass;

		it('should return ' + errorClass.name + ' error', function () {

			buildApiError(null, serverResponse, function (error) {
				assert.instanceOf(error, fixture.errorClass);
				if (serverResponse.body) {
					assert.equal(error.message, JSON.parse(serverResponse.body).error.message);
				}
				assert.equal(error.code, serverResponse.statusCode);
				assert.equal(error.body, serverResponse.body);
			});
		});
	});

	it('CoinbaseError should be correctly initialized', function () {
		var message = 'Test Message';
		var errorObj = new CoinbaseError(message);

		assert.equal(errorObj.message, message);
	});

	it('ApiError should be correctly initialized', function () {
		var message = 'Test Message';
		var code = 400;
		var body = JSON.stringify({
			'error': {
				'type': 'validation_error',
				'message': 'Validation error'
			}
		});
		var requestId = 'test_request_id';
		var headers = {
			'x-request-id': requestId
		};

		var apiErrorObj = new ApiError(message, code, body, headers);

		assert.equal(apiErrorObj.message, message);
		assert.equal(apiErrorObj.body, body);
		assert.equal(apiErrorObj.code, code);
		assert.equal(apiErrorObj.headers, headers);
		assert.equal(apiErrorObj.requestId, requestId);
	});

	it('should throw exception on invalid callback', function () {
		assert.throws(function () {
			var serverResponse = {
				statusCode: 404,
				body: JSON.stringify({
					'error': {
						'type': 'not_found',
						'message': 'Not found'
					}
				})
			};

			buildApiError(null, serverResponse);
		}, Error, 'No callback - check method signature');
	});

	it('no error', function () {
		var serverResponse = {
			statusCode: 200,
			body: JSON.stringify({
				'data': {
					'created_at': '2018-07-26T16:19:37Z',
					'description': 'test description',
					'id': '4b830904-f4c5-4c22-8bec-062fcd643921',
					'local_price': {
						'amount': '100.00',
						'currency': 'USD'
					},
					'name': 'Test Name',
					'pricing_type': 'fixed_price',
					'requested_info': [
						'email'
					],
					'resource': 'checkout',
					'updated_at': '2018-07-26T16:20:15Z'
				}
			})
		};
		var result = buildApiError(null, serverResponse, function () {
		});

		assert.isFalse(result);
	});
});
