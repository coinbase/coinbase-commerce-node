'use strict';

var createResource = require('../ApiResource').createResource,
	ApiResource = require('../ApiResource').ApiResource;

function Checkout(data) {

	if (!(this instanceof Checkout)) {
		return new Checkout(data);
	}

	ApiResource.call(this, data);
}

createResource(Checkout, {
	resourcePath: 'checkouts',
	crudMethods: ['create', 'read', 'update', 'delete']
});

module.exports = Checkout;
