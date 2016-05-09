module.exports = {


		parseError: function(message,error) {
			//TODO: parse errors or format them
		
			var _message = "Undefined Error";
			
			if(!error) {
				error = message;
			}

			if(error && error.message) {
				_message = error.message;
			}

			var _err = new Error();
			
			_err.success = false;
			_err.error = {type: "api", message: _message}

			/*if(error) {
				_err.payload =  error;
			}*/
			
			return _err;
		}
	
};