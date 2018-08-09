'use strict';

/**
 * To run this example please read README.md file
 */
var Express = require('express');
var Webhook = require('coinbase-commerce-node').Webhook;
/**
 * Past your webhook secret from Settings/Webhook section
 */
var webhookSecret = 'YOUR_WEBHOOK';
var router = Express.Router();
var app = Express();

function rawBody(req, res, next) {
	req.setEncoding('utf8');

	var data = '';

	req.on('data', function (chunk) {
		data += chunk;
	});

	req.on('end', function () {
		req.rawBody = data;

		next();
	});
}

router.post('/', function (request, response) {
	var event;

	console.log(request.headers);

	try {
		event = Webhook.verifyEventBody(
			request.rawBody,
			request.headers['x-cc-webhook-signature'],
			webhookSecret
		);
	} catch (error) {
		console.log('Error occured', error.message);

		return response.status(400).send('Webhook Error:' + error.message);
	}

	console.log('Success', event.id);

	response.status(200).send('Signed Webhook Received: ' + event.id);
});

app.use(rawBody);
app.use(router);
app.listen(3000, function () {
	console.log('App listening on port 3000!');
});
