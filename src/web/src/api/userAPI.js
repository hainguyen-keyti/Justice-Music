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
            localStorage.setItem('userID', res.data.result.id);
            localStorage.setItem('accessToken', res.data.result.accessToken);
            localStorage.setItem('refreshToken', res.data.result.refreshToken);
            localStorage.setItem('email', res.data.result.email);
            localStorage.setItem('addressEthereum', res.data.result.addressEthereum);
            localStorage.setItem('balance', res.data.result.balance)
            resolve();
          })
          .catch(err => {
            reject(err);
          });
    })
}

export function createUser(email, password, name, phone, genre){
  return new Promise((resolve, reject) => {
    const register = {
      email,
      password,
      name,
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

export function getUserUpload(pageNumber){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/ethereums/getUserUpload?page=' + pageNumber, {
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