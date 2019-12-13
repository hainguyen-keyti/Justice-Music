
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
import MusicCard from '../../components/musicCard'
import StyleLoadingCard from '../../components/musicCard/styleLoadingCard'
import {set_music_selected, getHomeSongs} from '../../actions/app'

const { Text, Title } = Typography;
const { Meta } = Card;

class HomeContent extends Component {
  componentDidMount(){
    this.props.getHomeSongs()
  }
  render() {
    const {appReducer} = this.props
    return (
    <div >
      <Row gutter={[8, 32]}>
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
    
      <Row gutter={[8, 32]} style={{marginTop: 20}}>
        <Col span={17}>

            <Row gutter={[8, 32]}>
              <Title level={4} type="secondary"> NGHE NHIỀU </Title>
            </Row>

            <Row gutter={[8, 32]}>
              <Col span={6} style={{width: 190}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostView[0]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostView[1]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostView[2]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostView[3]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
            </Row>

            <Row gutter={[8, 32]}>
              <Title level={4} type="secondary"> MỚI PHÁT HÀNH </Title>
            </Row>

            <Row gutter={[8, 32]}>
              <Col span={6} style={{width: 190}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostNew[0]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostNew[1]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostNew[2]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
              <Col span={6} style={{width: 190}}>
                {appReducer.homeData  ?
                  <MusicCard songInfo={appReducer.homeData.mostNew[3]}/>
                :
                  <StyleLoadingCard/>
                }
              </Col>
            </Row>


            <Row gutter={[8, 32]}>
              <Title level={4} type="secondary"> CÁC CA SĨ NỔI BẬT </Title>
            </Row>

            <Row gutter={[8, 32]}>
              <Col span={6}>
                <Avatar shape="circle" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
              <Avatar shape="circle" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
                <Avatar shape="circle" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
                <Avatar shape="circle" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
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
  set_music_selected: (musicSelected)=>dispatch(set_music_selected(musicSelected)),
  getHomeSongs: ()=>dispatch(getHomeSongs())
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);