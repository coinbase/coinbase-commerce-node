[![CircleCI](https://circleci.com/gh/coinbase/coinbase-commerce-node.svg?style=svg)](https://circleci.com/gh/coinbase/coinbase-commerce-node)
# Coinbase Commerce

The official Node.js library for the [Coinbase Commerce API](https://commerce.coinbase.com/docs/).

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
Node.js v0.10.48 and above are supported.

## Documentation
For more details visit [Coinbase API docs](https://commerce.coinbase.com/docs/api/).

To start using this library register an account on [Coinbase Commerce](https://commerce.coinbase.com/signup).
You will find your ``API_KEY`` from User Settings.

Next initialize a ``Client`` for interacting with the API. The only required parameter to initialize a client is ``apiKey``, however, you can also pass in ``baseUrl``, ``apiVersion``  and ``timeout``.
Parameters can be also be set post-initialization:
``` js
var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;

var clientObj = Client.init('API_KEY');
clientObj.setRequestTimeout(3000);
```

The API resource class provides the following static methods: ``list, all, create, retrieve, updateById, deleteById``.  Additionally, the API resource class also provides the following instance methods: ``save, delete, insert, update``.

Each API method returns an ``ApiResource`` which represents the JSON response from the API.
When the response data is parsed into objects, the appropriate ``ApiResource`` subclass will automatically be used.

Client supports the handling of common API errors and warnings.
All errors that occur during any interaction with the API will be raised as exceptions.


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
npm install coinbase-commerce-node --save
```

Type definitions are available for TypeScript users:
```sh
npm install @types/coinbase-commerce-node --save-dev
```
## Usage
``` js
var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;

Client.init('API_KEY');
```
## Checkouts 
[Checkouts API docs](https://commerce.coinbase.com/docs/api/#checkouts)
More examples on how to use checkouts can be found in the [`examples/resources/checkout.js`](examples/resources/checkout.js) file

### Load checkout resource class
``` js
var coinbase = require('coinbase-commerce-node');
var Checkout = coinbase.resources.Checkout;
```
### Retrieve
``` js
Checkout.retrieve(<checkout_id>, function (error, response) {
  console.log(error);
  console.log(response);
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
Checkout.create(checkoutData, function (error, response) {
  console.log(error);
  console.log(response);
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

checkoutObj.save(function (error, response) {
  console.log(error);
  console.log(response);
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
More examples on how to use charges can be found in the [`examples/resources/charge.js`](examples/resources/charge.js) file

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
More examples on how to use events can be found in the [`examples/resources/event.js`](examples/resources/event.js) file

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

In addition to using callbacks, every method also return a promise.
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
Coinbase Commerce signs the webhook events it sends to your endpoint, allowing you to validate and verify that they weren't sent by someone else.
You can find a simple example of how to use this with Express in the [`examples/webhook`](examples/webhook) folder
### Verify Signature header
``` js
var Webhook = require('coinbase-commerce-node').Webhook;

try {
    Webhook.verifySigHeader(rawBody, signature, sharedSecret);
    console.log('Successfully verified');
} catch(error) {
    console.log('Failed');
    console.log(error);
}
```

### Testing and Contributing
Any and all contributions are welcome! The process is simple: fork this repo, make your changes, run the test suite, and submit a pull request. To run the tests, clone the repository and run the following commands:

``` sh
npm install
npm run test
```

License
----

MIT
