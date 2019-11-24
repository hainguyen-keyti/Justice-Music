import React from 'react';
import { Result } from 'antd';
import 'antd/dist/antd.css';

export default class ComponentError extends React.Component {
  render() {
    return (
      <Result
        status="error"
        title={this.props.title}
        subTitle={this.props.subTitle}
      />
    )
  }
}
