var config = require('../config');

var successObj = (result) => {
	return {
		'status':1,
		'result': result,
	}
}

var exceptionObj = (message, errorCode = 404) => {
	return {
		'status':0,
		'error': {
			'code': errorCode,
			'message': message,
		},
	}
}

var response_express = {
	success: (res, result) => {
		res.json(successObj(result));
	},

	exception: (res, message, errorCode) => {
		res.json(exceptionObj(message, errorCode));
	},
};

var response_socketio = (socket, errormMsg) => {
		socket.emit("error", errormMsg);
};


module.exports={successObj, exceptionObj, response_express, response_socketio}
