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
            provider: ethers.getDefaultProvider('kovan'),

            userBehaviorAddress: '0x3a667Bb379Bf2F8e61f41422f45901B2AB774537',
            userBehaviorABI: abi.userBehaviorABI,

            tokenAddress: '0x84C470e05128A2d1FfFF6132801182Aa4CeD9F89',
            tokenABI: abi.tokenABI,

            fileStorageAddress: '0x95D9e5f5d141e8668e138a9f0ef7Db7d1124838C',
            fileStorageABI: abi.fileStorageABI,

            rankingAddress: '0xEaBB2d7eeAF13d8A9710055AD27f738410915d3d', // chua fix dia chi vs abi
            rankingABI: abi.rankingABI,
            
            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            web_dir: root + '/web',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});

