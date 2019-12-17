import React, { Component } from 'react'
import './Index.css'

export default class Index extends Component {

    render() {
        return (
            <div class="view">
            <div class="plane main" onClick={()=>this.props.history.push('/login')}>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </div>
        )
    }
}
