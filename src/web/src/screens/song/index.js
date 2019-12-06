import React, { Component } from 'react'
import Layout from '../../components/layout'
import SongContent from './SongContent'

export default class Song extends Component {
  render () {
    return (
        <Layout main={<SongContent idFile={this.props.match.params.idFile}/>} history={this.props.history}/>
    )
  }
}