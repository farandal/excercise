/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Promise = require('bluebird');
var validator = require('node-validator');

module.exports = {

  attributes: {

  },

  validate: function(object) {

  	return new Promise(function(resolve, reject) {

		var check = validator.isObject()
		  .withRequired('brandId', validator.isNumber())
		  .withRequired('userId', validator.isNumber())
		  .withRequired('name', validator.isString());
		 
		validator.run(check, object, function(errorCount, errors) {
		
			if(errorCount === 0) {
				resolve(true);
			} else {
				reject(errors);
			}

		});

	});

  },

  read: function(opts) {

  		return new Promise(function(resolve, reject) {

				if(!opts || !opts.productId) {
					var err = new Error();
					err.message("Missing Product Id");
					reject(err,null);
				}

				var query = "SELECT  \
								Product.id,  \
								Product.name,  \
								Product.description,  \
								Brand.name as brand  \
							FROM Product  \
							LEFT JOIN Brand ON Product.idBrand = Brand.id  \
							WHERE Product.id = "+opts.productId+";";

				sails.log.info(query);
				
				Product.query(query, function(err, results) {
					  if (err) {
					  	reject(err);
					  }
					  resolve(results);
					});
			});

  },

  create: function(productObj) {

  			return new Promise(function(resolve, reject) {

				if(!productObj || !productObj.productId) {
					var err = new Error();
					err.message("Missing Product Id");
					reject(err,null);
				}

				var query = "INSERT INTO Product (  \
								idBrand,  \
								idUser,  \
								name,  \
								description,  \
								price,  \
								colour,  \
								colourcode,  \
								availability) VALUES";
				
				query += "("+productObj.brandId+", "+productObj.userId+", "+productObj.name+", '"+productObj.description+"', "+productObj.price+", '"+productObj.colour+"', '"+productObj.colourcode+"','"+productObj.availability+"');"

				
				sails.log.info(query);
				
				Product.query(query, function(err, results) {
					  if (err) {
					  	reject(err);
					  }
					  resolve(results);
					});
			});

  },

  update: function(productObj) {

  			return new Promise(function(resolve, reject) {

				if(!productObj || !productObj.productId) {
					var err = new Error();
					err.message("Missing Product Id");
					reject(err,null);
				}

				var query = "UPDATE Product SET  \
							idBrand = "+productObj.brandId+",  \
							idUser = "+productObj.userId+",  \
							name = '"+productObj.name+"',  \
							description = '"+productObj.description+"',  \
							price = "+productObj.price+",  \
							colour = '"+productObj.colour+"',  \
							colourcode = '"+productObj.colourcode+"',  \
							availability = '"+productObj.availability+"',  \
							WHERE id = "+productObj.productId;
				
				sails.log.info(query);
				
				Product.query(query, function(err, results) {
					  if (err) {
					  	reject(err);
					  }
					  resolve(results);
					});
			});

  },

  delete: function(productId) {

  			return new Promise(function(resolve, reject) {

				if(!productId) {
					var err = new Error();
					err.message("Missing Product Id");
					reject(err,null);
				}

				var query = "DELETE FROM Product WHERE id = "+productId;
				
				sails.log.info(query);
				
				Product.query(query, function(err, results) {
					  if (err) {
					  	reject(err);
					  }
					  resolve(results);
					});
			});

  },


  search: function(opts) {

			return new Promise(function(resolve, reject) {

				if(!opts) {
					var err = new Error();
					err.message("Options not defined");
					reject(err,null);
				}

				if(!opts.limit) { opts.limit = 10; }
				if(!opts.page) { opts.page = 0; }
				if(!opts.filter) { opts.filter = "createdAt"; }
				if(!opts.order) { opts.order = "DESC"; }
				//if(!opts.active) { opts.active = 1; }
				
				var where = "";
				
				if(opts.brandId) {
					where = " WHERE idBrand = "+opts.brandId;
				}

				var query = "SELECT  \
								Product.id,  \
								Product.name,  \
								Product.description,  \
								Brand.name as brand  \
							FROM Product  \
							LEFT JOIN Brand ON Product.idBrand = Brand.id  \
							"+where+"  \
							ORDER BY "+opts.filter+" "+opts.order+"  \
							LIMIT "+opts.page+","+opts.limit+";";

				sails.log.info(query);
				
				Product.query(query, function(err, results) {
					  if (err) {
					  	reject(err);
					  }
					  resolve(results);
					});
			});

	}

};

