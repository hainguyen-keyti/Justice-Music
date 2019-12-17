import React, { Component } from 'react'
import Layout from '../../components/layout'
import ContractContent from './ContractContent'

export default class Contract extends Component {
  render () {
    return (
        <Layout main={<ContractContent idContract={this.props.match.params.idContract}/>} history={this.props.history}/>
    )
  }
}