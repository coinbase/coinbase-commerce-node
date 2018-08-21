'use strict';

var extend = require('../Utils').extend,
	ApiError = require('./ApiError');

function RateLimitExceededError() {
	ApiError.apply(this, arguments);
}

extend(RateLimitExceededError, ApiError);

module.exports = RateLimitExceededError;
