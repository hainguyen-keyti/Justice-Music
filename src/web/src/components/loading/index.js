import React from 'react';
import { Result, Icon } from 'antd';
import 'antd/dist/antd.css';

export default class ComponentLoading extends React.Component {
  render() {
    return (
      <Result
      icon={<Icon type="loading" />}
      title="Please wait a second ..."
      // extra={<Button type="primary">Next</Button>}
      />
    )
  }
}
