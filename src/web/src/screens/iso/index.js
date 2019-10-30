import React, { Component } from 'react'
import Layout from '../../components/layout'
import ISOContent from './ISOContent'

export default class ISO extends Component {
  render () {
    return (
        <Layout main={<ISOContent/>} history={this.props.history}/>
    )
  }
}