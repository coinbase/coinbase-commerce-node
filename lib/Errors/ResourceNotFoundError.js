'use strict';

var extend = require('../Utils').extend,
	ApiError = require('./ApiError');

function ResourceNotFoundError() {
	ApiError.apply(this, arguments);
}

extend(ResourceNotFoundError, ApiError);

module.exports = ResourceNotFoundError;
