import React, { Component } from 'react'
import Layout from '../../components/layout'
import ContractContent from './ContractContent'

export default class Contract extends Component {
  render () {
    return (
        <Layout main={<ContractContent/>} history={this.props.history}/>
    )
  }
}