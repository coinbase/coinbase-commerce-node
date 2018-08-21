/*eslint no-console: 0 */

'use strict';

function ApiResponse(response) {
	if (response) {
		this.body = response.body;
		this.code = response.statusCode;
		this.headers = response.headers;
		this.data = response.body ? JSON.parse(response.body) : response.body;
		this.requestId = response.headers && response.headers['x-request-id'];
		this.proceedWarnings();
	}
}

ApiResponse.prototype.proceedWarnings = function () {
	var warnings = this.data && this.data.warnings || [];

	warnings.forEach(function (warning) {
		console.warn(warning);
	});
};

module.exports = ApiResponse;
