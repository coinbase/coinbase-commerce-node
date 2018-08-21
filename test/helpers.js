'use strict';

var fs = require('fs'),
	path = require('path'),
	nock = require('nock');

var TEST_BASE_URI = 'https://api.commerce.coinbase.com/';

function loadResponse(file) {
	var filePath = path.join(__dirname, 'Fixtures', file);
	var contents = fs.readFileSync(filePath, 'utf8');

	return JSON.parse(contents);
}

function registerRequest(method, path, code, responseBody, repeatTimes, delay) {
	var nockObj = nock(TEST_BASE_URI).intercept(path, method);

	if (repeatTimes) {
		nockObj.times(repeatTimes);
	}

	if (delay) {
		nockObj.delayConnection(delay);
	}

	return nockObj.reply(code, responseBody);
}

module.exports = {
	loadResponse: loadResponse,
	registerRequest: registerRequest
};
