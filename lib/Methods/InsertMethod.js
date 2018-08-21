'use strict';

var Promise = require('promise'),
	client = require('../Client'),
	utils = require('../Utils');

module.exports = {
	insert: function (callback) {
		var self = this;

		return new Promise(function (resolve, reject) {

			utils.validateCallback(callback);

			var path = self.constructor.resourcePath;
			var clientObj = client.getInstance();
			var data = self.getProps();
			var id = data[self.constructor.primaryKeyProp];

			if (id) {
				throw new Error(self.constructor.name + ' was already added you can not insert it again.');
			}

			clientObj.postHttp(path, data, function (error, response) {
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
