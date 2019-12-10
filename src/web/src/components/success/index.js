import React from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import { connect} from 'react-redux'
import {reset_update} from '../../actions/user'

class ComponentSuccess extends React.Component {
  render() {
    return (
      <Result
      status="success"
      title={this.props.title}
      subTitle={this.props.subTitle}
      extra={[
        <Button type="primary" onClick={()=>{
          this.props.history.push('/home')
          this.props.reset_update()
        }
          }>
          Go to homepage
        </Button>
      ]}
    />
    )
  }
}
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  reset_update: ()=>dispatch(reset_update()),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentSuccess))