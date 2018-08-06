'use strict';

var Promise = require('promise'),
	client = require('../Client'),
	utils = require('../Utils');

module.exports = {
	create: function (data, callback) {
		var self = this;

		return new Promise(function (resolve, reject) {

			utils.validateCallback(callback);

			var path = self.resourcePath;
			var clientObj = client.getInstance();

			clientObj.postHttp(path, data, function (error, response) {
				if (error) {
					return callback ? callback(error) : reject(error);
				}

				return callback ?
					callback(null, utils.convertToApiObject(response)) : resolve(utils.convertToApiObject(response));
			});
		});
	}
};
