'use strict';

var extend = require('../Utils').extend,
	ApiError = require('./ApiError');

function InvalidRequestError() {
	ApiError.apply(this, arguments);
}

extend(InvalidRequestError, ApiError);

module.exports = InvalidRequestError;
