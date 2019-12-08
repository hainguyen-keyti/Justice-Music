
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Icon,
  Tabs,
  Button,
  Tooltip,
  Row,
  Col,
  Card,
  Avatar,
  Typography,

} from 'antd';
import * as moment from 'moment';
import MusicPlayerMainContent from '../../components/musicPlayer/musicPlayerMainContent';
import {connect} from 'react-redux';
import BuyMusic from '../../components/buyMusic';
import InvestISO from '../../components/investISO';
import InfoISO from '../../components/infoISO';
import UsingISO from '../../components/usingISO';
import TextText from '../../components/text-text';
import InputLyric from '../../components/inputLyric';
import {getSongByID} from '../../actions/song';
import ComponentLoading from '../../components/loading'
import FollowButton from '../../components/followButton'
import { withRouter } from "react-router";

const { Paragraph, Text} = Typography;

const { Meta } = Card;
const { TabPane } = Tabs;

class SongContent extends React.Component {
  state = {
    hashAvatar: "",
  };
  componentDidMount(){
    console.log(this.props.idMongo)
    this.props.getSongByID(this.props.idMongo)
  }

  render() {
    const {songData} = this.props.songReducer 
    if (!songData) return (<ComponentLoading/>)
    return (
      <Row>
        <Row gutter={[0, 32]}>
          <Col span={18}>
            <Row>
              <MusicPlayerMainContent musicHash={songData.music.hash} imageHash={songData.music.image} isDetail/>
            </Row>
            <Row style={{padding: 5, margin: 5}}>
              <Col span={8}>
                <Row>
                  <Meta style={{paddingBottom: 10}} avatar={<Avatar size={59} src={'https://ipfs.fotra.tk/ipfs/' + songData.user.avatar} alt={songData.user.email}/>} title={songData.user.nickName} description={
                    <div className="row-space-between">
                      <Text> {songData.follow} Follow </Text>
                      <FollowButton ownerSongID={songData.user._id} isFollowed={songData.isFollowed}/>
                    </div>
                    } />
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <Avatar shape='square' size={220} src={'https://ipfs.fotra.tk/ipfs/' + songData.music.image} alt="Music photo"/>
                  <Paragraph strong style={{fontSize: '25px', margin: '15px'}} ellipsis>
                    {songData.music.name}
                  </Paragraph>
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <TextText title='Singer' content={songData.music.artist}  link='link here'/>
                  <TextText title='Author' content='Nguyễn Hoàng Hải'  link='link here'/>
                  <TextText title='Release' content={moment(songData.music.blockTime).format('L')}/>
                  <TextText title='View' content={songData.music.view}/>
                  <TextText title='Download Total' content={songData.music.totalDownloader}/>
                  <TextText title='Download Week' content={songData.music.weekDownloader}/>
                  <TextText title='Contract Permission' content={songData.music.contractPermission ? 'Allow' : 'Not Allow' }/>
                  <TextText title='ISO' content={songData.music.IsISO ? 'Used' : 'Not Use'} link='link here'/>
                </Row>
              </Col>
              <Col span={16}>
                <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                  {/* <Button size="large" type="primary" ghost>
                    <InfoISO record={songData} action={true}/>
                  </Button>               */}
                    <InvestISO idFile={songData.idFile}/>
                    <BuyMusic idFile={songData.idFile}/>
                    <UsingISO idFile={songData.idFile}/> 
                    <InputLyric idMongo={this.props.idMongo}/>
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                    <InputLyric idMongo={this.props.idMongo}/>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <div style={{backgroundColor: '#e0e0e0', height: 1000}}>
              Advertising
            </div>
          </Col>
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  songReducer: state.songReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getSongByID: (idMongo) => dispatch(getSongByID(idMongo)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongContent));