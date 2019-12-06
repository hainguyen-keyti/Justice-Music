var config = require('../config');
var jwt = require('jsonwebtoken');
var response_express = require(config.library_dir+'/response').response_express;
const ethers = require('ethers');
const Music = require(config.models_dir + '/mongo/music');
const User = require(config.models_dir + '/mongo/user')

let privateKey = config.ownerSecretKey;
let wallet = new ethers.Wallet(privateKey, config.provider);
let contractWithSigner = new ethers.Contract(config.tokenAddress, config.tokenABI, wallet)

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


exports.getListMusicBySolidityID = (arr) => {
	return new Promise(async (resolve, reject) => {
	try {
		let result = [];
		for(let i = 0; i <= arr.length - 1; i++){
			await Music.findOne({idSolidity: Number(arr[i].idFile)})
			.then(async music => {
				const data = {
					music,
					downloadWeekRanking: Number(arr[i].lastWeekDownloader),
				}
				result.push(data);
			})
		}
		return resolve(result)	
	} catch (error) {
		return reject(error)
	}
	})
}


exports.ModifyMusicFile = (tx) => {
	return new Promise( async (resolve, reject) => {
	try {
		let result = [];
		for(let i = tx.length-1; i >= 0; i--){
			let {idFile, idMongoose, fileHash, owner, price, totalDownloader, weekDownloader, blockTime,valid, kind, IsISO} = tx[i]
			if(idMongoose === null)
				break
			await Music.findOne({_id: idMongoose, hash: fileHash})
			.then( music => {
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
					music
				}
				result.push(data);
			})
		}
		return resolve(result)	
	} catch (error) {
		return reject(error)
	}
	})
}



exports.ModifyFileISO = (tx) => {
	return new Promise( async (resolve, reject) => {
	try {
		return resolve( await Promise.all(tx.map( async record => {
			let returnObj = {}
			await User.findOne({addressEthereum: record.ISOFile.owner})
			.then( user => {
				returnObj.user = user
			})
			.catch(err=>reject(err))
			await Music.findOne({idSolidity: record.ISOFile.idFile})
			.then( music => {
				returnObj.music = music
			})
			.catch(err=>reject(err))
			returnObj.idFile = Number(record.ISOFile.idFile)
			returnObj.offerPercent = Number(record.offerPercent)
			returnObj.offerAmount = Number(record.offerAmount)
			returnObj.amountRemaining = Number(record.amountRemaining)
			returnObj.timeExpired = Number(record.timeExpired)
			returnObj.ownerPercent = Number(record.ownerPercent) 
			returnObj.numberOfDownload = Number(record.numberOfDownload)
			returnObj.week = Number(record.week)
			returnObj.investListISO = record.investListISO.map(e => {
				let investObj = {}
				investObj.investor = e.investor
				investObj.percentage = Number(e.percentage)
				investObj.amount = Number(e.amount)
				return investObj
			})

			return returnObj
		})))
		// return resolve(result)
	} catch (error) {
		return reject(error)
	}
	})
}


exports.getBalance = (address) => {
	return new Promise((resolve, reject) => {
		const promises = [
			config.provider.getBalance(address),
			contractWithSigner.balanceOf(address)
		]
		Promise.all(promises)
		.then(data => {
			const result = {
				ETH: ethers.utils.formatEther(data[0]),
				HAK: Number(data[1]).toString()
			}
			return resolve(result)
		})	
		.catch (err => {
			return reject(err)
		})
	})
}


exports.convertArrBigNumberToNumber =  (data) => {
	return new Promise(async (resolve, reject) => {
		try {
		const result = await data.map( instance => {
			return Number(instance);
		})
		return resolve(result)
		}
		 catch (error) {
				return reject(error)
		}
	})
}

