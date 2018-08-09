'use strict';

var createResource = require('../ApiResource').createResource,
	ApiResource = require('../ApiResource').ApiResource;

function Event(data) {

	if (!(this instanceof Event)) {
		return new Event(data);
	}

	ApiResource.call(this, data);
}

createResource(Event, {
	resourcePath: 'events',
	crudMethods: ['read']
});

module.exports = Event;
