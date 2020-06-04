
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
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
import UsingISO from '../../components/usingISO';
import TextText from '../../components/text-text';
import InputLyric from '../../components/inputLyric';
import {getSongByID, getSongSameSinger, getRelatedUser} from '../../actions/song';
import ComponentLoading from '../../components/loading'
import FollowButton from '../../components/followButton'
import { withRouter } from 'react-router';
import {formatThousands} from '../../utils/common'
import Component404 from '../../components/404'
import {postViewMusic} from '../../api/userAPI'
import MusicCard from '../../components/musicCard'
import StyleLoadingCard from '../../components/musicCard/styleLoadingCard'
import UserHomeCard from '../../components/userHomeCard'
import StyleLoadingCardUser from '../../components/userHomeCard/styleLoadingCardUser'

const { Paragraph, Text, Title} = Typography;
const { Countdown } = Statistic;
const { Meta } = Card;
class SongContent extends React.Component {

  componentWillReceiveProps({idMongo}){
    if (idMongo !== this.props.idMongo) {
      this.props.getSongByID(idMongo)
    }
  }
  componentDidMount(){
    console.log(this.props.idMongo)
    this.props.getSongByID(this.props.idMongo)
    this.props.getRelatedUser()
    postViewMusic({idSongMongo: this.props.idMongo})
  }

