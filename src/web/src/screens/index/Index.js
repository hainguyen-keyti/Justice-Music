import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './Index.css'
import logo from '../../images/logo.png'

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
