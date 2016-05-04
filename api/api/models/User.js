/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Promise = require('bluebird');

module.exports = {

  //@farandal: 
  //No ORM Model functionality is implemented for this exercise.
  //Only Sails.Model.query() to perform SQL commands.
  //No model attributes are defined either.

  attributes: {

  	  

  },

  //CRUD Methods API

   count: function(opts,cb) {

			return new Promise(function(resolve, reject) {

				if(!opts) {
					var err = new Error();
					err.message("Options not defined");
					reject(err,null);
				}

				if(!opts.active) { opts.active = 1; }

				//User.query("SELECT count(*) FROM User where active = ?", [ opts.active ], function(err, results) {
				User.query("SELECT count(*) FROM User ", function(err, results) {
					  if (err) {
					  	reject(err);
					  }
					  resolve(results);
					});
			});

	}

};

