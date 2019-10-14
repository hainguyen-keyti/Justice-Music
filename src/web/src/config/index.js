const ethers = require('ethers');
const config = {
    // api_url: "https://justice-music.herokuapp.com/api",
    // url:"https://justice-music.herokuapp.com/chat"
    api_url: "http://localhost:6969/api",
    url:"http://localhost:6969/chat",

    provider: ethers.getDefaultProvider('kovan'),
}

module.exports = config