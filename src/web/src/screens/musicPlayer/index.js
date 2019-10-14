import React, { Component } from 'react'
import ReactPlayer from 'react-player'

export default class PageMusicPlayer extends Component {
  render () {
    return (
      <div>
         <ReactPlayer url='https://ipfs.io/ipfs/Qmd6GcyBLsYwCSMANcnFBAnWc8nuqxwSvJSYU7rPDkCRJ3' playing />
         <h1>hahaha</h1> 
      </div>
    )
  }
}