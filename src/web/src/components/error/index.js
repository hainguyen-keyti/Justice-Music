import React from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';

class ComponentError extends React.Component {
  render() {
    return (
      <Result
      status="error"
      title={this.props.title}
      subTitle={this.props.subTitle}
      extra={[
        <Button type="primary" onClick={()=>{
          this.props.history.push('/setting')
          this.props.handleError()
          }}>
          Go to setting again!
        </Button>
      ]}
    />
    )
  }
}
export default withRouter(ComponentError)
