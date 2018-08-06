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
			var data = self.getProps();
			var id = data[self.constructor.primaryKeyProp];
			var path = self.constructor.resourcePath + '/' + id;

			delete data[self.constructor.primaryKeyProp];

			clientObj.putHttp(path, data, function (error, response) {
				if (error) {
					return callback ? callback(error) : reject(error);
				}

				self.refreshFrom(response.data.data);

				return callback ? callback(null, self) : resolve(self);
			});
		});
	}
};
