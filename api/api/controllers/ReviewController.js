/**
 * ReviewController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	 _config: {
	    actions: false,
	    shortcuts: false,
	    rest: false
	  },

	read: function(req, res) {
  		
  		var productId = req.param("productId");

  		return Review.all(productId).then(function(result) {
			
			 res.send(result);
		}).catch(function(error) {
				//res.status(500);
				res.send(Utils.parseError(error));
			
		});

  	},
	  
	post: function(req,res) {
		
		
	    var object = {
			productId : req.param("productId"),
			username : req.param("username"),
			comment : req.param("comment"),
			rating : req.param("rating") || 0
		}
		
		return Review.post(object).then(function(result) {
			
			 res.send(result);
		}).catch(function(error) {
				//res.status(500);
				res.send(Utils.parseError(error));
			
		});
		
	}
  	
};

