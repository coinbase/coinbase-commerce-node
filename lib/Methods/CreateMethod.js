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
					if (callback) {
						callback(error);
					}

					return reject(error);
				}

				var resourceObj = utils.convertToApiObject(response);

				if (callback) {
					callback(null, resourceObj);
				}

				return resolve(resourceObj);
			});
		});
	}
};
