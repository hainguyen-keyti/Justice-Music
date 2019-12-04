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

            userBehaviorAddress: '0x77d684c1eAfbDC19880369636b410283702e9b46',
            userBehaviorABI: abi.userBehaviorABI,

            tokenAddress: '0x84C470e05128A2d1FfFF6132801182Aa4CeD9F89',
            tokenABI: abi.tokenABI,

            fileStorageAddress: '0x2bE1a87f5CD66aE3E96afC8D40FCaa7B35646425',
            fileStorageABI: abi.fileStorageABI,

            rankingAddress: '0x7BF16e55E63F4Ab44945f9Bd66AD8e1580caf64C',
            rankingABI: abi.rankingABI,
            
            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            web_dir: root + '/web',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});

