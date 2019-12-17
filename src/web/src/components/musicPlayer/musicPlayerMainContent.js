import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Button, Slider, Avatar, Dropdown, Tooltip } from 'antd';
import './index.css'
import Duration from './duration'
import Typography from 'antd/lib/typography/Typography';
import { connect} from 'react-redux'


class MusicPlayerMainContent extends Component {
  state = {
    totalSeconds: 0,
    loop: true,
    playing: true,
    playingIcon: 'pause',
    loopIcon: 'redo',
    loadingInfo: {},
    volume: 0.3
  };  

  onHandleClickPlaying = () => {
    const { playing, playingIcon } = this.state;
    this.setState({
      playing: !playing,
      playingIcon: (playingIcon === 'pause') ? 'caret-right' : 'pause',
    })
  }
  onHandleClickLoop = () => {
    const { loop, loopIcon } = this.state;
    this.setState({
      loop: !loop,
      loopIcon: (loopIcon === 'redo') ? 'close' : 'redo',
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

  onChangeVolume = value => {
    // console.log('change', value)
    if (isNaN(value)) {
      return;
    }
    this.setState({
      volume: value/100,
    });
  };
  
  Tooltip = value => {
    return <Duration seconds={value}/>
  }

  ref = player => {
    this.player = player
  }
  render () {
    const { totalSeconds, playing, loop, playingIcon, loopIcon, loadingInfo, volume } = this.state;
    const { isDetail, imageHash, musicHash } = this.props
    // const menu = (
    //   <Menu>
    //       <Menu.Item>
    //           <BuyMusic idFile={idFile}/>
    //       </Menu.Item>
    //       <Menu.Item>
    //           <InvestISO idFile={idFile}/>
    //       </Menu.Item>
    //       <Menu.Item>
    //           <UsingISO disabled={(this.props.appReducer.musicSelected.userUpload !== this.props.userReducer.user.id) ? true : false} idFile={idFile}/>
    //       </Menu.Item>
    //   </Menu>
    // );
    return (
        <div className={isDetail ? "detailPlayer" : "nowPlayer"}>
            <ReactPlayer
            ref={this.ref}
            volume={volume}
            loop={loop}
            url={window.$linkIPFS + musicHash}
            playing={playing}
            width='0'
            height='0'
            onProgress={(data)=>{this.setState({loadingInfo: data})}}
            onDuration={(data)=>{this.setState({totalSeconds: data})}}
            />
            <Button shape="circle" size="large" icon="step-backward" className="icon-formart"/>
            <Tooltip title={playing ? "Play" : "Stop"}>
                <Button shape="circle" size="large" icon={playingIcon} className="icon-formart" onClick={()=>{this.onHandleClickPlaying()}} />
            </Tooltip>
            <Button shape="circle" size="large" icon="step-forward" className="icon-formart"/>
            <Tooltip title={loop ? "Loop" : 'No Loop'}>
                <Button shape="circle" size="large" icon={loopIcon} className="icon-formart" onClick={()=>{this.onHandleClickLoop()}}/>
            </Tooltip>
            <Avatar size={50} style={{marginLeft: 20}} src={window.$linkIPFS + imageHash} alt="Avatar photo"/>
            <Slider
                tipFormatter={this.Tooltip}
                min={0}
                max={totalSeconds}
                onChange={this.onChangeSeek}
                value={typeof loadingInfo.playedSeconds === 'number' ? loadingInfo.playedSeconds : 0}
                style={{width: '300px', marginLeft: 10}}
                step={0.000001} 
            />
            <Duration seconds={loadingInfo.playedSeconds ? loadingInfo.playedSeconds : 0}/>
            <Typography>/</Typography>
            <Duration seconds={totalSeconds}/>
            <Dropdown 
                overlay={<div style={{display: 'inline-block', height: 100}}><Slider onChange={this.onChangeVolume} vertical defaultValue={30}/></div>} 
                placement="topCenter">
            <Button style={{marginLeft: 10}} shape="circle" type="default" icon="bell" />
            </Dropdown>
            {/* <Dropdown 
                overlay= {menu}
                placement="topLeft">
                <Button style={{marginLeft: 10}} shape="circle" type="default" icon="ellipsis" />
            </Dropdown> */}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerMainContent)