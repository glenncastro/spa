/*
 * cache.js - Redis cache implementation
*/

/*jslint          node: true,          continue: true,
  devel: true,    indent: 2,           maxerr: 50,
  newcap: true,   nomen: true,         plusplus: true,
  regex: true,    sloppy: true,        vars: false,
  white: true
*/
/*global */

//---------------------------- BEGIN MODULE SCOPE VARIABLES ----------------------------
'use strict';
var
	redisDriver = require('redis'),
	redisClient = redisDriver.createClient(),
	makeString, deleteKey, getValue, setValue;
//---------------------------- END MODULE SCOPE VARIABLES ----------------------------

//---------------------------- BEGIN PUBLIC METHODS ----------------------------
deleteKey = function(key) {};

getValue = function(key, hit_callback, miss_callback) {};

setValue = function(key, value) {};

module.exports = {
	deleteKey: deleteKey,
	getValue: getValue,
	setValue: setValue
};
//---------------------------- END PUBLIC METHODS ----------------------------