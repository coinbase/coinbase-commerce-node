'use strict';

var assert = require('chai').assert,
	Client = require('../lib/Client');

describe('Client', function () {
	it('should initialize client with default params if not set', function () {
		var testApiKey = 'some_test_key';
		var clientObj = Client.init(testApiKey);

		assert.equal(clientObj.getApiKey(), testApiKey);
		assert.equal(clientObj.getApiVersion(), '2018-03-22');
		assert.equal(clientObj.getBaseApiUrl(), 'https://api.commerce.coinbase.com/');
		assert.equal(clientObj.getRequestTimeout(), 3000);
	});

	it('should initialize client with params', function () {
		var testApiKey = 'some_test_key';
		var testBaseUrl = 'https://api.test.com/';
		var testApiVersion = '2017-03-25';
		var timeout = 4000;
		var clientObj = Client.init(testApiKey, testBaseUrl, testApiVersion, timeout);

		assert.equal(clientObj.getApiKey(), testApiKey);
		assert.equal(clientObj.getApiVersion(), testApiVersion);
		assert.equal(clientObj.getBaseApiUrl(), testBaseUrl);
		assert.equal(clientObj.getRequestTimeout(), timeout);
	});

	it('should throw exception when you try initialize client without api key', function () {
		assert.throws(function () {
			Client.init();
		}, Error, 'Api Key is required.');
	});

	it('should correctly reinitialize client', function () {
		var firstTestApiKey = 'first_test_key';
		var secondTestApiKey = 'second_test_key';
		var firstClientObj = Client.init(firstTestApiKey);
		var secondClentObj = Client.init(secondTestApiKey);

		assert.strictEqual(firstClientObj, secondClentObj);
		assert.equal(secondClentObj.getApiKey(), secondTestApiKey);
	});

	it('should receive same instance each time', function () {
		var testApiKey = 'some_test_key';
		var clientObj = Client.init(testApiKey);
		var clientObjInstance = Client.getInstance();

		assert.strictEqual(clientObj, clientObjInstance);
	});

	it('set properties view setters', function () {
		var testApiKey = 'some_test_key';
		var clientObj = Client.init(testApiKey);
		var anotherTestApiKey = 'another_test_api_key';
		var baseApiUrl = 'https://api.commerce.coinbase.com/';
		var apiVersion = '2018-03-22';

		clientObj.setApiKey(anotherTestApiKey);
		clientObj.setApiVersion(apiVersion);
		clientObj.setBaseApiUrl(baseApiUrl);

		assert.strictEqual(clientObj.getApiKey(), anotherTestApiKey);
		assert.strictEqual(clientObj.getApiVersion(), apiVersion);
		assert.strictEqual(clientObj.getBaseApiUrl(), baseApiUrl);
	});
});
