SPA.storage = (function() {

	var generateKey = function(key) {
		var date = new Date(),
			datekey = new String()
				+ date.getYear()
				+ date.getMonth()
				+ date.getDay();
		return key + datekey;
	};

	return {
		'set': function(key, value) {
			sessionStorage.setItem(generateKey(key), value);
		},

		'get': function(key) {
			return sessionStorage.getItem(generateKey(key));
		},

		'remove': function(key) {
			sessionStorage.removeItem(generateKey(key));
		},

		'clear': function() {
			sessionStorage.clear();
		}
	}
}());