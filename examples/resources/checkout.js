'use strict';

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
var Checkout = coinbase.resources.Checkout;

Client.init('YOUR_API_KEY');

// Try to create checkout via Checkout resource create method
Checkout.create({
	'description': 'Mastering the Transition to the Information Age',
	'local_price': {
		'amount': '1.00',
		'currency': 'USD'
	},
	'name': 'test item 15 edited',
	'pricing_type': 'fixed_price',
	'requested_info': ['email']
}, function (error, response) {
	console.log('Created checkout via create method');
	console.log(response);
	console.log(error);

	if (response && response.id) {
		// Try to update created checkout
		Checkout.updateById(response.id, {'name': 'new name'}, function (error, response) {

			console.log('Updated checkout with id ' + response.id);
			console.log(error);
			console.log(response);
		});
	}
});

// Try to create checkout via Checkout object save method
var checkoutObj = new Checkout();

checkoutObj.name = 'test name';
checkoutObj.description = 'test description';
checkoutObj.pricing_type = 'fixed_price';
checkoutObj.requested_info = ['email'];
checkoutObj.local_price = {
	'amount': '100.00',
	'currency': 'USD'
};

checkoutObj.save(function (error, response) {
	console.log('Created checkout via save method');
	console.log(error);
	console.log(response);

	if (response && response.id) {
		var id = response.id;
		// Try to delete created checkout
		Checkout.deleteById(response.id, function (error, response) {
			console.log('Deleted checkout with id ' + id);
			console.log(error);
			console.log(response);
		});
	}
});

// Get list of checkouts
Checkout.list({order: 'asc', limit: 2}, function (error, list, pagination) {
	console.log(list);
	console.log(pagination);
	console.log(error);
});

// Get all checkouts
Checkout.all({order: 'asc'}, function (error, list) {
	console.log(list);
	console.log(error);
});
