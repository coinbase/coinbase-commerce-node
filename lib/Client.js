/*eslint no-console: 0 */
'use strict';

var url = require('url'),
	request = require('request'),
	_ = require('lodash'),
	assign = require('object-assign'),
	qs = require('querystring'),
	buildApiError = require('./buildApiError'),
	version = require('../package.json').version,
	ApiResponse = require('./ApiResponse');

module.exports = (function () {
	var instance;

	function init(apiKey, baseApiUrl, apiVersion, timeout) {
		var params = {
			apiKey: null,
			baseApiUrl: 'https://api.commerce.coinbase.com/',
			apiVersion: '2018-03-22',
			timeout: 5000
		};

		setApiKey(apiKey);
		setBaseApiUrl(baseApiUrl);
		setApiVersion(apiVersion);
		setTimeout(timeout);

		function setParam(key, value) {
			params[key] = value;
		}

		function getParam(key) {
			return params[key];
		}

		function setApiKey(apiKey) {
			if (apiKey) {
				setParam('apiKey', apiKey);
			} else {
				throw new Error('Api Key is required.');
			}
		}

		function setApiVersion(apiVersion) {
			if (apiVersion) {
				setParam('apiVersion', apiVersion);
			}
		}

		function setTimeout(timeout) {
			if (timeout) {
				setParam('timeout', timeout);
			}
		}

		function setBaseApiUrl(baseApiUrl) {
			if (baseApiUrl) {
				var urlObj = url.parse(baseApiUrl);

				if (urlObj.protocol == 'http:') {
					var warning = 'WARNING: this client is sending a request to an insecure'
						+ ' API endpoint. Any API request you make may expose your API key and'
						+ ' secret to third parties. Consider using the default endpoint: ' + baseApiUrl;

					console.warn(warning);
				}

				setParam('baseApiUrl', baseApiUrl);
			}
		}

		function generateReqOptions(url, body, method, headers) {
			var bodyStr = body ? JSON.stringify(body) : '';
			var options = {
				'url': url,
				'body': bodyStr,
				'method': method,
				'timeout': getParam('timeout'),
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'User-Agent': 'Coinbase ' + version,
					'X-CC-Api-Key': getParam('apiKey'),
					'X-CC-Version': getParam('apiVersion')
				}
			};

			options.headers = assign(options.headers, headers);

			return options;
		}

		function getFullUrlPath(path, params) {
			var baseUrl = getParam('baseApiUrl');
			var extraParams = '';

			if (params && !_.isEmpty(params)) {
				extraParams = '?' + qs.stringify(params);
			}

			return baseUrl + path + extraParams;
		}

		function makeRequest(options, callback) {
			request(options, function (error, response) {
				var apiResponse = new ApiResponse(response);

				if (!buildApiError(error, apiResponse, callback)) {
					callback(null, apiResponse);
				}
			});
		}

		return {
			getParam: getParam,
			setApiKey: setApiKey,
			setApiVersion: setApiVersion,
			setBaseApiUrl: setBaseApiUrl,
			setTimeout: setTimeout,
			getHttp: function (path, args, callback, headers) {
				var url = getFullUrlPath(path, args);
				var options = generateReqOptions(url, null, 'GET', headers);

				makeRequest(options, callback);
			},
			postHttp: function (path, data, callback, headers) {
				var url = getFullUrlPath(path);
				var options = generateReqOptions(url, data, 'POST', headers);

				makeRequest(options, callback);
			},
			putHttp: function (path, data, callback, headers) {
				var url = getFullUrlPath(path);
				var options = generateReqOptions(url, data, 'PUT', headers);

				makeRequest(options, callback);
			},
			deleteHttp: function (path, callback, headers) {
				var url = getFullUrlPath(path);
				var options = generateReqOptions(url, {}, 'DELETE', headers);

				makeRequest(options, callback);
			}
		};
	}

	return {
		init: function (apiKey, baseApiUrl, apiVersion, timeout) {
			if (!instance) {
				instance = init(apiKey, baseApiUrl, apiVersion, timeout);
			} else {
				instance.setApiKey(apiKey);
				instance.setBaseApiUrl(baseApiUrl);
				instance.setApiVersion(apiVersion);
				instance.setTimeout(timeout);
			}

			return instance;
		},
		getInstance: function () {
			if (!instance) {
				throw new Error('Please init client first.');
			}

			return instance;
		}
	};

})();