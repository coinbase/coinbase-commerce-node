'use strict';

var assert = require('chai').assert,
	ApiResource = require('../lib/ApiResource').ApiResource;

describe('ApiResource', function () {
	it('should correct initialize resource', function () {
		var resource = new ApiResource({
			'code': '7C7V5ECK',
			'created_at': '2018-07-24T07:33:35Z',
			'description': 'Mastering the Transition to the Information Age',
			'expires_at': '2018-07-24T07:48:35Z',
			'hosted_url': 'https://commerce.coinbase.com/charges/7C7V5ECK'
		});

		assert.equal(resource.code, '7C7V5ECK');
		assert.equal(resource.created_at, '2018-07-24T07:33:35Z');
	});

	it('should return all props', function () {
		var data = {
			'code': '7C7V5ECK',
			'created_at': '2018-07-24T07:33:35Z',
			'description': 'Mastering the Transition to the Information Age',
			'expires_at': '2018-07-24T07:48:35Z',
			'hosted_url': 'https://commerce.coinbase.com/charges/7C7V5ECK'
		};
		var resource = new ApiResource(data);
		var props = resource.getProps();

		assert.deepEqual(data, props);
	});

	it('should wipe all props from apiresource', function () {
		var props;
		var data = {
			'code': '7C7V5ECK',
			'created_at': '2018-07-24T07:33:35Z',
			'description': 'Mastering the Transition to the Information Age',
			'expires_at': '2018-07-24T07:48:35Z',
			'hosted_url': 'https://commerce.coinbase.com/charges/7C7V5ECK'
		};
		var resource = new ApiResource(data);

		resource.clearAllProps();
		props = resource.getProps();

		assert.deepEqual(props, {});
	});
});