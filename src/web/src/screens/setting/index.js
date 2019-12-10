import React, { Component } from 'react'
import Layout from '../../components/layout'
import SettingContent from './SettingContent'

export default class Setting extends Component {
  render () {
    return (
        <Layout main={<SettingContent/>} history={this.props.history}/>
    )
  }
}