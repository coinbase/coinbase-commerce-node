'use strict';

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
var Event = coinbase.resources.Event;

Client.init('YOUR_API_KEY');

// Get list of events. Process result as callback
Event.list({limit: 5}, function (error, list, pagination) {
	console.log('list of events(callback)');
	console.log(list);
	console.log(pagination);
	console.log(error);
});

// Get list of events. Process result as promise
Event.list({limit: 5}).then(function (result) {
	console.log('list of events(promise)');
	// List of Events
	console.log(result[0]);
	// Pagination
	console.log(result[1]);
}, function (error) {
	console.log(error);
});