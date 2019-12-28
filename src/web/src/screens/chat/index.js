import React, { Component } from 'react'
import Layout from '../../components/layout'
import ChatContent from './Chat'

export default class Chat extends Component {
  render () {
    return (
        <Layout main={<ChatContent/>} history={this.props.history}/>
    )
  }
}