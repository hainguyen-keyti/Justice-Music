import React from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';

class ComponentSuccess extends React.Component {
  render() {
    const {goTo, func, title, subTitle} = this.props
    return (
      <Result
      status="success"
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={()=>{
          this.props.history.push(`/${goTo}`)
          if(func)
            func() // Normally reset function in redux
        }}>
          Go to {goTo}
        </Button>
      }
    />
    )
  }
}
export default withRouter(ComponentSuccess)