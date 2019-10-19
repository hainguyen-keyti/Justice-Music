import React, { Component } from 'react'
import Layout from '../../components/layout'
import PageContent from './PageContent'

export default class Page extends Component {
  render () {
    return (
        <Layout main={<PageContent/>} history={this.props.history}/>
    )
  }
}