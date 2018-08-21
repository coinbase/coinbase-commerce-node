'use strict';

var assign = require('object-assign'),
	_ = require('lodash'),
	utils = require('./Utils');

function ApiResource(data) {

	if (!(this instanceof ApiResource)) {
		return new ApiResource(data);
	}

	data = data || {};

	Object.defineProperty(this, 'initialData', {
		value: Object.create(null),
		writable: false,
		enumerable: false,
		configurable: false
	});

	this.refreshFrom(data);
}

ApiResource.prototype.clearAllProps = function () {
	var self = this;

	Object.keys(this.initialData).forEach(function (prop) {
		delete self.initialData[prop];
	});

	for (var key in this.getProps()) {
		delete this[key];
	}
};

ApiResource.prototype.refreshFrom = function (data) {
	this.clearAllProps();

	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			this[key] = utils.convertToApiObject(data[key]);
			this.initialData[key] = _.cloneDeep(this[key]);
		}
	}
};

ApiResource.prototype.getIgnoreProps = function () {
	return ['initialData'];
};

ApiResource.prototype.getProps = function () {
	var self = this;
	var props = {};
	var ignoreProps = this.getIgnoreProps();

	Object.getOwnPropertyNames(this).forEach(function (key) {
		if (ignoreProps.indexOf(key) === -1 && !_.isFunction(self[key])) {
			props[key] = _.cloneDeep(self[key]);
		}
	});

	return props;
};

ApiResource.prototype.getDirtyProps = function () {
	var self = this;
	var props = {};
	var ignoreProps = this.getIgnoreProps();

	Object.getOwnPropertyNames(this).forEach(function (key) {
		if (ignoreProps.indexOf(key) === -1 && !_.isFunction(self[key]) && !_.isEqual(self.initialData[key], self[key])) {
			props[key] = _.cloneDeep(self[key]);
		}
	});

	return props;
};

var mapCrudToMethods = {
	create: [
		{
			method: require('./Methods/CreateMethod'),
			static: true
		},
		{
			method: require('./Methods/InsertMethod'),
			static: false
		},
		{
			method: require('./Methods/SaveMethod'),
			static: false
		}
	],
	read: [
		{
			method: require('./Methods/RetrieveMethod'),
			static: true
		},
		{
			method: require('./Methods/ListMethod'),
			static: true
		}
	],
	update: [
		{
			method: require('./Methods/UpdateByIdMethod'),
			static: true
		},
		{
			method: require('./Methods/UpdateMethod'),
			static: false
		},
		{
			method: require('./Methods/SaveMethod'),
			static: false
		}
	],
	delete: [
		{
			method: require('./Methods/DeleteByIdMethod'),
			static: true
		},
		{
			method: require('./Methods/DeleteMethod'),
			static: false
		}
	]
};

function assignMethodsByCrud(extendable, cruds) {
	cruds.forEach(function (crud) {
		var crudArray = mapCrudToMethods[crud];

		crudArray.forEach(function (methodObj) {
			if (methodObj.static) {
				utils.assignStatic(extendable, methodObj.method);
			} else {
				assign(extendable.prototype, methodObj.method);
			}
		});
	});
}

function createResource(resource, config) {
	if (!config.resourcePath) {
		throw new Error('Please provide resourcePath for resource class.');
	}

	resource.resourcePath = config.resourcePath;
	resource.primaryKeyProp = config.primaryKeyProp || 'id';
	resource.prototype = Object.create(ApiResource.prototype);
	resource.prototype.constructor = resource;

	if (config.crudMethods && Array.isArray(config.crudMethods)) {
		assignMethodsByCrud(resource, config.crudMethods);
	}
}

module.exports = {
	ApiResource: ApiResource,
	createResource: createResource
};
