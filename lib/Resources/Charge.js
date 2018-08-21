'use strict';

var createResource = require('../ApiResource').createResource,
	ApiResource = require('../ApiResource').ApiResource;

function Charge(data) {

	if (!(this instanceof Charge)) {
		return new Charge(data);
	}

	ApiResource.call(this, data);
}

createResource(Charge, {
	resourcePath: 'charges',
	crudMethods: ['create', 'read']
});

module.exports = Charge;
