'use strict';

var _ = require('lodash'),
	ApiResponse = require('./ApiResponse');

var utils = module.exports = {

	convertToApiObject: function (response) {
		var resourceClass;

		function getClass() {
			var resource = response && response.resource;

			return resource && utils.getResourceClassByName(resource);
		}

		if (response instanceof ApiResponse) {
			response = response.data.data;
		}

		if (_.isArray(response)) {
			response.forEach(function (item, index, array) {
				array[index] = utils.convertToApiObject(item);
			});
		}

		resourceClass = getClass();
		if (_.isPlainObject(response) && resourceClass) {
			return new resourceClass(response);
		}

		return response;
	},

	getResourceClassByName: function (name) {
		if (!this.resourceMap) {
			this.resourceMap = {
				charge: require('./Resources/Charge'),
				checkout: require('./Resources/Checkout'),
				event: require('./Resources/Event')
			};
		}

		return this.resourceMap[name.toLocaleLowerCase()];
	},
	assignStatic: function () {
		var args = [].slice.call(arguments);
		var extendable;

		if (args.length < 2) {
			throw new Error('Please provide more then two classes in function\'s arguments');
		}

		extendable = args.shift();

		args.forEach(function (mixin) {
			for (var property in mixin) {
				if (mixin.hasOwnProperty(property)) {
					extendable[property] = mixin[property];
				}
			}
		});
	},
	extend: function (Child, Parent) {
		var F = function () {
		};

		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.superclass = Parent.prototype;
	},
	validateCallback: function (callback) {
		if (typeof callback !== 'undefined' && !_.isFunction(callback)) {
			throw new TypeError('Please provide correct callback function.');
		}
	}
};
