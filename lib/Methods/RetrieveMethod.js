'use strict';

var Promise = require('promise'),
	client = require('../Client'),
	utils = require('../Utils');

module.exports = {
	retrieve: function (id, callback) {
		var self = this;

		return new Promise(function (resolve, reject) {
			utils.validateCallback(callback);

			var clientObj = client.getInstance();
			var path = self.resourcePath + '/' + id;

			clientObj.getHttp(path, {}, function (error, response) {
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
