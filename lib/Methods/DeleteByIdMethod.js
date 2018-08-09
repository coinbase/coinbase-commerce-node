'use strict';

var Promise = require('promise'),
	client = require('../Client'),
	utils = require('../Utils');

module.exports = {
	deleteById: function (id, callback) {
		var self = this;

		return new Promise(function (resolve, reject) {

			utils.validateCallback(callback);

			if (!id) {
				throw new Error(this.constructor.primaryKeyProp + ' is not set');
			}

			var clientObj = client.getInstance();
			var path = self.resourcePath + '/' + id;

			clientObj.deleteHttp(path, function (error) {
				if (error) {
					if (callback) {
						callback(error);
					}

					return reject(error);
				}

				var resourceObj = new self();

				if (callback) {
					callback(null, resourceObj);
				}

				return resolve(resourceObj);
			});
		});
	}
};
