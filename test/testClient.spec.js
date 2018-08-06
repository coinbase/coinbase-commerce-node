'use strict';

var assert = require('chai').assert,
	Client = require('../lib/Client');

describe('Client', function () {

	it('should initialize client with params', function () {
		var testApiKey = 'some_test_key';
		var testBaseUrl = 'https://api.test.com/';
		var testApiVersion = '2017-03-22';
		var timeout = 3000;
		var clientObj = Client.init(testApiKey, testBaseUrl, testApiVersion, timeout);

		assert.equal(clientObj.getParam('apiKey'), testApiKey);
		assert.equal(clientObj.getParam('apiVersion'), testApiVersion);
		assert.equal(clientObj.getParam('baseApiUrl'), testBaseUrl);
		assert.equal(clientObj.getParam('timeout'), timeout);
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
		assert.equal(secondClentObj.getParam('apiKey'), secondTestApiKey);
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

		assert.strictEqual(clientObj.getParam('apiKey'), anotherTestApiKey);
		assert.strictEqual(clientObj.getParam('apiVersion'), apiVersion);
		assert.strictEqual(clientObj.getParam('baseApiUrl'), baseApiUrl);
	});
});