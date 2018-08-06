'use strict';

var Promise = require('promise'),
	client = require('../Client'),
	utils = require('../Utils');

module.exports = {
	delete: function (callback) {
		var self = this;

		return new Promise(function (resolve, reject) {
			utils.validateCallback(callback);

			var id = self[self.constructor.primaryKeyProp];

			if (!id) {
				throw new Error(self.constructor.primaryKeyProp + ' is not set');
			}

			var clientObj = client.getInstance();
			var path = self.constructor.resourcePath + '/' + id;

			clientObj.deleteHttp(path, function (error) {
				if (error) {
					return callback ? callback(error) : reject(error);
				}

				self.clearAllProps();

				return callback ? callback(null, self) : resolve(self);
			});
		});
	}
};

