var config = require('../config');
var jwt = require('jsonwebtoken');
var response_express = require(config.library_dir+'/response').response_express;

exports.findMissParams = function(obj, checkProps) {
	if(!Array.isArray(checkProps)){
		checkProps = [checkProps];
	}

	obj=JSON.parse(JSON.stringify(obj));
	var missProps=[];
	for (var i = 0; i < checkProps.length; i++) {
		if(!obj.hasOwnProperty(checkProps[i])){
			missProps.push(checkProps[i]);
		} else if(!obj[checkProps[i]]){
			missProps.push(checkProps[i]);
		}
	}
	return missProps;
};

exports.checkMissParams = function(res, obj, checkProps) {
	var missProps=this.findMissParams(obj, checkProps);
	if(missProps.length>0){
		response_express.exception(res, "Miss some params: " + missProps.toString());
		return true;
	}
	return false;
};

exports.createToken = function(user, expire) {
	return jwt.sign(user, config.secret, {
		expiresIn: expire
	});
}

exports.converterToPlainObject = function(obj){
	return JSON.parse(JSON.stringify(obj));
};