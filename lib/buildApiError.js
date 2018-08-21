'use strict';

var _ = require('lodash'),
	InvalidRequestError = require('./Errors/InvalidRequestError'),
	ResourceNotFoundError = require('./Errors/ResourceNotFoundError'),
	ParamRequiredError = require('./Errors/ParamRequiredError'),
	AuthenticationError = require('./Errors/AuthenticationError'),
	RateLimitExceededError = require('./Errors/RateLimitExceededError'),
	ValidationError = require('./Errors/ValidationError'),
	InternalServerError = require('./Errors/InternalServerError'),
	ServiceUnavailableError = require('./Errors/ServiceUnavailableError');

var mapErrorIdToClass = {
	'not_found': ResourceNotFoundError,
	'param_required': ParamRequiredError,
	'validation_error': ValidationError,
	'invalid_request': InvalidRequestError,
	'authentication_error': AuthenticationError,
	'rate_limit_exceeded': RateLimitExceededError,
	'internal_server_error': InternalServerError
};

var mapStatusCodeToClass = {
	400: InvalidRequestError,
	401: AuthenticationError,
	404: ResourceNotFoundError,
	429: RateLimitExceededError,
	500: InternalServerError,
	503: ServiceUnavailableError
};

module.exports = function (error, response, callback) {
	if (!_.isFunction(callback)) {
		throw new TypeError('No callback - check method signature');
	}

	if (error) {
		callback(error, null);

		return true;
	}

	var data = response.data;
	var errorData = data && data.error;
	var errorId = errorData && errorData.type;
	var errorMessage = errorData && errorData.message;
	var errorClass = mapErrorIdToClass[errorId] || mapStatusCodeToClass[response.code];

	if (errorClass) {
		callback(new errorClass(errorMessage, response.code, response.body, response.headers), null);

		return true;
	}

	return false;
};
