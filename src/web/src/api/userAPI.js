import axios from 'axios';
import config from '../config';
import  {getHeaders} from '../utils/common'

export function login(email, password){
    return new Promise((resolve, reject)=>{
        const user = {
          email: email,
            password: password
        }
        return axios.post(config.api_url+ '/users/login', user)
          .then(res => {
            if (res.data.status === 0) {
                return reject(res.data.error.message)
            }
            // localStorage.setItem('userID', res.data.result.id);
            // localStorage.setItem('accessToken', res.data.result.accessToken);
            // localStorage.setItem('refreshToken', res.data.result.refreshToken);
            // localStorage.setItem('email', res.data.result.email);
            // localStorage.setItem('addressEthereum', res.data.result.addressEthereum);
            // localStorage.setItem('balance', res.data.result.balance)
            resolve(res.data.result);
          })
          .catch(err => {
            reject(err);
          });
    })
}

export function createUser(email, password, nickName, phone, genre){
  return new Promise((resolve, reject) => {
    const register = {
      email,
      password,
      nickName,
      phone,
      genre
    }
    const user = {
      user: register
    }
    return axios.post(config.api_url+ '/users/create', user)
    .then(res => {
      if (res.data.status === 1) {
          return resolve();
      }
      if(res.data.error.message.errmsg)
        reject(res.data.error.message.errmsg)
      reject(res.data.error.message)
    })
    .catch(err => {
      reject(err);
    });
  })
}

export function findUser(email){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/users/find', {
      params: {
        keyword: email
      }
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function getUserUpload(address){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url + `/ethereums/getUserUpload/${address}`, {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
} 

export function getUserDownload(address){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url + `/ethereums/getUserDownload/${address}`, {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function upload(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/ethereums/upload', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          console.log("this is result " + res.data.result)
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function download(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/ethereums/download', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          console.log("this is result " + res.data.result)
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function usingISO(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/ethereums/usingISO', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          console.log("this is result " + res.data.result)
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function investISO(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/ethereums/investISO', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          console.log("this is result " + res.data.result)
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function getFaucet(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/ethereums/faucet', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
              return reject(res.data.error.message)
          }
          console.log("this is result " + res.data.result)
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function getISOAddress(address){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/ethereums/getISOAddress?address=' + address, {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function getSongByID(idMongo){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/getSongByID?id=' + idMongo, {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function getISOList(){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/ethereums/getISOList', {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      console.log(res.data.result)
      resolve(res.data.result)
    })
    .catch(err => {
      console.log("loine: " + err)
      reject(err)
    })
  })
}

export function updateUser(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/actions/updateUser', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          console.log("this is result " + res.data.result)
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function postLyric(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/actions/postLyric', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}


export function createTemplateContract(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/actions/createTemplateContract', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function createContract(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/actions/createContract', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}


export function postViewMusic(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/users/postViewMusic', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function postViewUser(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/users/postViewUser', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function follow(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/actions/follow', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          console.log("this is result " + res.data.result)
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function getUserPage(userName){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/userPage?userName=' + userName, {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function getRanking(){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/ethereums/getTimeRanking', {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function getHomeSongs(){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/getHomeSongs', {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function getHotUsers(){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/getHotUsers', {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function getRelatedUser(){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/getRelatedUser', {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function getSongSameSinger(data){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ `/actions/getSongSameSinger/?idUserUpload=${data.idUserUpload}&exceptedSongID=${data.exceptedSongID}`, {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}


export function getUserTemplateContract(data){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/getUserTemplateContract/?idMongo=' + data, {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}


export function getContract(data){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/getContract/' + data, {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}

export function setApprovedContract(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/actions/setApprovedContract', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function executeContract(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/ethereums/executeContract', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}


export function setApprove(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/ethereums/setApprove', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}

export function cancelContract(data){
  return new Promise((resolve, reject)=>{
      return axios.post(config.api_url+ '/ethereums/cancelContract', data, {headers: getHeaders()})
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.error.message)
              return reject(res.data.error.message)
          }
          resolve(res.data.result);
        })
        .catch(err => {
          reject(err);
        });
  })
}


export function getUserContract(){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/getUserContract', {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}


export function getNotification(){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/actions/getNotification', {
      headers: getHeaders()
    })
    .then( res => {
      if (res.data.status === 0)
        return reject(res.data.error.message)
      resolve(res.data.result)
    })
    .catch(err => reject(err))
  })
}