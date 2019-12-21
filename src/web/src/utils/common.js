import React from 'react';
import { notification, Spin } from 'antd';
import config from '../config';
import {store} from '../store';
import * as moment from 'moment';

const key = "updatable";


export function getHeaders() {
    var token = store.getState().userReducer.user.accessToken
    
    var headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'x-access-token': token
    }
    return headers;
}

export function showNotificationLoading(message){
    notification.open({
        key,
        description: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Spin />
            <p style={{ marginLeft: '15px' }}>{message}</p>
          </div>
        ),
        duration: 0,
        placement: "bottomLeft",
        style: {width: 350}
      });
}

export function showNotificationFail(errorMessage){
  notification.error({
    key,
    message: "Error message",
    description: errorMessage,
    duration: 0,
    placement: "bottomLeft"
  });
}

export function showNotificationTransaction(txHash){
  config.provider.waitForTransaction(txHash)
  .then(() => {
      notification.success({
          key,
          message: "Sucess Transaction",
          description: "Transaction has been successful",
          duration: 0,
          placement: "bottomLeft",
          style: {width: 350}
      });
  })
  .catch((err) => {
      notification.error({
        key,
        message: "Error Transaction",
        description: "This is error message: " + err,
        duration: 0,
        placement: "bottomLeft"
      });
  })
}

export function formatThousands(n, dp) {
  var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
  while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
  return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
}

export function estimatedTime(amountTime) {
  return (moment.unix(moment().unix() + amountTime).endOf('second').fromNow())
}