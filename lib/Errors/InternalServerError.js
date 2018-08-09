'use strict';

var extend = require('../Utils').extend,
	ApiError = require('./ApiError');

function InternalServerError() {
	ApiError.apply(this, arguments);
}

extend(InternalServerError, ApiError);

module.exports = InternalServerError;
