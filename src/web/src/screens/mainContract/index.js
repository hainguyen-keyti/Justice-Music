import React, { Component } from 'react'
import Layout from '../../components/layout'
import MainContractContent from './MainContractContent';

export default class MainContract extends Component {
  render () {
    return (
        <Layout main={<MainContractContent idMongo={this.props.match.params.idMongo}/>} history={this.props.history}/>
    )
  }
}