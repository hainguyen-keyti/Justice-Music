import React, { Component } from 'react'
import Layout from '../../components/layout'
import PageContent from './PageContent'

export default class Page extends Component {
  render () {
    return (
        <Layout main={<PageContent userName={this.props.match.params.userName} history={this.props.history}/>} history={this.props.history}/>
    )
  }
}