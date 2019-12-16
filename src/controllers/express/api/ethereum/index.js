const express = require('express');

var ethereumRoutes = express.Router();

ethereumRoutes.post('/upload', require('./upload'))

ethereumRoutes.post('/download', require('./download'))

ethereumRoutes.post('/faucet', require('./faucet'))

ethereumRoutes.post('/usingISO', require('./usingISO'))

ethereumRoutes.post('/investISO', require('./investISO'))

ethereumRoutes.post('/rankPerWeek', require('./rankPerWeek'))

ethereumRoutes.post('/executeContract', require('./executeContract'))

ethereumRoutes.post('/setApprove', require('./setApprove'))

ethereumRoutes.post('/cancelContract', require('./cancelContract'))


ethereumRoutes.get('/getUserUpload/:address', require('./getUserUpload'))

ethereumRoutes.get('/getUserDownload/:address', require('./getUserDownload'))

ethereumRoutes.get('/getISOId', require('./getISOId'))

ethereumRoutes.get('/getISOAddress', require('./getISOAddress'))

ethereumRoutes.get('/getISOList', require('./getISOList'))

ethereumRoutes.get('/getTimeRanking', require('./getTimeRanking'))

ethereumRoutes.get('/getSongContract/:idContractMongo', require('./getSongContract'))

ethereumRoutes.get('/getOwnerContractList', require('./getOwnerContractList'))

ethereumRoutes.get('/getSignerContractList', require('./getSignerContractList'))



module.exports = ethereumRoutes;

// const config = require('../../../../config');
// const ethers = require('ethers');


// let provider = ethers.getDefaultProvider(config.testNet);


// // let address = "0x56FB956B0787eb7098161231dD97b296adD4F02A";
// let privateKey = config.ownerSecretKey;
// let wallet = new ethers.Wallet(privateKey, provider);

// // provider.getBalance(address).then((balance) => {

// //     // balance is a BigNumber (in wei); format is as a sting (in ether)
// //     let etherString = ethers.utils.formatEther(balance);

// //     console.log("Balance: " + etherString);
// // });
// //--------------------------------------------


// // provider.getGasPrice().then((gasPrice) => {
// //     // gasPrice is a BigNumber; convert it to a decimal string
// //     gasPriceString = gasPrice.toString();

// //     console.log("Current gas price: " + gasPriceString);
// // });
// //------------------------------------------


// // provider.getBlock(3346773).then((block) => {
// //     console.log(block);
// // });
// //----------------------------------------



// // let transaction = {
// //     to: "0x7a23A795805eeBe00b336834D1e96c991F0DDaFE",
// //     value: ethers.utils.parseEther("1")
// // };

// // // Send the transaction
// // let sendTransactionPromise = wallet.sendTransaction(transaction);

// // sendTransactionPromise.then((tx) => {
// //    console.log(tx);
// //    return(tx.hash);
   
// // }).then(txHash => {
// //     provider.waitForTransaction(txHash).then((receipt) => {
// //         console.log('Transaction Mined: ' + receipt.hash);
// //         console.log(receipt);
// //     });
// // });
// //---------------------------------------------


// // 0x6dC14057fB774B6a5a09cd2110472f8D91413DE9


// // let contractEnsName = '0x6dC14057fB774B6a5a09cd2110472f8D91413DE9';

// // // Position 0 in the FireflyRegistrar contract holds the ENS address

// // let storagePromise = provider.getStorageAt(contractEnsName, 0);

// // storagePromise.then((result) => {
// //    console.log(result);
// //    // "0x000000000000000000000000112234455c3a32fd11230c42e7bccd4a84e02010"
// // });
// //---------------------------------------------
// async function sendTransactionTest(){
//     let contractAddress = config.userBehaviorAddress;
//     let contractWithSigner = new ethers.Contract(contractAddress, config.userBehaviorABI, wallet)
    
//     let tx = await contractWithSigner.uploadFile("thanh cong","9277","2");
//     await tx.wait();
    
//     contractWithSigner.getUserUpload().then(result => {
//         console.log(result[result.length - 1]);
//     });
    
// }
// sendTransactionTest();

