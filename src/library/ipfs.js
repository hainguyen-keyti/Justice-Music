const node = require('./nodeIPFS')
exports.getHashIPFS = (buffer) =>{
    return new Promise( async (resolve, rejects) => {
            node.getNode().add(buffer, (error, ipfsHash) => {
                if (error) {
                    rejects(error);
                    return node.getNode().stop();
                  }
                resolve(ipfsHash[0].hash)
                // return node.stop() // chua biet cach chay node ipfs 1 lan duy nhat
            })
        }
    );
}
