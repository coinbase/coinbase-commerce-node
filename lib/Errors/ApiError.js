'use strict';

var extend = require('../Utils').extend,
	CoinbaseError = require('./CoinbaseError');

function ApiError(message, code, body, headers) {
	CoinbaseError.call(this, message);

	this.code = code;
	this.body = body;
	this.headers = headers || {};
	this.requestId = headers && headers['x-request-id'];
}

extend(ApiError, CoinbaseError);

module.exports = ApiError;
