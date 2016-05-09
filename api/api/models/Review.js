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
					  			var error = new Error();
									error.message = err.code;
									reject(error);
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
					  			var error = new Error();
									error.message = err.code;
									reject(error);
					  }
					  resolve(results);
					});
			});

  },

  post: function(reviewObject) {
			
		return new Promise(function(resolve, reject) {
				
				var err = new Error();
				if(!reviewObject.productId) {
					err.message = "Missing Product Id";
					reject(err);
					return;
				}
			
				var regexp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
			
				 if (!regexp.test(reviewObject.username)) {
					 	err.message = "Invalid Email";
						reject(err);
						return;
				 }
 
					Review.query("SELECT id,email From User WHERE email LIKE '"+reviewObject.username+"';", function(err, user) {
					  var userId = 3; //Fixed for annonymous user ID, for any email that do not match with users.
						
						if(user && user[0]) {
						 	userId = user[0].id;
						}
						
						var query = "INSERT INTO Review (idProduct,idUser,comment,rating) VALUES ("+reviewObject.productId+",'"+userId+"','"+reviewObject.comment+"',"+reviewObject.rating+");"
						sails.log.info(query);
						
						Review.query(query, function(err, results) {
								if (err) {
									sails.log.error(err.code);
									var error = new Error();
									error.message = err.code;
									reject(error);
								
								}
								resolve(results);
							});
					});
						
						
					});

				

	}

};
