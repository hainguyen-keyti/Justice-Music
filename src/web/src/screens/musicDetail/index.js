import React, { Component } from 'react'
import Layout from '../../components/layout'
import MusicDetailContent from './MusicDetailContent'

export default class MusicDetail extends Component {
  render () {
    return (
        <Layout main={<MusicDetailContent/>} history={this.props.history}/>
    )
  }
}