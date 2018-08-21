'use strict';

var Event = require('./Resources/Event'),
	SignatureVerificationError = require('./Errors/SignatureVerificationError'),
	InvalidResponseError = require('./Errors/InvalidResponseError'),
	compare = require('secure-compare'),
	crypto = require('crypto');

module.exports = {
	verifyEventBody: function (payload, sigHeader, secret) {
		var data;

		try {
			data = JSON.parse(payload);
		} catch (error) {
			throw new InvalidResponseError('Invalid payload provided. No JSON object could be decoded', payload);
		}

		if (!(data && data.event)) {
			throw new InvalidResponseError('Invalid payload provided.', payload);
		}

		this.verifySigHeader(payload, sigHeader, secret);

		return new Event(data.event);
	},
	computeSignature: function (payload, secret) {
		return crypto.createHmac('sha256', secret)
			.update(payload, 'utf8')
			.digest('hex');
	},
	verifySigHeader: function (payload, sigHeader, secret) {
		var computedSignature = this.computeSignature(payload, secret);

		if (!compare(computedSignature, sigHeader)) {
			throw new SignatureVerificationError(sigHeader, payload);
		}

		return true;
	}
};
