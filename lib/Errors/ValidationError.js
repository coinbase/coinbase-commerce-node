'use strict';

var extend = require('../Utils').extend,
	ApiError = require('./ApiError');

function ValidationError() {
	ApiError.apply(this, arguments);
}

extend(ValidationError, ApiError);

module.exports = ValidationError;
