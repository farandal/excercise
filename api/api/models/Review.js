/**
 * Review.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  },

  last: function(productId) {

  		return new Promise(function(resolve, reject) {

				if(!productId) {
					var err = new Error();
					err.message("Missing Product Id");
					reject(err);
				}

				var query = "SELECT \
								  Review.idProduct AS productId, \
								  USER.name AS username, \
								  Review.comment, \
								  Review.rating \
								FROM \
								  Review \
								LEFT JOIN USER \
								ON \
								  USER.id = Review.idUser \
								WHERE \
								  Review.idProduct = "+productId+" \
								ORDER BY createdAt DESC LIMIT 0,1;";

				sails.log.info(query);
				
				Review.query(query, function(err, results) {
					  if (err) {
					  	sails.log.error(err.code);
					  	reject(err.code);
					  }
					  resolve(results);
					});
			});

  },

  all: function(productId) {

  		return new Promise(function(resolve, reject) {

				if(!productId) {
					var err = new Error();
					err.message("Missing Product Id");
					reject(err);
				}

				var query = "SELECT \
								  Review.idProduct AS productId, \
								  USER.name AS username, \
								  Review.comment, \
								  Review.rating \
								FROM \
								  Review \
								LEFT JOIN USER \
								ON \
								  USER.id = Review.idUser \
								WHERE \
								  Review.idProduct = "+productId;
					

				sails.log.info(query);
				
				Review.query(query, function(err, results) {
					  if (err) {
					  		sails.log.error(err.code);
					  	reject(err.code);
					  }
					  resolve(results);
					});
			});

  },

  post: function(reviewObject) {
			
		return new Promise(function(resolve, reject) {

				if(!reviewObject.productId) {
					var err = new Error();
					err.message("Missing Product Id");
					reject(err);
				}

				var query = "INSERT INTO Review (idProduct,idUser,comment,rating) VALUES ("+reviewObject.productId+",'"+reviewObject.username+"','"+reviewObject.comment+"',"+reviewObject.rating+");"
					
				sails.log.info(query);
				
				Review.query(query, function(err, results) {
					  if (err) {
							sails.log.error(err.code);
					  	reject(err.code);
					  }
					  resolve(results);
					});
			});

	}

};
