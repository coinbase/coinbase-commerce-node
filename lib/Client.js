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

var DEFAULT_API_KEY = null;
var DEFAULT_BASE_API_URL = 'https://api.commerce.coinbase.com/';
var DEFAULT_API_VERSION = '2018-03-22';
var DEFAULT_TIMEOUT = 3000;

module.exports = (function (DEFAULT_API_KEY, DEFAULT_BASE_API_URL, DEFAULT_API_VERSION, DEFAULT_TIMEOUT) {
	var instance;

	function init(apiKey, baseApiUrl, apiVersion, timeout) {

		var CONFIG_PARAM_NAMES = {
			API_KEY: 'apiKey',
			BASE_API_URL: 'baseApiUrl',
			API_VERSION: 'apiVersion',
			TIMEOUT: 'timeout'
		};
		var config = {};

		config[CONFIG_PARAM_NAMES.API_KEY] = DEFAULT_API_KEY;
		config[CONFIG_PARAM_NAMES.BASE_API_URL] = DEFAULT_BASE_API_URL;
		config[CONFIG_PARAM_NAMES.API_VERSION] = DEFAULT_API_VERSION;
		config[CONFIG_PARAM_NAMES.TIMEOUT] = DEFAULT_TIMEOUT;

		function setParam(key, value) {
			config[key] = value;
		}

		function getParam(key) {
			return config[key];
		}

		function setApiKey(apiKey) {
			if (apiKey) {
				setParam(CONFIG_PARAM_NAMES.API_KEY, apiKey);
			} else {
				throw new Error('Api Key is required.');
			}
		}

		function getApiKey() {
			return	getParam(CONFIG_PARAM_NAMES.API_KEY);
		}

		function setApiVersion(apiVersion) {
			if (apiVersion) {
				setParam(CONFIG_PARAM_NAMES.API_VERSION, apiVersion);
			}
		}

		function getApiVersion() {
			return	getParam(CONFIG_PARAM_NAMES.API_VERSION);
		}

		function setRequestTimeout(timeout) {
			if (timeout) {
				setParam(CONFIG_PARAM_NAMES.TIMEOUT, timeout);
			}
		}

		function getRequestTimeout() {
			return	getParam(CONFIG_PARAM_NAMES.TIMEOUT);
		}

		function setBaseApiUrl(baseApiUrl) {
			if (baseApiUrl) {
				var urlObj = url.parse(baseApiUrl);

				if (urlObj.protocol === 'http:') {
					var warning = 'WARNING: this client is sending a request to an insecure'
						+ ' API endpoint. Any API request you make may expose your API key and'
						+ ' secret to third parties. Consider using the default endpoint: ' + baseApiUrl;

					console.warn(warning);
				}

				setParam(CONFIG_PARAM_NAMES.BASE_API_URL, baseApiUrl);
			}
		}

		function getBaseApiUrl() {
			return	getParam(CONFIG_PARAM_NAMES.BASE_API_URL);
		}

		setApiKey(apiKey);
		setBaseApiUrl(baseApiUrl);
		setApiVersion(apiVersion);
		setRequestTimeout(timeout);

		function generateReqOptions(url, body, method, headers) {
			var bodyStr = body ? JSON.stringify(body) : '';
			var options = {
				'url': url,
				'body': bodyStr,
				'method': method,
				'timeout': getRequestTimeout(),
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'User-Agent': 'Coinbase ' + version,
					'X-CC-Api-Key': getApiKey(),
					'X-CC-Version': getApiVersion()
				}
			};

			options.headers = assign(options.headers, headers);

			return options;
		}

		function getFullUrlPath(path, params) {
			var baseUrl = getBaseApiUrl();
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
			setApiKey: setApiKey,
			getApiKey: getApiKey,
			setApiVersion: setApiVersion,
			getApiVersion: getApiVersion,
			setBaseApiUrl: setBaseApiUrl,
			getBaseApiUrl: getBaseApiUrl,
			setRequestTimeout: setRequestTimeout,
			getRequestTimeout: getRequestTimeout,
			getHttp: function (path, args, callback, headers) {
				var fullUrl = getFullUrlPath(path, args);
				var options = generateReqOptions(fullUrl, null, 'GET', headers);

				makeRequest(options, callback);
			},
			postHttp: function (path, data, callback, headers) {
				var fullUrl = getFullUrlPath(path);
				var options = generateReqOptions(fullUrl, data, 'POST', headers);

				makeRequest(options, callback);
			},
			putHttp: function (path, data, callback, headers) {
				var fullUrl = getFullUrlPath(path);
				var options = generateReqOptions(fullUrl, data, 'PUT', headers);

				makeRequest(options, callback);
			},
			deleteHttp: function (path, callback, headers) {
				var fullUrl = getFullUrlPath(path);
				var options = generateReqOptions(fullUrl, {}, 'DELETE', headers);

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
				instance.setRequestTimeout(timeout);
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
})(DEFAULT_API_KEY, DEFAULT_BASE_API_URL, DEFAULT_API_VERSION, DEFAULT_TIMEOUT);
