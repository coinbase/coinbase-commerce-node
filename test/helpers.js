'use strict';

var fs = require('fs'),
	nock = require('nock');

var TEST_BASE_URI = 'https://api.commerce.coinbase.com/';

function loadResponse(file) {
	var filePath = __dirname + '/Fixtures/' + file;
	var contents = fs.readFileSync(filePath, 'utf8');

	return JSON.parse(contents);
}

function registerRequest(method, path, code, responseBody, repeatTimes, delay) {
	repeatTimes = repeatTimes || 1;

	if (delay) {
		return nock(TEST_BASE_URI)
			.intercept(path, method)
			.delayConnection(delay)
			.times(repeatTimes)
			.reply(code, responseBody);
	}

	return nock(TEST_BASE_URI)
		.intercept(path, method)
		.times(repeatTimes)
		.reply(code, responseBody);
}

module.exports = {
	loadResponse: loadResponse,
	registerRequest: registerRequest
};