import React from 'react';
import {
    Skeleton,
  } from 'antd';
import 'antd/dist/antd.css';
export default class StyleLoadingCardUser extends React.Component {
  render() {
    return (
        <div>
            <Skeleton
                active
                title={false}
                avatar={{shape: 'circle', size: 180}}
                paragraph={false}
            />
            
            <Skeleton
                active
                title={{width: 130}}
                paragraph={{rows: 1, width: 180}}
            />
        </div>
    );
  }
}