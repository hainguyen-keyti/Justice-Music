const axios = require('axios');
var request = require('request').defaults({ encoding: null });
var FormData = require('form-data');
const form = new FormData();


exports.checkFingerprint = (hash) =>{
    return new Promise( async (resolve, rejects) => {
      request.get(window.$linkIPFS + hash, async function (err, res, fileBuffer) {
        form.append('audio', fileBuffer, {filename: 'NameSongTemp.mp3', contentType: 'audio/mp3'});
        const formHeaders = form.getHeaders();
        axios.post('http://34.67.236.243:5000/recognize', form, {
          headers: {
            ...formHeaders,
          },
        })
        .then(response => {
          console.log(response.data)
          if(!response.data.result)
            {
              return resolve(false)
            }
          if(response.data.result.confidence > 1000 && response.data.result.offset_seconds >= 0){
            return resolve(true)
          }
          return resolve(false)
        })
        .catch(error => {
          console.log(error)
          return rejects(null)
        })
      })
    }
  )
}

exports.setFingerprint = (hash, songName) =>{
  return new Promise( async (resolve, rejects) => {
    console.log(hash)
    request.get(window.$linkIPFS + hash, async function (err, res, fileBuffer) {
      console.log(songName)
      form.append('audio', fileBuffer, {filename: 'hahahaha.mp3', contentType: 'audio/mp3'});
      form.append('info', songName);
      const formHeaders = form.getHeaders();
      console.log(hash)
      axios.post('http://34.67.236.243:5000/fingerprint', form, {
        headers: {
          ...formHeaders,
        },
      })
      .then(response => {
        console.log(response)
        if(response.data.message === 'completed'){
          return resolve(true)
        }
        return resolve(false)
      })
      .catch(error => {
        console.log(error)
        return rejects(null)
      })
    })
  }
)
}






// async function haha() {
  
// request.get(window.$linkIPFS + '/QmUzvaqtvvnCmkTmTNRYQJsnFfi3PFFnQr6jABbgfeMSXy', async function (err, res, fileBuffer) {
//     //process exif here

//     form.append('audio', fileBuffer, {filename: 'hahahaha.mp3', contentType: 'audio/mp3'});

// const formHeaders = form.getHeaders();

// axios.post('http://34.67.236.243:5000/recognize', form, {
//   headers: {
//     ...formHeaders,
//   },
// })
// .then(response => console.log(response.data))
// .catch(error => console.log(error))

// })

// }
