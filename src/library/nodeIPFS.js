const IPFS = require('ipfs')

var node ;  

exports.createIPFS = async () => {
    node = await IPFS.create()
    console.log("node")
}

exports.getNode = () => {
    return node;
}
