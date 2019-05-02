import axios from 'axios';
import config from '../config';

export function login(username, password){
    return new Promise((resolve, reject)=>{
        const user = {
            username: username,
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
            resolve();
          })
          .catch(err => {
            reject(err);
          });
    })
}

export function createUser(username, password, full_name, phone, genre){
  return new Promise((resolve, reject) => {
    const register = {
      username: username,
      password: password,
      full_name: full_name,
      phone: phone,
      genre: genre
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
        reject("email or phone number has been registed")
      reject(res.data.error.message)
    })
    .catch(err => {
      reject(err);
    });
  })
}

export function findUser(username){
  return new Promise((resolve, reject) => {
    return axios.get(config.api_url+ '/users/find', {
      params: {
        keyword: username
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