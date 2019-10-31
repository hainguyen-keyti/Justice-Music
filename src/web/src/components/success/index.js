import React from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';

export default class ComponentLoading extends React.Component {
  render() {
    return (
      <Result
      status="success"
      title={this.props.title}
      subTitle={this.props.subTitle}
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
    )
  }
}
