const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient('http://34.67.61.172:5001')
exports.getHashIPFS = (buffer) =>{
    return new Promise( async (resolve, rejects) => {
        const results = await ipfs.add(buffer)
        console.log("thiis issssffasdfadsfasdf")
        console.log(results[0].hash)
        resolve(results[0].hash)
        }
    );
}
