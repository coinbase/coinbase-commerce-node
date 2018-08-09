'use strict';

var Promise = require('promise'),
	client = require('../Client'),
	utils = require('../Utils');

module.exports = {
	updateById: function (id, data, callback) {
		var self = this;

		return new Promise(function (resolve, reject) {

			utils.validateCallback(callback);

			if (!id) {
				throw new Error(this.constructor.primaryKeyProp + ' is not set');
			}

			var clientObj = client.getInstance();
			var path = self.resourcePath + '/' + id;

			clientObj.putHttp(path, data, function (error, response) {
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
