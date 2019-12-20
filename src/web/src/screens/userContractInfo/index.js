import React, { Component } from 'react'
import Layout from '../../components/layout'
import UserContractInfoContent from './UserContractInfoContent'

export default class UserContractInfo extends Component {
  render () {
    return (
        <Layout main={<UserContractInfoContent/>} history={this.props.history}/>
    )
  }
}