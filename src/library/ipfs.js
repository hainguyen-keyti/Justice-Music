const IPFS = require('ipfs')
exports.getHashIPFS = (buffer) =>{
    return new Promise( async (resolve, rejects) => {
        const node = await IPFS.create()
            node.add(buffer, (error, ipfsHash) => {
                if (error) {
                    rejects(error);
                    return node.stop();
                  }
                  
                resolve(ipfsHash[0].hash)
                return node.stop() // chua biet cach chay node ipfs 1 lan duy nhat
            })
        }
    );
}
