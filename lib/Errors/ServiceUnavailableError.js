'use strict';

var extend = require('../Utils').extend,
	ApiError = require('./ApiError');

function ServiceUnavailableError() {
	ApiError.apply(this, arguments);
}

extend(ServiceUnavailableError, ApiError);

module.exports = ServiceUnavailableError;
