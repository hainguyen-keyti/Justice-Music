import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Card, Button, Slider, Avatar } from 'antd';
import './index.css'
import Duration from './duration'
import Typography from 'antd/lib/typography/Typography';
import { connect} from 'react-redux'

class MusicPlayer extends Component {
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
      <div style={{visibility: this.props.appReducer.musicSelected ? '' : 'hidden'}}>
          <Card
          hoverable
          bordered={false}
          bodyStyle={{backgroundColor: '#D6DBDF', position: 'fixed', bottom: 0, width: '100vw', padding: 10 }}
          >
            <div className="player">
              <ReactPlayer
                ref={this.ref}
                url={this.props.appReducer.musicSelected}
                playing={playing}
                width='0'
                height='0'
                onProgress={(data)=>{this.setState({loadingInfo: data})}}
                onDuration={(data)=>{this.setState({totalSeconds: data})}}
              />
              <Button shape="circle" size="large" icon="step-backward" className="icon-formart"/>
              <Button shape="circle" size="large" icon={playingIcon} className="icon-formart" onClick={()=>{this.onHandleClickPlaying()}} />
              <Button shape="circle" size="large" icon="step-forward" className="icon-formart"/>
              <Button shape="circle" size="large" icon="retweet" className="icon-formart"/>
              <Avatar size={45} style={{marginLeft: 20}} src="https://ipfs.io/ipfs/QmXwrePcDqV2YR1xyJU4mpxadaQgHHMLsitBgWtZS2c9Zn" alt="Avatar photo"/>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);