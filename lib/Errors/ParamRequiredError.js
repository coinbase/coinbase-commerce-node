'use strict';

var extend = require('../Utils').extend,
	ApiError = require('./ApiError');

function ParamRequiredError() {
	ApiError.apply(this, arguments);
}

extend(ParamRequiredError, ApiError);

module.exports = ParamRequiredError;
