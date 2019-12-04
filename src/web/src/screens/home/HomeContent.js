
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { 
  Row,
  Col,
  Carousel,
  Avatar,
  Typography,

 } from 'antd';
import {connect} from 'react-redux';
import Ranking from '../../components/ranking'

const { Text } = Typography;

class HomeContent extends Component {
  render() {
    return (
    <div >
      <Row gutter={[8, 32]}>
        <Carousel autoplay>
          <div>
            <img style={{width: '100%', height: '400px', repeat: 'no-repeat', size: 'cover', position: 'center center'}} alt="Music test" src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', repeat: 'no-repeat', size: 'cover', position: 'center center'}} alt="Music test" src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', repeat: 'no-repeat', size: 'cover', position: 'center center'}} alt="Music test" src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', repeat: 'no-repeat', size: 'cover', position: 'center center'}} alt="Music test" src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
          </div>
        </Carousel>        
      </Row>
    
      <Row gutter={[8, 32]} style={{marginTop: 20}}>
        <Col span={17}>

            <Row gutter={[8, 32]}>
              <h1> Hôm nay nghe gì</h1> 
            </Row>

            <Row gutter={[8, 32]}>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
              <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
            </Row>

            <Row gutter={[8, 32]}>
              <h1> Mới phát hành</h1> 
            </Row>

            <Row gutter={[8, 32]}>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
              <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
            </Row>

            <Row gutter={[8, 32]}>
              <h1> Nghe nhiều nhất </h1> 
            </Row>

            <Row gutter={[8, 32]}>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
              <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.io/ipfs/QmQczzwhLgyTrWtboqCswDqcFTt2t8kLDRP9iGQc18S7YT"/>
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
  
})

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);