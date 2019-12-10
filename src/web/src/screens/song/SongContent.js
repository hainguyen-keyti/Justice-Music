
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
  Table,
  Progress,
  Statistic
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
import { withRouter } from 'react-router';
import {formatThousands} from '../../utils/common'
import Component404 from '../../components/404'

const { Paragraph, Text, Title} = Typography;
const { Countdown } = Statistic;
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
    const {songData, error} = this.props.songReducer
    if (error) return (<Component404 history={this.props.history} subTitle="Song not found. Please try another link!"></Component404>)
    if (!songData) return (<ComponentLoading/>)
    const columns = [
      {
        title: 'Address',
        dataIndex: 'investor',
        key: 'address',
        ellipsis: true,
        render: address => <Button  style={{textAlign: 'left', padding: 0}}  type="link" onClick={() => this.props.history.push(`/page/${address}`)}>{address}</Button>
      },
      {
        title: 'Invest percent',
        dataIndex: 'percentage',
        key: 'percent',
        render: percent => <Text>{parseFloat(percent / 1000).toFixed(3)} %</Text>,
      },
      {
        title: 'Invest Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: amount => <Text>{formatThousands(amount)} HAK</Text>,
      }, 
    ];    
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
                  <Meta 
                    style={{paddingBottom: 10}} 
                    avatar={<Avatar size={59} 
                    src={'https://ipfs.fotra.tk/ipfs/' + songData.user.avatar} 
                    alt={songData.user.email}/>} 
                    title={ <Button style={{textAlign: 'left', padding: 0, fontSize: 16}}  type="link" onClick={() => this.props.history.push(`/page/${songData.user.addressEthereum}`)}>{songData.user.nickName}</Button>} 
                    description={<Text> {formatThousands(songData.follow)} Follow </Text>} 
                    />
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <Avatar shape='square' size={220} src={'https://ipfs.fotra.tk/ipfs/' + songData.music.image} alt="Music photo"/>
                  <Tooltip title={songData.music.name} placement="leftTop">
                    <Paragraph strong style={{fontSize: '20px', margin: '15px'}} ellipsis={{ rows: 2}}>
                      {songData.music.name}
                    </Paragraph>
                  </Tooltip>

                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <TextText title='Singer' content={songData.music.artist}  link='link here'/>
                  <TextText title='Author' content='Nguyễn Hoàng Hải'  link='link here'/>
                  <TextText title='Release' content={moment(songData.music.blockTime * 1000).format('L')}/>
                  <TextText title='View' content={songData.music.view}/>
                  <TextText title='Download Total' content={songData.music.totalDownloader}/>
                  <TextText title='Download Week' content={songData.music.weekDownloader}/>
                  <TextText title='Contract Permission' content={songData.music.contractPermission ? 'Allow' : 'Not Allow' }/>
                  <TextText title='ISO' content={!songData.music.IsISO ? 'Not Use' : (moment().unix() >= songData.timeExpired ? 'Used' : 'Now Using')} link='link here'/>
                </Row>
              </Col>
              <Col span={16}>
                <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10, paddingBottom: 10}}>
                    <FollowButton ownerSongID={songData.user._id} isFollowed={songData.isFollowed}/>
                    <UsingISO idFile={songData.idFile}/> 
                    <InputLyric idMongo={this.props.idMongo}/>
                    <InvestISO idFile={songData.idFile}/>
                    <BuyMusic idFile={songData.idFile}/>
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Title level={4} type="secondary"> LYRIC  </Title>
                  <div style={{width: '100%', maxHeight: 250, backgroundColor: 'rgb(239, 242, 245)', overflow: 'auto'}}>
                    <div style={{padding: 5, margin: 5}} dangerouslySetInnerHTML={{__html: songData.music.lyric}} />
                  </div>
                </Row>
                <Row style={{padding: 3, marginTop: 20}}>
                  <Title level={4} type="secondary"> INITIAL SONG OFFERING (ISO) INFOMATION </Title>
                  {songData.music.IsISO ? 
                  <div>
                  <Countdown valueStyle={{fontSize: '17px', textAlign: 'center', margin: '5px'}} value={songData.timeExpired * 1000} format="D Ngày H Giờ m Phút s" />
                  <Progress
                    style={{paddingRight: '10px', margin: '5px'}}
                    strokeColor={{
                      from: '#108ee9',
                      to: '#FF5733',
                    }}
                    percent={Number(parseFloat(100 - (songData.amountRemaining * 100 / songData.offerAmount)).toFixed(1))}
                    status="active"
                    showInfo
                  />
                  <TextText title='Progress' content={formatThousands(songData.offerAmount - songData.amountRemaining) + ' / ' + formatThousands(songData.offerAmount) + ' HAK'}/>
                  <TextText title='Total Offer Amount' content={formatThousands(songData.offerAmount) + ' HAK'}/>
                  <TextText title='Total Offer Percent' content={parseFloat(songData.offerPercent / 1000).toFixed(3) + '%'}/>
                  <TextText title='Amount Remaining' content={formatThousands(songData.amountRemaining) + ' HAK'}/>
                  <TextText title='Owner Percent Remaining' content={parseFloat(songData.ownerPercent / 1000).toFixed(3) + '%'}/>
                  <TextText title='Invest table' content=''/>
                  <Table columns={columns} dataSource={songData.investListISO} pagination={false}/>
                  </div>
                  :
                  <Text> This song is not using ISO yet. </Text>
                  }
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Row >
                    <Button style={{textAlign: 'left', padding: 0, fontSize: '20px'}}  type="link" onClick={() => {}}>
                      <Title level={4} type="secondary">SONG WITH THE SINGER >>></Title>
                    </Button>
                  </Row>
                  <Row style={{paddingRight: '10px', margin: '5px'}}>
                    <Col span={8}>
                      <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
                    </Col>
                    <Col span={8}>
                    <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
                    </Col>
                    <Col span={8}>
                      <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
                    </Col>
                  </Row>
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Row >
                    <Button style={{textAlign: 'left', padding: 0, fontSize: '20px'}}  type="link" onClick={() => {}}>
                      <Title level={4} type="secondary">RELATED SONGS >>></Title>
                    </Button>
                  </Row>
                  <Row style={{paddingRight: '10px', margin: '5px'}}>
                    <Col span={8}>
                      <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
                    </Col>
                    <Col span={8}>
                    <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
                    </Col>
                    <Col span={8}>
                      <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
                    </Col>
                  </Row>
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