import React, { Component } from 'react'
import Layout from '../../components/layout'
import SongContent from './SongContent'

export default class Song extends Component {
  render () {
    return (
        <Layout main={<SongContent idMongo={this.props.match.params.idMongo}/>} history={this.props.history}/>
    )
  }
}