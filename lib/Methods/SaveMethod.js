'use strict';

module.exports = {
	save: function (callback) {
		var data = this.getProps();
		var id = data[this.constructor.primaryKeyProp];

		if (id && !this.update) {
			throw new Error(this.constructor.name + ' can not be updated.');
		}

		if (id) {
			return this.update(callback);
		} else {
			return this.insert(callback);
		}
	}
};
