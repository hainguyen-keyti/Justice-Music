import axios from 'axios';
import config from '../config';
import  {getHeaders} from '../utils/common'

export function upload(data){
    return new Promise((resolve, reject)=>{
        return axios.post(config.api_url+ '/ethereums/upload', data, {headers: getHeaders()})
          .then(res => {
            if (res.data.status === 0) {
                return reject(res.data.error.message)
            }
            console.log("this is result" + res.data.result)
            resolve(res.data.result);
          })
          .catch(err => {
            reject(err);
          });
    })
}