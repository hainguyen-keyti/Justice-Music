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
var converterToPlainObject = function(obj){
	return JSON.parse(JSON.stringify(obj));
};
exports.deleteSensitiveInfoUser = function(user){
	var userInfo = converterToPlainObject(user);
	delete userInfo.phone;
	delete userInfo.is_confirm_email;
	delete userInfo.password_hash;
	delete userInfo.birthday;
	delete userInfo.date_created;
	delete userInfo.date_updated;
	delete userInfo.refreshToken;
	delete userInfo.genre;
	delete userInfo.personInBox;
	return userInfo;
}

exports.ModifyFile = (tx, page) => {
    return new Promise((resolve, reject) => {
		try {
			var result = [];
			if (!page || page < 1){ page = 1;}
			for(let i = (tx.length-1-(page-1)*10); i >= ((tx.length-page*10 > 0)?tx.length-page*10:0); i--){
				let {idFile, fileHash, owner, price, totalDownloader, weekDownloader, blockTime,valid, kind, IsISO} = tx[i]
				let data = {
					idFile: Number(idFile),
					owner,
					price: Number(price),
					totalDownloader: Number(totalDownloader),
					weekDownloader: Number(weekDownloader),
					blockTime: Number(blockTime),
					valid,
					kind,
					IsISO,

					image: 'https://ipfs.io/ipfs/QmdMn4gF9yEzxdUHQW2bLLgEkdNr7krqVwxR7YWcDgPQJR',
					name: {
						songName: 'Mãi mãi là bao lâu',
						artistName: 'Keyti',
						fileHash
					},
					view: 12523362,
				}
				result.push(data);
			}
			let jsonRes = {
				page: page,
				total: tx.length,
				file: result
			}
			return resolve(jsonRes)	
		} catch (error) {
			return reject(error)
		}
    })
}