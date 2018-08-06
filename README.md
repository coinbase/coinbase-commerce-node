[![CircleCI](https://circleci.com/gh/adobrzhansky/coinbase-commerce-node.svg?style=svg)](https://circleci.com/gh/adobrzhansky/coinbase-commerce-node)
# Coinbase Commerse

The official Node.js library for the [Coinbase Commerse API](https://commerce.coinbase.com/docs/).

# Table of contents

<!--ts-->
   * [Node.js Versions](#node.js-version)
   * [Documentation](#documentation)
   * [Installation](#installation)
   * [Usage](#usage)
      * [Checkouts](#checkouts)
      * [Charges](#charges)
      * [Events](#events)
      * [Webhooks](#webhooks)
   * [Testing and Contributing](#testing-and-contributing)
<!--te-->

## Node.js versions
Node.js v0.10.48 and above are supported and tested.

## Documentation
For more details visit [Coinbase API docs](https://commerce.coinbase.com/docs/api/).

To start using library, you need to register on [Commerce SignUp](https://commerce.coinbase.com/signup).
And get your ``API_KEY`` from user settings.

Next init a ``Client`` for interacting with the API. Method accepts 4 params apiKey, baseUrl, apiVersion, timeout only apikey is mandatory.
You can set params later as in example:
``` js
var coinbase = require('coinbase-commerse-node');
var Client = coinbase.Client;

var clientObj = Client.init('API_KEY');
clientObj.setTimeout(3000);
```

You can call ``list, all, create, retrieve, updateById, deleteById`` methods from an API resource classes as well as ``save, delete, insert, update`` methods from API resource class instances.

Each API method returns an ``ApiResource`` which representing the JSON response from the API.
Also when the response data is parsed into objects, the appropriate ``ApiResource`` subclasses will be used automatically.

Client support Common API Errors and Warnings handling.
All errors occuring during interaction with the API will be raised as exceptions.


| Error                    | Status Code |
|--------------------------|-------------|
| APIError                 |      *      |   
| InvalidRequestError      |     400     |   
| ParamRequiredError       |     400     |  
| ValidationError          |     400     |  
| AuthenticationError      |     401     |  
| ResourceNotFoundError    |     404     |
| RateLimitExceededError   |     429     |
| InternalServerError      |     500     |
| ServiceUnavailableError  |     503     |

## Installation

Install with ``npm``:
``` sh
npm install coinbase-commerce --save
```
## Usage
``` js
var coinbase = require('coinbase-commerse-node');
var Client = coinbase.Client;

Client.init('API_KEY');
```
## Checkouts 
[Checkouts API docs](https://commerce.coinbase.com/docs/api/#checkouts)
More examples how to use charges in the [`examples/resources/checkout.js`](examples/resources/checkout.js) file

### Load checkout resource class
``` js
var coinbase = require('coinbase-commerce-node');
var Checkout = coinbase.resources.Checkout;
```
### Retrieve
``` js
Checkout.retrieve(<checkout_id>, function (error, callback) {
  console.log(error);
  console.log(callback);
});
```
### Create
``` js
var checkoutData = {
    'name': 'The Sovereign Individual',
    'description': 'Mastering the Transition to the Information Age',
    'pricing_type': 'fixed_price',
    'local_price': {
        'amount': '100.00',
        'currency': 'USD'
    },
    'requested_info': ['name', 'email']
};
Checkout.create(checkoutData, function (error, callback) {
  console.log(error);
  console.log(callback);
});

// or

var checkoutObj = new Checkout();

checkoutObj.name = 'The Sovereign Individual';
checkoutObj.description = 'Mastering the Transition to the Information Age';
checkoutObj.pricing_type = 'fixed_price';
checkoutObj.local_price = {
    'amount': '100.00',
    'currency': 'USD'
};
checkoutObj.requested_info = ['name', 'email'];

checkoutObj.save(function (error, callback) {
  console.log(error);
  console.log(callback);
});
```
### Update
``` js
var checkoutObj = new Checkout();

checkoutObj.id = <checkout_id>;
checkoutObj.name = 'new name';

checkoutObj.save(function (error, response) {
  console.log(error);
  console.log(response);
});
// or
var newParams = {
    'name': 'New name'
};

Checkout.updateById(<checkout_id>, newParams, function (error, response) {
  console.log(error);
  console.log(response);
});
```
### Delete
``` js
var checkoutObj = new Checkout();

checkoutObj.id = <checkout_id>;
checkoutObj.delete(function (error, response) {
 console.log(error);
 console.log(response);
});

// or

Checkout.deleteById(<checkout_id>, function (error, response) {
 console.log(error);
 console.log(response);  
});
```
### List
``` js
var params = {
    'limit': 2,
    'order': 'desc'
};

Checkout.list(params, function (error, list, pagination) {
  console.log(error);
  console.log(list);
  console.log(pagination);
});
```
### Get all checkouts
``` js
var params = {
    'order': 'desc'  
};

Checkout.all(params, function (error, list) {
  console.log(error);
  console.log(list);
});

```
## Charges
[Charges API docs](https://commerce.coinbase.com/docs/api/#charges)
More examples how to use charges in the [`examples/resources/charge.js`](examples/resources/charge.js) file

### Load charge resource class
``` js
var coinbase = require('coinbase-commerce-node');
var Charge = coinbase.resources.Charge;
```
### Retrieve
``` js
Charge.retrieve(<charge_id>, function (error, response) {
  console.log(error);
  console.log(response);
});
```
### Create
``` js
var chargeData = {
    'name': 'The Sovereign Individual',
    'description': 'Mastering the Transition to the Information Age',
    'local_price': {
        'amount': '100.00',
        'currency': 'USD'
    },
    'pricing_type': 'fixed_price'

}
Charge.create(chargeData, function (error, response) {
  console.log(error);
  console.log(response);
});

// or
var chargeObj = new Charge();

chargeObj.name = 'The Sovereign Individual';
chargeObj.description = 'Mastering the Transition to the Information Age';
chargeObj.local_price = {
    'amount': '100.00',
    'currency': 'USD'
};
chargeObj.pricing_type = 'fixed_price';
chargeObj.save(function (error, response) {
  console.log(error);
  console.log(response);
});
```
### List
``` js
Charge.list({}, function (error, list, pagination) {
  console.log(error);
  console.log(list);
  console.log(pagination);
});
```
### Get all changes
``` js
Charge.all({}, function (error, list) {
  console.log(error);
  console.log(list);
});
```
## Events
[Events API Docs](https://commerce.coinbase.com/docs/api/#events)
More examples how to use charges in the [`examples/resources/event.js`](examples/resources/event.js) file

### Load event resource class
``` js
var coinbase = require('coinbase-commerce-node');
var Event = coinbase.resources.Event;
```
### Retrieve
``` js
Event.retrieve(<event_id>, function (error, response) {
    console.log(error);
    console.log(response);
});
```
### List
``` js
Event.list({}, function (error, list, pagination) {
  console.log(error);
  console.log(list);
  console.log(pagination);
});
```
### Get all events
``` js
Event.all({}, function (error, list) {
  console.log(error);
  console.log(list);
});
```
## Using Promises

Every method returns a promise. You can use promise instead of callback

``` js
// Try create and retrieve created charge
var chargeObj = new Charge({
    'description': 'Mastering the Transition to the Information Age',
    'metadata': {
        'customer_id': 'id_1005',
        'customer_name': 'Satoshi Nakamoto'
    },
    'name': 'Test Name',
    'payments': [],
    'pricing_type': 'no_price'
});

chargeObj.save().then(function (response) {
    console.log('Created charge(promise)');
    console.log(response);

    if (response && response.id) {
        return Charge.retrieve(response.id);
    }
}).then(function (response) {
    console.log('Retrieved charge(promise)');
    console.log(response);
}).catch(function (error) {
    console.log('Unable to retrieve charge(promise)');
    console.log(error);
});
```

## Webhooks
Coinbase Commerce signs the webhook events it sends to your endpoint, allowing you to validate that they were not sent by a third-party.
You can find a simple example of how to use this with Express in the [`examples/webhook`](examples/webhook) folder
### Verify Signature header
``` js
var  isVerified = Webhook.verifyWebhookSignature(signature, body, sharedSecret)
```

### Testing and Contributing
Any and all contributions are welcome! The process is simple: fork this repo, make your changes, run the test suite, and submit a pull request. To run the tests, clone the repository and then run all tests:

``` sh
npm install
npm run test
```

License
----

MIT