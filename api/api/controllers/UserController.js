/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	 _config: {
	    actions: false,
	    shortcuts: false,
	    rest: false
	  },

	count: function (req, res) {
		User.count({active:1}).then(function(error,result) {
			if(error) {
				return res.send(error);
			}
			return res.send(result);
		});
  	}
	
};