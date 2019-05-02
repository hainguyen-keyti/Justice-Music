import axios from 'axios';
import config from '../config';
import  {getHeaders} from '../utils/common'

export function getListMessage(receiverID){
    return new Promise((resolve, reject)=>{
        var data = {
            senderID: localStorage.getItem('userID'),
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
            userID: localStorage.getItem('userID'),
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
