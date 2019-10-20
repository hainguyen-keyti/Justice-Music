const config = require('../../config')
const db_mongo = require(config.models_dir + '/mongo');
const haha = require(config.models_dir + '/mongo/haha');
// this file to test database connect
db_mongo.connect()
.then (() => {
    console.log("connected");
    var usertest = new haha({
        email: "keytideptrai3@gmail.com",
        name: "nguyen hoang hai",
        phone: "96341643463416346343",
        password_hash: "thisismypassword",
        avatar: "deoco",
        birthday: "1997-05-24",
    })
    usertest.save( err => {
        if(err) throw err;
        console.log("Add sucessfull");
    })
})
.catch(err => console.log(err))
