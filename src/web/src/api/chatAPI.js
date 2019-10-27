import axios from 'axios';
import config from '../config';
import  {getHeaders} from '../utils/common'
import {store} from '../store';

export function getListMessage(receiverID){
    return new Promise((resolve, reject)=>{
        var data = {
            senderID: store.getState().userReducer.user.id,
            receiverID: receiverID
        }
        return axios.post(config.api_url+ '/chats/getListMessage', data, {headers: getHeaders()})
          .then(res => {
            if (res.data.status === 0) {
                return reject(res.data.error.message)
            }
            resolve(res.data.result);
          })
          .catch(err => {reject(err)});
    })
}

export function getListFriend() {
    return new Promise((resolve, reject)=>{
        var data = {
            userID: store.getState().userReducer.user.id,
        }
        return axios.post(config.api_url+ '/chats/getListFriend', data, {headers: getHeaders()})
          .then(res => {
            if (res.data.status === 0) {
                return reject(res.data.error)
            }
            resolve(res.data.result);
          })
          .catch(err => {reject(err)});
    })
}

