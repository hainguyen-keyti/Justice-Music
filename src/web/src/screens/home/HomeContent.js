
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { 
  Row,
  Col,
  Carousel,
  Avatar,
  Typography,
  Card,
  Button,
  Tooltip,
  Skeleton
 } from 'antd';
import {connect} from 'react-redux';
import Ranking from '../../components/ranking'
import UserHomeCard from '../../components/userHomeCard'
import StyleLoadingCardUser from '../../components/userHomeCard/styleLoadingCardUser'
import MusicCard from '../../components/musicCard'
import StyleLoadingCard from '../../components/musicCard/styleLoadingCard'
import { getHomeSongs, getHotUsers} from '../../actions/app'

const { Text, Title } = Typography;
const { Meta } = Card;

class HomeContent extends Component {
  componentDidMount(){
    this.props.getHomeSongs()
    this.props.getHotUsers()
  }
  render() {
    const {appReducer} = this.props
    return (
    <div >
      <Row gutter={[8, 0]}>
        <Carousel autoplay>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Music test" src="https://ipfs.fotra.tk/ipfs/QmQ6qMBCo3yT6QQ6mbGG4VgiauzDn9tJosCBFPTDFJ2AFd"/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Music test" src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Music test" src="https://ipfs.fotra.tk/ipfs/Qmc1qzzq83TfQQcLNtAbEGThQiBqP4EFgmtuotndbVZ8T1"/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Music test" src="https://ipfs.fotra.tk/ipfs/QmUgWzqE6tJPrA1aKT7hQydgMARCe9akiX6yCDMmAHm9B1"/>
          </div>
        </Carousel>
              
      </Row>
    
      <Row gutter={[24, 0]} style={{marginTop: 20}}>
        <Col span={17}>

            <Row gutter={[8, 0]} style={{marginTop: 20}}>
              <Title level={4} type="secondary"> NGHE NHIỀU </Title>
            </Row>

            <Row gutter={[8, 60]} type="flex" justify="space-between">
              <Col span={6} style={{width: 190, marginTop: 20}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostView[0]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190, marginTop: 20}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostView[1]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190, marginTop: 20}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostView[2]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190, marginTop: 20}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostView[3]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
            </Row>

            <Row gutter={[8, 0]} style={{marginTop: 20}} >
              <Title level={4} type="secondary"> MỚI PHÁT HÀNH </Title>
            </Row>

            <Row  gutter={[8, 0]} type="flex" justify="space-between">
              <Col span={6} style={{width: 190, marginTop: 20}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostNew[0]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190, marginTop: 20}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostNew[1]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190, marginTop: 20}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostNew[2]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190, marginTop: 20}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostNew[3]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
            </Row>


            <Row  gutter={[8, 0]} gutter={[8, 0]} style={{marginTop: 20}}>
              <Title level={4} type="secondary"> CA SĨ NỔI BẬT </Title>
            </Row>

            <Row type="flex" justify="space-between">
              <Col span={6} style={{width: 180, marginTop: 20}}>
                {appReducer.hotUserData  ?
                  <UserHomeCard user={appReducer.hotUserData[0]}/>
                :
                  <StyleLoadingCardUser/>
                }
              </Col>
              <Col span={6} style={{width: 180, marginTop: 20}}>
                {appReducer.hotUserData  ?
                  <UserHomeCard user={appReducer.hotUserData[1]}/>
                :
                  <StyleLoadingCardUser/>
                }
              </Col>
              <Col span={6} style={{width: 180, marginTop: 20}}>
                {appReducer.hotUserData  ?
                  <UserHomeCard user={appReducer.hotUserData[2]}/>
                :
                  <StyleLoadingCardUser/>
                }
              </Col>
              <Col span={6} style={{width: 180, marginTop: 20}}>
                {appReducer.hotUserData  ?
                  <UserHomeCard user={appReducer.hotUserData[3]}/>
                :
                  <StyleLoadingCardUser/>
                }
              </Col>
            </Row>
        </Col>
        <Col span={7}>
          <Ranking/>
        </Col>
      </Row>
    </div>
    )
  }
}      


const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getHomeSongs: ()=>dispatch(getHomeSongs()),
  getHotUsers: ()=>dispatch(getHotUsers())
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);