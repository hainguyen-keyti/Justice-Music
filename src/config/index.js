var path = require('path');

const root = path.normalize(__dirname + '/..');

const env = process.env.ENV || "local"; // u can use local or online. let change it "local or staging"

var main_config = {
    env: env,
            host: '0.0.0.0',
            port: 3000,
            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            console_log: true,
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});