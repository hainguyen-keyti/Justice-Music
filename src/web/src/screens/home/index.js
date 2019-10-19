import React, { Component } from 'react'
import Layout from '../../components/layout'
import HomeContent from '../home/HomeContent'

export default class Home extends Component {
  render () {
    return (
        <Layout main={<HomeContent/>} history={this.props.history}/>
    )
  }
}