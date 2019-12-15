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
		response_express.exception(res, "Miss some params: " + missProps.toString())
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
var deleteSensitiveInfoUser = exports.deleteSensitiveInfoUser = function(user){
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
				const songInfo = await Music.findOne({idSolidity: Number(arr[i].idFile)})
				.lean()
				.select('artist image name _id view userUpload tags hash')
				.populate('userUpload', ['nickName', 'avatar', 'addressEthereum', '_id'])
				let data = {
					...songInfo,
					downloadWeekRanking: Number(arr[i].lastWeekDownloader),
				}
				result.push(data);
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
		const songMongo = await Music.findById(idMongo)
		.lean().
		populate('userUpload', ['nickName', 'avatar', 'addressEthereum', '_id'])
		if(!songMongo){
			return reject("This song is not exist.")
		}
		const promises = [
			contractWithSignerUserBehavior.getFileById(songMongo.idSolidity),
			contractWithSignerUserBehavior.getISOId(songMongo.idSolidity),
			Follow.countDocuments({followedID: songMongo.userUpload._id}),
			Follow.exists({userID: senderID})
		]
		const arrData = await Promise.all(promises)

		let musicData = {
			idFile: Number(arrData[0][0].idFile),
			price: Number(arrData[0][0].price),
			totalDownloader: Number(arrData[0][0].totalDownloader),
			weekDownloader: Number(arrData[0][0].weekDownloader),
			blockTime: Number(arrData[0][0].blockTime),
			valid: arrData[0][0].valid,
			IsISO: arrData[0][0].IsISO,
		}
		let temp = Object.assign({}, musicData, songMongo);
		let songInfo = {
			...temp,
			follow: arrData[2],
			isFollowed: arrData[3],
		}

		if(songInfo.IsISO)
		{
			songInfo.idFile = Number(arrData[1][0].ISOFile.idFile)
			songInfo.offerPercent = Number(arrData[1][0].offerPercent)
			songInfo.offerAmount = Number(arrData[1][0].offerAmount)
			songInfo.amountRemaining = Number(arrData[1][0].amountRemaining)
			songInfo.timeExpired = Number(arrData[1][0].timeExpired)
			songInfo.ownerPercent = Number(arrData[1][0].ownerPercent) 
			songInfo.numberOfDownload = Number(arrData[1][0].numberOfDownload)
			songInfo.week = Number(arrData[1][0].week)
			songInfo.investListISO = arrData[1][0].investListISO.map(e => {
				let investObj = {}
				investObj.investor = e.investor
				investObj.percentage = Number(e.percentage)
				investObj.amount = Number(e.amount)
				return investObj
			})
		}
		return resolve(songInfo)
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

exports.BigNumberToNumber = async (tx) => {
	return new Promise( async (resolve, reject) => {
	try {
		let result = []
		await Promise.all(tx.map( async record => {
			let data = {}
			await  Promise.all(Object.getOwnPropertyNames(record).map(key=>{
				if(Number.isNaN(Number(key))){
					if(typeof(record[key]) === "object"){
						data[key] = Number(record[key])
					}
					else{
						data[key] = record[key]
					}
				}
			}))
			result.push(data)
		}))
		return resolve(result)
	} catch (error) {
		return reject(error)
	}
	})
}

exports.ModifyFileISO = (tx, senderID) => {
	return new Promise( async (resolve, reject) => {
	try {
		return resolve( await Promise.all(tx.map( async record => {
			let returnObj = {}
			await User.findOne({addressEthereum: record.ISOFile.owner})
			.then( async user => {

				const follow = await Follow.countDocuments({followedID: user._id})
				const isFollowed = await Follow.exists({userID: senderID, followedID: user._id})
				const data = { 
					nickName: user.nickName,
					avatar: user.avatar,
					addressEthereum: user.addressEthereum,
					follow,
					isFollowed
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
					hash: music.hash,
					_id: music._id
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

