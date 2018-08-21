'use strict';

var extend = require('../Utils').extend,
	CoinbaseError = require('./CoinbaseError');

function InvalidResponseError(message, body) {
	CoinbaseError.call(this, message);

	this.body = body;
}

extend(InvalidResponseError, CoinbaseError);

module.exports = InvalidResponseError;
