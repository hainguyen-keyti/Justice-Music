import React from 'react';
import {
    Skeleton,
  } from 'antd';
import 'antd/dist/antd.css';
export default class StyleLoadingCard extends React.Component {
  render() {
    return (
        <div>
            <Skeleton
                active
                title={false}
                avatar={{shape: 'square', size: 160}}
                paragraph={false}
            />
            
            <br/>
            
            <Skeleton
                active
                title={false}
                avatar={{size: 'small'}}
                paragraph={{rows: 1, width: 120}}
            />
        </div>
    );
  }
}