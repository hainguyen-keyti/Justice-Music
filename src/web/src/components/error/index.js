import React from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';

class ComponentError extends React.Component {
  render() {
    const {title, subTitle, goTo, func} = this.props
    return (
      <Result
      status="error"
      title={title}
      subTitle={subTitle}
      extra={[
        <Button type="primary" onClick={()=>{
          this.props.history.push(`/${goTo}`)
          func()  // Normally handle error function in redux
        }}>
          Go to {goTo}
        </Button>
      ]}
    />
    )
  }
}
export default withRouter(ComponentError)
