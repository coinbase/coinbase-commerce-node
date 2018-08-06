'use strict';

var Promise = require('promise'),
	utils = require('../Utils'),
	client = require('../Client');

module.exports = {
	list: function (params, callback) {
		var self = this;

		return new Promise(function (resolve, reject) {

			utils.validateCallback(callback);

			var clientObj = client.getInstance();
			var path = self.resourcePath;

			params = params || {};
			clientObj.getHttp(path, params, function (error, response) {
				if (error) {
					return callback ? callback(error, null) : reject(error);
				}

				var responseData = response.data;
				var list = responseData.data.map(function (item) {
					return utils.convertToApiObject(item);
				});

				return callback ? callback(null, list, responseData.pagination) : resolve([list, responseData.pagination]);
			});
		});
	},

	all: function (params, callback) {
		var self = this;

		return new Promise(function (resolve, reject) {

			utils.validateCallback(callback);
			params = params || {};

			var clientObj = client.getInstance();
			var path = self.resourcePath;
			var items = [];

			var pageFunction = function (path, params, callback) {
				clientObj.getHttp(path, params, function (error, response) {
					if (error) {
						return callback ? callback(error) : reject(error);
					}

					var responseData = response.data;
					var page = responseData.data.map(function (item) {
						return utils.convertToApiObject(item);
					});
					var pagination = responseData.pagination;
					var shown = pagination.yielded || 0;
					var limit = pagination.limit || 0;
					var cursorRange = pagination.cursor_range || [];

					items = items.concat(page);

					if (shown < limit) {
						return callback ? callback(null, items) : resolve(items);
					}

					if (Array.isArray(cursorRange) && cursorRange.length) {
						params['starting_after'] = cursorRange.slice(-1).pop();
					} else {
						return callback ? callback(null, items) : resolve(items);
					}

					pageFunction(path, params, callback);
				});
			};

			pageFunction(path, params, callback);
		});
	}
};
