// // const config = require('../../config')
// // const db_mongo = require(config.models_dir + '/mongo');
// // const haha = require(config.models_dir + '/mongo/haha');
// // // this file to test database connect
// // db_mongo.connect()
// // .then (() => {
// //     console.log("connected");
// //     var usertest = new haha({
// //         email: "keytideptrai3@gmail.com",
// //         name: "nguyen hoang hai",
// //         phone: "96341643463416346343",
// //         password_hash: "thisismypassword",
// //         avatar: "deoco",
// //         birthday: "1997-05-24",
// //     })
// //     usertest.save( err => {
// //         if(err) throw err;
// //         console.log("Add sucessfull");
// //     })
// // })
// // .catch(err => console.log(err))
const axios = require('axios')
var fs = require('fs');
var request = require('request').defaults({ encoding: null });
// const config = require('../../config');
// let fetch = require('node-fetch');
// const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS
// const FileType = require('file-type');

// request.get('https://ipfs.fotra.tk/ipfs/QmUzvaqtvvnCmkTmTNRYQJsnFfi3PFFnQr6jABbgfeMSXy', async function (err, res, body222) {
//     //process exif here
//     console.log(err)
//     console.log(res)
//     console.log(body222)

//     var formData = {
//         // Pass a simple key-value pair
//         // my_field: 'audio',
//         // Pass data via Buffers
//         audio: body222,
//       };

//       var r = request.post('http://34.67.236.243:5000/recognize' , function optionalCallback(err, httpResponse, body) {
//         if (err) {
//           return console.error('upload failed:', err);
//         }
//         console.log('Upload successful!  Server responded with:', body.toString());
//         // console.log(httpResponse)
//       });

//       var form = r.form();
// form.append('audio', body222);
   
      
//     // fetch('http://34.67.236.243:5000/recognize', {
//     // method: 'POST',
//     // body: {audio: body222.toString('base64')} // Here, stringContent or bufferContent would also work
//     // })
//     // .then(function(res) {
//     //     return res.json();
//     // }).then(function(json) {
//     //     console.log(json);
//     // });
    
//     // var file = new File(body, "nhacne.txt", {
//     //     type: "audio/mp3",
//     //   });
//     //   console.log(file)
// });


// // axios.get(`https://ipfs.fotra.tk/ipfs/QmZimW456PmaUy5SLjfGPKxPUXmHSm7zAQoGruV9c8UD2U`)
// // .then(function (response) {

// //     console.log(Object.keys(response)); // Outputs ["a","b","c"]
// //     console.log(response.data
// //         )
// // })
// // .catch(function (error) {
// //   console.log(error);
// // });



var FormData = require('form-data');
const form = new FormData();
// const stream = fs.createReadStream('https://ipfs.fotra.tk/ipfs/QmZimW456PmaUy5SLjfGPKxPUXmHSm7zAQoGruV9c8UD2U');

// form.append('audio', stream);

// // In Node.js environment you need to set boundary in the header field 'Content-Type' by calling method `getHeaders`
// const formHeaders = form.getHeaders();

// axios.post('http://34.67.236.243:5000/recognize', form, {
//   headers: {
//     ...formHeaders,
//   },
// })
// .then(response => console.log(response))
// .catch(error => console.log(error))

// request.get('https://ipfs.fotra.tk/ipfs/QmUzvaqtvvnCmkTmTNRYQJsnFfi3PFFnQr6jABbgfeMSXy', async function (err, res, body222) {
//     //process exif here
//     console.log(err)
//     console.log(res)
//     console.log(body222)

// const stream = fs.createReadStream('/home/keyti/Desktop/userData/Erik/Tu-Tam (mp3cut.net).mp3');



async function haha() {
  
//   const stream = request('https://ipfs.fotra.tk/ipfs/QmZimW456PmaUy5SLjfGPKxPUXmHSm7zAQoGruV9c8UD2U').pipe(fs.createWriteStream('song.mp3'))
//   console.log("hihi")
//   setTimeout(function(){ 
// form.append('audio', stream);
request.get('https://ipfs.fotra.tk/ipfs/Qme5uQmftCgJ1ViYKPRov8wCKWH2A2oohywUSa9vJgBPzC', async function (err, res, body222) {
    //process exif here
  const name = "hiihih-hhh"
    form.append('audio', body222, {filename: 'NameSongTemp.mp3', contentType: 'audio/mp3'});
    form.append('info', name);

const formHeaders = form.getHeaders();

axios.post('http://34.67.236.243:5000/fingerprint', form, {
  headers: {
    ...formHeaders,
  },
})
.then(response => console.log(response.data))
.catch(error => console.log(error))

})

}
haha()
// upload().then(res => {
//   return res.pipe(fs.createWriteStream('song.mp3'))
// })
// .then(stream => {
  
//     form.append('audio', stream);
//   // form.append('my_buffer', new Buffer(10));

//   const formHeaders = form.getHeaders();

//   axios.post('http://34.67.236.243:5000/recognize', form, {
//     headers: {
//       ...formHeaders,
//     },
//   })
//   .then(response => console.log(response.data))
//   .catch(error => console.log(error))

// })