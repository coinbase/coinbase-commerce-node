var resources = {
	Charge: require('./lib/Resources/Charge'),
	Checkout: require('./lib/Resources/Checkout'),
	Event: require('./lib/Resources/Event')
};

var errors = {
	ResourceNotFoundError: require('./lib/Errors/ResourceNotFoundError'),
	InvalidRequestError: require('./lib/Errors/InvalidRequestError'),
	ParamRequiredError: require('./lib/Errors/ParamRequiredError'),
	AuthenticationError: require('./lib/Errors/AuthenticationError'),
	RateLimitExceededError: require('./lib/Errors/RateLimitExceededError'),
	ValidationError: require('./lib/Errors/ValidationError'),
	InternalServerError: require('./lib/Errors/InternalServerError'),
	ServiceUnavailableError: require('./lib/Errors/ServiceUnavailableError'),
	ApiError: require('./lib/Errors/ApiError'),
	CoinbaseError: require('./lib/Errors/CoinbaseError'),
	SignatureVerificationError: require('./lib/Errors/SignatureVerificationError'),
	InvalidResponseError: require('./lib/Errors/InvalidResponseError')
};

module.exports = {
	Client: require('./lib/Client'),
	Webhook: require('./lib/Webhook'),
	resources: resources,
	errors: errors
};
