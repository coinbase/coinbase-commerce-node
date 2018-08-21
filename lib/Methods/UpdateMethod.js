'use strict';

var Promise = require('promise'),
	client = require('../Client'),
	utils = require('../Utils');

module.exports = {
	update: function (callback) {
		var self = this;

		return new Promise(function (resolve, reject) {

			utils.validateCallback(callback);

			var clientObj = client.getInstance();
			var data = self.getDirtyProps();
			var id = self[self.constructor.primaryKeyProp];
			var path = self.constructor.resourcePath + '/' + id;

			delete data[self.constructor.primaryKeyProp];

			clientObj.putHttp(path, data, function (error, response) {
				if (error) {
					if (callback) {
						callback(error);
					}

					return reject(error);
				}

				self.refreshFrom(response.data.data);

				if (callback) {
					callback(null, self);
				}

				return resolve(self);
			});
		});
	}
};
