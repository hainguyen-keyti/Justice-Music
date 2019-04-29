// const config = require('../../config')
// const db_mongo = require(config.models_dir + '/mongo/db');
// const user = require(config.models_dir + '/mongo/user');
// // this file to test database connect
// db_mongo.connect()
// .then (() => {
//     console.log("connected");
//     var usertest = new user({
//         username: "keytideptrai3",
//         fullname: "nguyen hoang hai",
//         phone: "0372598220",
//         password_hash: "thisismypassword",
//         avatar: "deoco",
//         birthday: "1997-05-24",
//     })
//     usertest.save( err => {
//         if(err) throw err;
//         console.log("Add sucessfull");
//     })
// })
// .catch(err => console.log(err))
