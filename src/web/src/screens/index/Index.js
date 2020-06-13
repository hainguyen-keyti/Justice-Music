import React, { Component } from 'react'
import './Index.css'
import logo from '../../images/logo.png'
import { Typography } from 'antd';
const { Text } = Typography;


export default class Index extends Component {

    render() {
        return (
            <div class="view">
              <img src={logo} alt="Justice music" style={{ width: "70px", height: "70px"}} />
              <a class="plane main" href='login'>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
              </a>
          </div>
        )
    }
}
