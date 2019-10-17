import React, { Component } from 'react'
import Header from './header'
import MusicPlayer from '../musicPlayer'

export default class Layout extends Component {
  render () {
    return (
      <div style={{display: 'block'}}>
        <Header/>
        <div style={{display: 'flex', justifyContent: 'center', padding: 10, marginTop: 10}}>
          <div style={{width: 1100}}>
            {this.props.main}
          </div>
        </div>
        <MusicPlayer/>
        {/* <Footer/> */}
      </div>
    )
  }
}