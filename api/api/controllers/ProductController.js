/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/*
  		As any user, I want to call a web service to find the latest Products, so I can display them. 
		Acceptance Criteria:
			1.     Returns the 10 newest products. 
			2.     For each product, needs to include the Product ID, Name, Description, Brand Name and the most recent Review for this product (including the User Name and Review Summary).
			3.     Accepts an optional Brand ID parameter to filter the results. If a Brand ID provided, returns only products for that brand.
	*/

	 _config: {
	    actions: false,
	    shortcuts: false,
	    rest: false
	  },
	
	newest: function (req, res) {
		
		return Product.search({limit:"10"}).then(function(result) {
			 res.send(result);
		}).catch(function(error) {
			 res.send(Utils.parseError(error));
		});

  	},

  	brand: function (req, res) {

  		var brandId = req.param("brandId");

		return Product.search({brandId:brandId}).then(function(result) {
			 res.send(result);
		}).catch(function(error) {
			
			 	 res.send(Utils.parseError(error));

		});

  	},

  	read: function(req, res) {
  		
  		var productId = req.param("productId");

  		return Product.read(productId).then(function(result) {
			
			 res.send(result);
		}).catch(function(error) {

			 	 res.send(Utils.parseError(error));

		});

  	},

  	create: function(req, res) {

  		var productObj = {
			brandId: req.param("brandId"),
			userId: req.param("userId"),
			name: req.param("naeme"),
			description: req.param("description"),
			price: req.param("price"),
			colour: req.param("colour"),
			colourcode: req.param("colourcode"),
			availability: req.param("availability")
		}

		return Product.validate(productObj).then(function(success) {

			return Product.create(productObj).then(function(result) {
					res.send(result);
			}).catch(function(error) {
					 	 res.send(Utils.parseError(error));
			});

		}).catch(function(error) {
			 	 res.send(Utils.parseError(error));
		});

  	},

  	update: function(req, res) {

  		var productId = parseInt(req.param("productId"));

  		var productObj = {
			brandId: req.param("brandId"),
			userId: req.param("userId"),
			name: req.param("naeme"),
			description: req.param("description"),
			price: req.param("price"),
			colour: req.param("colour"),
			colourcode: req.param("colourcode"),
			availability: req.param("availability")
		}

		return Product.validate(productObj).then(function(success) {

			return Product.update(productObj).then(function(result) {
				
				 res.send(result);
			}).catch(function(error) {
						 res.send(Utils.parseError(error));
			});

		}).catch(function(error) {
			 	 res.send(Utils.parseError(error));
		});

  	},

  	delete: function(req, res) {

  		var productId = parseInt(req.param("productId"));

  		return Product.delete(productId).then(function(result) {
			
			 res.send(result);
		}).catch(function(error) {

				 res.send(Utils.parseError(error));

		});

  	}

};

