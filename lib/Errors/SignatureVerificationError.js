'use strict';

var extend = require('../Utils').extend,
	CoinbaseError = require('./CoinbaseError');

function SignatureVerificationError(signature, payload) {
	var message = 'No signatures found matching the expected signature ' + signature + ' for payload ' + payload;

	CoinbaseError.call(this, message);
}

extend(SignatureVerificationError, CoinbaseError);

module.exports = SignatureVerificationError;
