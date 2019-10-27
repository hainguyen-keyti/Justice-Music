import React from 'react';
import { notification, Spin } from 'antd';
import config from '../config';
import {store} from '../store';

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