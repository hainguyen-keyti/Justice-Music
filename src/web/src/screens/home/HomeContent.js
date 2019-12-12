
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
  Tooltip
 } from 'antd';
import {connect} from 'react-redux';
import Ranking from '../../components/ranking'

const { Text, Title } = Typography;
const { Meta } = Card;

class HomeContent extends Component {
  render() {
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
          <Title level={4} type="secondary"> NỔI BẬT TRONG TUẦN </Title>
        </Row>

        <Row gutter={[8, 32]}>
          <Col span={6}>
                  <Card
                    hoverable
                    onClick={()=> alert("hiihihi")}
                    size="small"
                    // style={{ width: 250, display: 'flex', margin: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
                    cover={<img className="img-background-music" alt="music background" src={window.$linkIPFS + "Qmc1qzzq83TfQQcLNtAbEGThQiBqP4EFgmtuotndbVZ8T1"}/>}
                    bodyStyle={{padding: '10px'}}
                    bordered={false}
                  >
                  <Meta 
                    title={
                      <Tooltip style={{display: 'flex', flexDirection: 'column'}} title="Name song" placement="top" onClick={() => this.props.history.push(`/page/hai.keyti.97`)} >
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Button style={{textAlign: 'left', padding: 0, fontSize: 13, height: 20,  width: '100%'}}  type="link" >VÌ YÊU CỨ ĐÂM ĐẦU, ĐÂM ĐẦU, ĐÂM ĐẦU</Button>
                        <Text style={{fontSize: 13}} type="secondary"> Keyti Nguyễn </Text>
                      </div>
                      </Tooltip>
                      }
                    description={
                      <Tooltip style={{display: 'flex'}} title="temppppp" placement="bottom" onClick={() => this.props.history.push(`/page/hai.keyti.97`)} >
                        <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + "QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"} />
                        
                        <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '80%'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >Keyti Nguyễn</Text></Button>
                      </Tooltip>
                    }
                  />
                </Card>
              </Col>
              <Col span={6}>
              
              <Card
                    hoverable
                    onClick={()=> alert("hiihihi")}
                    size="small"
                    // style={{ width: 250, display: 'flex', margin: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
                    cover={<img className="img-background-music" alt="music background" src={window.$linkIPFS + "QmXwaYPZnNpjMYh8UhiHmp7XWhtXH62tfiR5rAHpPxhqpb"}/>}
                    bodyStyle={{padding: '10px'}}
                    bordered={false}
                  >
                  <Meta 
                    title={
                      <Tooltip style={{display: 'flex', flexDirection: 'column'}} title="Name song" placement="top" onClick={() => this.props.history.push(`/page/hai.keyti.97`)} >
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Button style={{textAlign: 'left', padding: 0, fontSize: 13, height: 20,  width: '100%'}}  type="link" >VÌ YÊU CỨ ĐÂM ĐẦU, ĐÂM ĐẦU, ĐÂM ĐẦU</Button>
                        <Text style={{fontSize: 13}} type="secondary"> Keyti Nguyễn </Text>
                      </div>
                      </Tooltip>
                      }
                    description={
                      <Tooltip style={{display: 'flex'}} title="temppppp" placement="bottom" onClick={() => this.props.history.push(`/page/hai.keyti.97`)} >
                        <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + "QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"} />
                        
                        <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '80%'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >Keyti Nguyễn</Text></Button>
                      </Tooltip>
                    }
                  />
                </Card>

              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
            </Row>

            <Row gutter={[8, 32]}>
              <Title level={4} type="secondary"> NGHE NHIỀU </Title>
            </Row>

            <Row gutter={[8, 32]}>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
              <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
            </Row>

            <Row gutter={[8, 32]}>
              <Title level={4} type="secondary"> MỚI PHÁT HÀNH </Title>
            </Row>

            <Row gutter={[8, 32]}>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
              <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
              </Col>
              <Col span={6}>
                <Avatar shape="square" size={160} src="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"/>
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
  
})

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);