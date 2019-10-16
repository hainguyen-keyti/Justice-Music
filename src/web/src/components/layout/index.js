import React, { Component } from 'react'
import Header from './header'

export default class Layout extends Component {
  render () {
    return (
      <div style={{display: 'block'}}>
        <Header/>
        <div style={{display: 'flex', justifyContent: 'center', padding: 10, marginTop: 10}}>
          <div style={{width: 1100, height: 4000, backgroundColor: 'red'}}>
            {this.props.main}
          </div>
        </div>
        <Header/>
      </div>
    )
  }
}