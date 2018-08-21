'use strict';

var extend = require('../Utils').extend;

function CoinbaseError(message) {
	if (!Error.captureStackTrace) {
		this.stack = (new Error()).stack;
	} else {
		Error.captureStackTrace(this, this.constructor);
	}

	this.message = message;
}

extend(CoinbaseError, Error);

module.exports = CoinbaseError;
