import React, { Component } from 'react'
import {
  Row,
  Col,
  Avatar,
  Typography,
  Tabs,
  Icon,
  Button
 } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import DataTable from './DataTable'
import ISOAddress from '../../components/ISOAddress'
import ComponentLoading from '../../components/loading'
import Component404 from '../../components/404'
import {getUserPage, set_is_follow_page} from '../../actions/page'
import { connect} from 'react-redux'
import FollowButton from '../../components/followButton'
import IconText from '../../components/icon-text'

const { TabPane } = Tabs;
const { Title, Text } = Typography;

class PageContent extends Component {
  componentWillReceiveProps({userName}){
    if (userName != this.props.userName) {
      this.props.getUserPage(userName)
    }
  }

  componentDidMount(){
    this.props.getUserPage(this.props.userName)
  }
  render() {
    if (this.props.pageReducer.errorPage) return (<Component404 history={this.props.history} subTitle="Page not found. Please try another link!"></Component404>)
    if (!this.props.pageReducer.userInfoData) return (<ComponentLoading/>)
    const {follow, phone, otherInfomaion, avatar, nickName, _id, isFollowed} = this.props.pageReducer.userInfoData
    const operations = <FollowButton ownerSongID={_id} isFollowed={isFollowed} isPage={true}/>
    return (
        <div>
          <Row>
            <Col span={24}>
                <div className="img-background"/>
            </Col>
          </Row>
          <Row style={{paddingTop: '15px'}}>
            <Col span={6}>
              <div className="logo-name">
                <div style={{padding: '15px'}}>
                  <Avatar size={160} src={window.$linkIPFS + avatar} alt="Avatar photo"/>
                </div>
                <div>
                  <Title level={4}>{nickName}</Title>
                  <Text type="secondary">{follow} Follow</Text>
                </div>
              </div>
              {
                otherInfomaion ?

                <IconText />
                // <Button type="link" ghost icon="phone" onClick={this.showModal}>
                //   <Text>{phone}</Text>
                // </Button>

              //   <div className="info-icon">
              //     <a href="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C" className="line-space">
              //       <Icon className="icon-style" type="phone"  />
              //       <Text ellipsis type="secondary">{phone}</Text>
              //     </a>
              //     {
              //       otherInfomaion.youtube ? 
              //       <a href="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C" className="line-space">
              //         <Icon className="icon-style" type="youtube"  />
              //         <Text ellipsis type="secondary">{otherInfomaion.youtube}</Text>
              //       </a> :
              //       null
              //     }
              //     {
              //       otherInfomaion.facebook ? 
              //       <a href="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C" className="line-space">
              //         <Icon className="icon-style" type="facebook"  />
              //         <Text ellipsis type="secondary">{otherInfomaion.facebook}</Text>
              //       </a> :
              //       null
              //     }
              //     {
              //       otherInfomaion.home ?
              //       <a href="https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C" className="line-space">
              //         <Icon className="icon-style" type="home"  />
              //         <Text ellipsis type="secondary">{otherInfomaion.home}</Text>
              //       </a> :
              //       null
              //     }
              // </div> 
              :
              null
              }
            </Col>
              <Col span={18}>
                <Tabs tabBarExtraContent={operations}>
                  <TabPane tab="Bài hát đã đăng" key="1">
                    <DataTable tableUpload={true} pageName={nickName}/>
                  </TabPane>
                  <TabPane tab="ISO" key="2">
                      <ISOAddress/>
                  </TabPane>
                  <TabPane tab="Bài hát đã mua" key="3">
                    <DataTable pageName={nickName}/>
                  </TabPane>
                  <TabPane tab="Sự kiện" key="4">
                    Content of tab 1
                  </TabPane>
                </Tabs>
              </Col>
          </Row>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pageReducer: state.pageReducer,
  userReducer: state.userReducer
})

const mapDispatchToProps = (dispatch) => ({
  getUserPage: (userName)=>dispatch(getUserPage(userName)),
  set_is_follow_page: (setFollow)=>dispatch(set_is_follow_page(setFollow)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PageContent);