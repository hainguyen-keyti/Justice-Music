const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: '34.70.242.252', port: '5001', protocol: 'http' }) //'http://34.67.61.172:5001'
exports.getHashIPFS = (buffer) =>{
    return new Promise( async (resolve, rejects) => {
        const results = await ipfs.add(buffer)
        resolve(results[0].hash)
        }
    );
}
