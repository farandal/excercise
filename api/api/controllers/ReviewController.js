/**
 * ReviewController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	read: function(req, res) {
  		
  		var productId = req.param("productId");

  		return Review.all(productId).then(function(error,result) {
			if(error) {
				return res.send(error);
			}
			return res.send(result);
		});

  	},

	
};

