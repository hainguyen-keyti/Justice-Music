var path = require('path');

const root = path.normalize(__dirname + '/..');

const env = process.env.ENV || "staging"; // u can use local or online. let change it "local or staging"

var main_config = {
    env: env,
            host: '0.0.0.0',
            port: 6969,
            root_dir: root,
            secret: 'db591d26716a5fbccf9e1068604d2a4e33e5d77e74c65949e5a70a60bcf59c06',
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});