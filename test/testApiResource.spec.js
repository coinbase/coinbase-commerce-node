'use strict';

var _ = require('lodash'),
	assert = require('chai').assert,
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
		var dirtyProps;
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
		dirtyProps = resource.getDirtyProps();

		assert.deepEqual(props, {});
		assert.deepEqual(dirtyProps, {});
		assert.deepEqual(resource.initialData, {});
	});

	it('initaldata test', function () {
		var data = {
			'code': '7C7V5ECK',
			'created_at': '2018-07-24T07:33:35Z',
			'description': 'Mastering the Transition to the Information Age',
			'expires_at': '2018-07-24T07:48:35Z',
			'hosted_url': 'https://commerce.coinbase.com/charges/7C7V5ECK',
			'meta': {
				'prop1': 'test1',
				'prop2': 'test2'
			}
		};
		var resource = new ApiResource(data);

		assert.equal(resource.initialData.code, '7C7V5ECK');
		assert.isTrue(_.isEqual(resource.initialData.meta, {'prop1': 'test1', 'prop2': 'test2'}));
	});

	it('getDirtyProps test', function () {
		var dirty;
		var data = {
			'code': '7C7V5ECK',
			'created_at': '2018-07-24T07:33:35Z',
			'description': 'Mastering the Transition to the Information Age',
			'expires_at': '2018-07-24T07:48:35Z',
			'hosted_url': 'https://commerce.coinbase.com/charges/7C7V5ECK',
			'meta': {
				'prop1': 'test1',
				'prop2': 'test2'
			}
		};
		var resource = new ApiResource(data);

		resource.code = 'fff';
		resource.meta.prop1 = 'test3';
		resource.test = 'vbn';
		resource.expires_at = void 0;

		dirty = resource.getDirtyProps();
		assert.property(dirty, 'code');
		assert.property(dirty, 'meta');
		assert.property(dirty, 'test');
		assert.property(dirty, 'expires_at');
	});
});