  render() {
    const {songInfo, songSameSingerData, relatedUserData, error} = this.props.songReducer
    if (error) return (<Component404 history={this.props.history} subTitle="Song not found. Please try another link!"></Component404>)
    if (!songInfo) return (<ComponentLoading/>)
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
              <MusicPlayerMainContent musicHash={songInfo.hash} imageHash={songInfo.image} isDetail/>
            </Row>
            <Row style={{padding: 5, margin: 5}}>
              <Col span={8}>
                <Row>
                  <Meta 
                    style={{paddingBottom: 10}} 
                    avatar={<Avatar size={59} src={window.$linkIPFS + songInfo.userUpload.avatar}/>}
                    title={ 
                    <Button style={{textAlign: 'left', padding: 0, fontSize: 16}}  type="link" onClick={() => this.props.history.push(`/page/${songInfo.userUpload.addressEthereum}`)}>
                      <Text style={{fontSize: 18}} type="warning">{songInfo.userUpload.nickName}</Text>
                    </Button>
                    } 
                    description={<Text> {formatThousands(songInfo.follow)} Follow </Text>} 
                    />
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <Avatar shape='square' size={220} src={window.$linkIPFS + songInfo.image} alt="Music photo"/>
                  <Tooltip title={songInfo.name} placement="leftTop">
                    <Paragraph strong style={{fontSize: '20px', margin: '15px'}} ellipsis={{ rows: 2}}>
                      {songInfo.name}
                    </Paragraph>
                  </Tooltip>

                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <TextText title='Singer' content={songInfo.artist}  link='link here'/>
                  <TextText title='Author' content='Nguyễn Hoàng Hải'  link='link here'/>
                  <TextText title='Release' content={moment(songInfo.blockTime * 1000).format('L')}/>
                  <TextText title='View' content={songInfo.view}/>
                  <TextText title='Download Total' content={songInfo.totalDownloader}/>
                  <TextText title='Download Week' content={songInfo.weekDownloader}/>
                  <TextText title='Contract Permission' content={songInfo.contractPermission ? 'Allow' : 'Not Allow' }/>
                  <TextText title='ISO' content={!songInfo.IsISO ? 'Not Use' : (moment().unix() >= songInfo.timeExpired ? 'Used' : 'Now Using')} link='link here'/>
                </Row>
              </Col>
              <Col span={16}>
                <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10, paddingBottom: 10}}>
                    <FollowButton ownerSongID={songInfo.userUpload._id} isFollowed={songInfo.isFollowed}/> 
                    <UsingISO disabled={(this.props.userReducer.user.id !== songInfo.userUpload._id) ? true : false} idFile={songInfo.idFile}/> 
                    <InputLyric disabled={(this.props.userReducer.user.id !== songInfo.userUpload._id) ? true : false} idMongo={this.props.idMongo}/>
                    <InvestISO disabled={(moment().unix() >= songInfo.timeExpired) ? true : false} idFile={songInfo.idFile}/>
                    <BuyMusic idFile={songInfo.idFile}/>
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Title level={4} type="secondary"> LYRIC  </Title>
                  <div style={{width: '100%', maxHeight: 250, backgroundColor: 'rgb(239, 242, 245)', overflow: 'auto'}}>
                    <div style={{padding: 5, margin: 5}} dangerouslySetInnerHTML={{__html: songInfo.lyric}} />
                  </div>
                </Row>
                <Row style={{padding: 3, marginTop: 20}}>
                  <Title level={4} type="secondary"> INITIAL SONG OFFERING (ISO) INFOMATION </Title>
                  {songInfo.IsISO ? 
                  <div>
                  <Countdown valueStyle={{fontSize: '17px', textAlign: 'center', margin: '5px'}} value={songInfo.timeExpired * 1000} format="D Ngày H Giờ m Phút s" />
                  <Progress
                    style={{paddingRight: '10px', margin: '5px'}}
                    strokeColor={{
                      from: '#108ee9',
                      to: '#FF5733',
                    }}
                    percent={Number(parseFloat(100 - (songInfo.amountRemaining * 100 / songInfo.offerAmount)).toFixed(1))}
                    status="active"
                    showInfo
                  />
                  <TextText title='Progress' content={formatThousands(songInfo.offerAmount - songInfo.amountRemaining) + ' / ' + formatThousands(songInfo.offerAmount) + ' HAK'}/>
                  <TextText title='Total Offer Amount' content={formatThousands(songInfo.offerAmount) + ' HAK'}/>
                  <TextText title='Total Offer Percent' content={parseFloat(songInfo.offerPercent / 1000).toFixed(3) + '%'}/>
                  <TextText title='Amount Remaining' content={formatThousands(songInfo.amountRemaining) + ' HAK'}/>
                  <TextText title='Owner Percent Remaining' content={parseFloat(songInfo.ownerPercent / 1000).toFixed(3) + '%'}/>
                  <TextText title='Invest table' content=''/>
                  <Table rowKey={(record) => record.idFile} columns={columns} dataSource={songInfo.investListISO} pagination={false}/>
                  </div>
                  :
                  <Text> This song is not using ISO yet. </Text>
                  }
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Row >
                    <Button style={{textAlign: 'left', padding: 0, fontSize: '20px'}}  type="link" onClick={() => {}}>
                      <Title level={4} type="secondary">SONG WITH THE SAME SINGER >>></Title>
                    </Button>
                  </Row>
                  <Row gutter={[8, 0]} type="flex" justify="space-around">
                    {songSameSingerData  ?
                    (
                      songSameSingerData.length === 0 ? <Text> This user just have this song! </Text>
                      :
                      songSameSingerData.map((record) => {
                        return <Col key={record._id} span={8} style={{width: 170, marginTop: 20}}><MusicCard songInfo={record}/></Col>
                      })
                    )
                      
                      :
                      <React.Fragment>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                      </React.Fragment>
                    }
                  </Row>
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Row >
                    <Button style={{textAlign: 'left', padding: 0, fontSize: '20px'}}  type="link" onClick={() => {}}>
                      <Title level={4} type="secondary">RELATED ARTIST >>></Title>
                    </Button>
                  </Row>

                  <Row gutter={[8, 0]} type="flex" justify="space-around">
                    {relatedUserData ?
                      relatedUserData.map((record) => {
                        return <Col span={6} style={{width: 170, marginTop: 20}}><UserHomeCard songPage={true} user={record}/></Col>
                      })
                      :
                      <React.Fragment>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                      </React.Fragment>
                    }
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
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getSongByID: (idMongo) => dispatch(getSongByID(idMongo)),
  getSongSameSinger: (data) => dispatch(getSongSameSinger(data)),
  getRelatedUser: () => dispatch(getRelatedUser())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongContent));