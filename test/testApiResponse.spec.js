'use strict';

var assert = require('chai').assert,
	ApiResponse = require('../lib/ApiResponse');

function mockBody(withWarning) {
	var response = {'data': {'foo': 'bar'}};

	if (withWarning) {
		response.warnings = ['warning raises'];
	}

	return JSON.stringify(response);
}

function mockResponse(withWarning) {
	var requestResponse = {
		statusCode: 200,
		headers: {'x-request-id': 'req_123456'},
		body: mockBody(withWarning)
	};

	return {
		requestResponse: requestResponse,
		apiResponse: new ApiResponse(requestResponse)
	};
}

describe('ApiResponse', function () {
	it('should contain correct request id', function () {
		var result = mockResponse();

		assert.equal(result.apiResponse.requestId, result.requestResponse.headers['x-request-id']);
	});

	it('should contain correct request status code', function () {
		var result = mockResponse();

		assert.equal(result.apiResponse.code, result.requestResponse.statusCode);
	});

	it('should contain correct headers', function () {
		var result = mockResponse();

		assert.equal(result.apiResponse.headers, result.requestResponse.headers);
	});

	it('should contain correct data', function () {
		var result = mockResponse();

		assert.deepEqual(result.apiResponse.data, JSON.parse(result.requestResponse.body));
	});
});
