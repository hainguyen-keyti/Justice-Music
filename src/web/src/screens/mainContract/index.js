import React, { Component } from 'react'
import Layout from '../../components/layout'
import MainContractContent from './MainContractContent';

export default class MainContract extends Component {
  render () {
    return (
        <Layout main={<MainContractContent idContract={this.props.match.params.idContract}/>} history={this.props.history}/>
    )
  }
}