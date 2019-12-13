import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'
import { log_out } from '../../actions'
import { connect} from 'react-redux'
import { BackTop } from 'antd';

class Layout extends Component {
  render () {
    return (
      <div style={{display: 'block'}}>
        <Header history={this.props.history} logOut={this.props.log_out}/>
        <div style={{display: 'flex', justifyContent: 'center', padding: 10}}>
          <div style={{width: 1100, minHeight: 'calc(100vh - 270px)', backgroundColor: '#ffffff', padding: 10}}>
            {this.props.main}
          </div>
        </div>
        <Footer/>
        <BackTop visibilityHeight='100' />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  log_out: ()=> dispatch(log_out())
})
export default connect(null, mapDispatchToProps)(Layout);