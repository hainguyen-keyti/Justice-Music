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

            userBehaviorAddress: '0x972ff6C9f9d6510A0dB6Db700916BEC587A279aB',
            userBehaviorABI: abi.userBehaviorABI,

            tokenAddress: '0x84C470e05128A2d1FfFF6132801182Aa4CeD9F89',
            tokenABI: abi.tokenABI,

            fileStorageAddress: '0xdA02aD152142bA8Fc811F56fE036BD1F22b8dC7b',
            fileStorageABI: abi.fileStorageABI,

            rankingAddress: '0xd5510C35DA1F17E921B58869C45631753055C0c5',
            rankingABI: abi.rankingABI,
            
            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            web_dir: root + '/web',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});

