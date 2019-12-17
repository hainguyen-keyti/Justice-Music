import React, { Component } from 'react'
import Layout from '../../components/layout'
import UseContractContent from './UseContractContent'

export default class UseContract extends Component {
  render () {
    return (
        <Layout main={<UseContractContent idMongo={this.props.match.params.idMongo}/>} history={this.props.history}/>
    )
  }
}