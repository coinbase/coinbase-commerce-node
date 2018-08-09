'use strict';

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
var Charge = coinbase.resources.Charge;

Client.init('YOUR_API_KEY');

var firstChargeObj = new Charge({
	"description": "Mastering the Transition to the Information Age",
	"metadata": {
		"customer_id": "id_1005",
		"customer_name": "Satoshi Nakamoto"
	},
	"name": "Test Name",
	"payments": [],
	"pricing_type": "no_price"
});

var secondChargeObj = new Charge({
	"description": "Mastering the Transition to the Information Age",
	"metadata": {
		"customer_id": "id_1005",
		"customer_name": "Satoshi Nakamoto"
	},
	"name": "Test Name",
	"payments": [],
	"pricing_type": "no_price"
});

// Try create and update created charge. Process result as regular callback
firstChargeObj.save(function (error, response) {
	console.log('Created charge(callback)');
	console.log(response);
	console.log(error);

	if (response && response.id) {
		Charge.retrieve(response.id, function (error, response) {
			console.log('Retrived charge(callback)');
			console.log(response);
			console.log(error);
		});
	}
});

// Try create and retrieve created charge. Process result as promise
secondChargeObj.save().then(function (response) {
	console.log('Created charge(promise)');
	console.log(response);

	if (response && response.id) {
		return Charge.retrieve(response.id);
	}
}).then(function (response) {
	console.log('Retrieved charge(promise)');
	console.log(response);
}).catch(function (error) {
	console.log(error);
});
