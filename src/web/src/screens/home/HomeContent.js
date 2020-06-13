
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { 
  Row,
  Col,
  Carousel,
  Typography,
 } from 'antd';
import {connect} from 'react-redux';
import Ranking from '../../components/ranking'
import UserHomeCard from '../../components/userHomeCard'
import StyleLoadingCardUser from '../../components/userHomeCard/styleLoadingCardUser'
import MusicCard from '../../components/musicCard'
import StyleLoadingCard from '../../components/musicCard/styleLoadingCard'
import { getHomeSongs, getHotUsers} from '../../actions/app'

const { Title } = Typography;

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
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Music test" src={window.$linkIPFS + "QmQC6LX7it5PcFbv9JMR39wBLufwZdeoJwLi3Qq2Lt5Uij"}/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Music test" src={window.$linkIPFS + "QmVvSiFcsDo29Pd1G5H8JYLfqvd1nfjXd4MXVKdqpX2v1f"}/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Music test" src={window.$linkIPFS + "QmaotCLfgxo9V7h4hgojykq1Mw4nFpKzU1NHwjAbqvdYTN"}/>
          </div>
        </Carousel>
              
      </Row>
    
      <Row gutter={[24, 0]} style={{marginTop: 20}}>
        <Col span={17}>

            <Row gutter={[8, 0]} style={{marginTop: 20}}>
              <Title level={4} type="secondary">THE MOST HEAD SONG</Title>
            </Row>
            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {appReducer.homeData  ?
                appReducer.homeData.mostView.map((record) => {
                  return <Col key={record._id} span={6} style={{width: 190, marginTop: 20}}><MusicCard songInfo={record}/></Col>
                })
                :
                <React.Fragment>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                </React.Fragment>
              }
            </Row>

            <Row gutter={[8, 0]} style={{marginTop: 20}} >
              <Title level={4} type="secondary">NEW RELEASE</Title>
            </Row>

            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {appReducer.homeData  ?
                appReducer.homeData.mostNew.map((record) => {
                  return <Col key={record._id} span={6} style={{width: 190, marginTop: 20}}><MusicCard songInfo={record}/></Col>
                })
                :
                <React.Fragment>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                </React.Fragment>
              }
            </Row>

            <Row  gutter={[8, 0]} style={{marginTop: 20}}>
              <Title level={4} type="secondary">HOT SINGER</Title>
            </Row>

            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {(appReducer.hotUserData) ?
                appReducer.hotUserData.map((record) => {
                  return <Col key={record._id} span={6} style={{width: 180, marginTop: 20}}><UserHomeCard user={record}/></Col>
                })
                :
                <React.Fragment>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                </React.Fragment>
              }
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