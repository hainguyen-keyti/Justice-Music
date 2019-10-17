import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Card, Button, Slider } from 'antd';
import './index.css'
import Duration from './duration'
import Typography from 'antd/lib/typography/Typography';

export default class MusicPlayer extends Component {
  state = {
    totalSeconds: 0,
    playing: true,
    playingIcon: 'pause',
    loadingInfo: {}
  };  

  onHandleClickPlaying = () => {
    const { playing, playingIcon } = this.state;
    this.setState({
      playing: !playing,
      playingIcon: (playingIcon === 'pause') ? 'caret-right' : 'pause',
    })
  }

  onChangeSeek = value => {
    // console.log('change', value)
    if (isNaN(value)) {
      return;
    }
    this.setState({
      loadingInfo: {...this.state.loadingInfo, playedSeconds: value}
    });
    this.player.seekTo(parseFloat(value))
  };

  Tooltip = value => {
    return <Duration seconds={value}/>
  }

  ref = player => {
    this.player = player
  }
  render () {
    const { totalSeconds, playing, playingIcon, loadingInfo } = this.state;
    return (
      <div>
          <Card
          hoverable
          bordered={false}
          bodyStyle={{backgroundColor: '#32323d', padding: 10, position: 'fixed', bottom: 0, width: '100vw'}}
          >
            <div className="player">
              <Button type="danger" shape="circle" size="large" icon="step-backward" className="icon-formart"/>
              <Button onClick={()=>{this.onHandleClickPlaying()}} type="danger" shape="circle" size="large" icon={playingIcon} className="icon-formart"/>
              <Button type="danger" shape="circle" size="large" icon="step-forward" className="icon-formart"/>
              <Slider
                tipFormatter={this.Tooltip}
                min={0}
                max={totalSeconds}
                onChange={this.onChangeSeek}
                value={typeof loadingInfo.playedSeconds === 'number' ? loadingInfo.playedSeconds : 0}
                style={{width: '300px'}}
                step={0.000001}
              />
                <Duration seconds={loadingInfo.playedSeconds ? loadingInfo.playedSeconds : 0}/>
                <Typography>/</Typography>
                <Duration seconds={totalSeconds}/>
            </div>
          </Card>
         <ReactPlayer
            ref={this.ref}
            url='https://ipfs.io/ipfs/Qmd6GcyBLsYwCSMANcnFBAnWc8nuqxwSvJSYU7rPDkCRJ3'
            playing={playing}
            width='0'
            height='0'
            onProgress={(data)=>{this.setState({loadingInfo: data})}}
            onDuration={(data)=>{this.setState({totalSeconds: data})}}
            />
      </div>
    )
  }
}