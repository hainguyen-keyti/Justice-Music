import React from 'react';
import { notification, Spin } from 'antd';
import config from '../config';

const key = "updatable";


export function getHeaders() {
    var token = localStorage.getItem('accessToken')
    
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
            placement: "bottomLeft"
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