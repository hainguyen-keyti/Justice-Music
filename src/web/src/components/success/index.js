import React from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';

export default class ComponentSuccess extends React.Component {
  render() {
    return (
      <Result
      status="success"
      title={this.props.title}
      subTitle={this.props.subTitle}
      extra={[
        <Button type="primary" onClick={()=>this.props.history.push('/home')}>
          Go to homepage
        </Button>
      ]}
    />
    )
  }
}
