'use strict';

var extend = require('../Utils').extend,
	ApiError = require('./ApiError');

function AuthenticationError() {
	ApiError.apply(this, arguments);
}

extend(AuthenticationError, ApiError);

module.exports = AuthenticationError;
