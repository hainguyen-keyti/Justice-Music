var config = require('../config');
var jwt = require('jsonwebtoken');
var response_express = require(config.library_dir+'/response').response_express;
const ethers = require('ethers');
const Music = require(config.models_dir + '/mongo/music');
const User = require(config.models_dir + '/mongo/user')
const Follow = require(config.models_dir + '/mongo/follow')

let privateKey = config.ownerSecretKey;
let wallet = new ethers.Wallet(privateKey, config.provider);
let contractWithSignerToken = new ethers.Contract(config.tokenAddress, config.tokenABI, wallet)
let contractWithSignerUserBehavior = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)


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

exports.RemoveObjFieldNull = async function(obj, arrSubObj) {

	console.log(obj)
	const props = Object.keys(obj);
	obj=JSON.parse(JSON.stringify(obj));

	await props.forEach(record => {
		if(!obj[record]){
			delete obj[record];
		}
	})

	if(!Array.isArray(arrSubObj)){
		arrSubObj = [arrSubObj];
	}

	for(var i = 0; i < arrSubObj.length; i++ ){
		if(obj[arrSubObj[i]]){
			const subProps = Object.keys(obj[arrSubObj[i]]);
		
			if(obj[arrSubObj[i]]){
				if(subProps.length === 0){
					delete obj[arrSubObj[i]]
					return 
				}
				await subProps.forEach(record => {
					if(!obj[arrSubObj[i]][record]){
						delete obj[arrSubObj[i]][record]
					}
				})
			}
		}
	}
	return obj;
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
				const user = await User.findById(music.idMongoUserUpload)
				const dataUser = { 
					nickName: user.nickName,
					avatar: user.avatar,
					addressEthereum: user.addressEthereum,
				}
				const data = {
					user: dataUser,
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

exports.getSongByIdMongo = (idMongo, senderID) => {
	return new Promise(async (resolve, reject) => {
	try {
		let result = {}
		const songMongo = await Music.findById(idMongo)
		if(!songMongo){
			return reject("This song is not exist.")
		}
		const promises = [
			User.findById(songMongo.idMongoUserUpload),
			contractWithSignerUserBehavior.getFileById(songMongo.idSolidity),
			contractWithSignerUserBehavior.getISOId(songMongo.idSolidity),
			Follow.countDocuments({followedID: songMongo.idMongoUserUpload}),
			Follow.exists({userID: senderID})
		]
		const arrData = await Promise.all(promises)

		let musicData = {
			idFile: Number(arrData[1][0].idFile),
			price: Number(arrData[1][0].price),
			totalDownloader: Number(arrData[1][0].totalDownloader),
			weekDownloader: Number(arrData[1][0].weekDownloader),
			blockTime: Number(arrData[1][0].blockTime),
			valid: arrData[1][0].valid,
			IsISO: arrData[1][0].IsISO,
		}
		
		let music = Object.assign({}, musicData, songMongo._doc );
		result.music = music
		result.user = arrData[0]
		result.follow= arrData[3]
		result.isFollowed = arrData[4]
		if(music.IsISO)
		{
			result.idFile = Number(arrData[2][0].ISOFile.idFile)
			result.offerPercent = Number(arrData[2][0].offerPercent)
			result.offerAmount = Number(arrData[2][0].offerAmount)
			result.amountRemaining = Number(arrData[2][0].amountRemaining)
			result.timeExpired = Number(arrData[2][0].timeExpired)
			result.ownerPercent = Number(arrData[2][0].ownerPercent) 
			result.numberOfDownload = Number(arrData[2][0].numberOfDownload)
			result.week = Number(arrData[2][0].week)
			result.investListISO = arrData[2][0].investListISO.map(e => {
				let investObj = {}
				investObj.investor = e.investor
				investObj.percentage = Number(e.percentage)
				investObj.amount = Number(e.amount)
				return investObj
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
				const data = { 
					nickName: user.nickName,
					avatar: user.avatar,
					addressEthereum: user.addressEthereum,
				}
				returnObj.user = data
			})
			.catch(err=>reject(err))
			await Music.findOne({idSolidity: record.ISOFile.idFile})
			.then( music => {
				returnObj.music = music

				const data = { 
					image: music.image,
					name: music.name,
					hash: music.hash
				}
				returnObj.music = data
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
			contractWithSignerToken.balanceOf(address)
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

