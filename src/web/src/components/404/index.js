import React from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';

export default class Component404 extends React.Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle={this.props.subTitle}
        extra={<Button type="primary" onClick={()=> this.props.history.push('/home')}>Back Home</Button>}
      />
    )
  }
}
