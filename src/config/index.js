var path = require('path');
const ethers = require('ethers');
const abi = require ('./abi');
const root = path.normalize(__dirname + '/..');

const env = process.env.ENV || "staging"; // u can use local or online. let change it "local or staging"

var main_config = {
    env: env,
            host: '0.0.0.0',
            port: 6969,

            secret: 'db591d26716a5fbccf9e1068604d2a4e33e5d77e74c65949e5a70a60bcf59c06', //JWT
            ownerSecretKey: '2C4104E79EA8936FA6C0D0E7B796B391DE814890066B8B8640E13A554DECE084',
            provider: ethers.getDefaultProvider('ropsten'),

            userBehaviorAddress: '0x80701720ffB9DF0faA6CDf5aCdD66E3e37aC1bF5',
            userBehaviorABI: abi.userBehaviorABI,

            tokenAddress: '0x161EEF5159D1BaE46092cB3674eDa13AB0DD5Cb1',
            tokenABI: abi.tokenABI,

            fileStorageAddress: '0x6dC14057fB774B6a5a09cd2110472f8D91413DE9',
            fileStorageABI: abi.fileStorageABI,
            
            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            web_dir: root + '/web',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});

