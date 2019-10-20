const config = require('./config');
const server = require('./server');
const db_mongo = require(config.models_dir + '/mongo');

db_mongo.connect()
.then(()=>{
	console.log("Connected mongo database");
	return server.start();
})
.then((serv)=>{
	console.log("Started server");
})
.catch(err=>console.error(err));