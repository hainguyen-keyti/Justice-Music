import React, { Component } from 'react'
import {
  Row,
  Col,
  Avatar,
  Typography,
  Tabs,
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
import {postViewUser} from '../../api/userAPI'

const { TabPane } = Tabs;
const { Title, Text } = Typography;

class PageContent extends Component {
  componentWillReceiveProps({userName}){
    if (userName !== this.props.userName) {
      this.props.getUserPage(userName)
    }
  }

  componentDidMount(){
    this.props.getUserPage(this.props.userName)
    postViewUser({userName: this.props.userName})
  }
  render() {
    if (this.props.pageReducer.errorPage) return (<Component404 history={this.props.history} subTitle="Page not found. Please try another link!"></Component404>)
    if (!this.props.pageReducer.userInfoData) return (<ComponentLoading/>)
    const {follow, phone, facebook, youtube, home, coverPhoto , avatar, nickName, _id, isFollowed} = this.props.pageReducer.userInfoData
    const operations = <FollowButton ownerSongID={_id} isFollowed={isFollowed} isPage={true}/> 
    return (
        <div>
          <Row>
            <Col span={24}>
                <div style={{
                    width: '100%',
                    height: '300px',
                    backgroundImage: `url('${window.$linkIPFS}${coverPhoto}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}/>
            </Col>
          </Row>
          <Row style={{paddingTop: '15px'}}>
            <Col span={6}>
              <div className="logo-name">
                <div style={{padding: '15px'}}>
                  <Avatar style={{  boxShadow: '0 0 60px 2px #f29f99'}} size={160} src={window.$linkIPFS + avatar} alt="Avatar photo"/>
                </div>
                <div>
                  <Title level={4}>{nickName}</Title>
                  <Text type="secondary">{follow} Follow</Text>
                </div>
              </div>
              {
                phone ?
                <IconText icon='phone' link="linkPhone" content={phone} />
                :
                null
              }
             {
                youtube ?
                <IconText icon='youtube' link="linkYoutube" content={youtube} />
                :
                null
              }
              {
                facebook ?
                <IconText icon='facebook' link="linkFacebook" content={facebook} />
                :
                null
              }
              {
                home ?
                <IconText icon='home' link="linkHome" content={home} />
                :
                null
              }
            </Col>
              <Col span={18}>
                <Tabs tabBarExtraContent={operations}>
                  <TabPane tab="Bài hát đã đăng" key="1">
                    <DataTable tableUpload={true} pageName={nickName}/>
                  </TabPane>
                  {/* <TabPane tab="ISO" key="2">
                      <ISOAddress/>
                  </TabPane> */}
                  <TabPane tab="Bài hát đã mua" key="3">
                    <DataTable pageName={nickName}/>
                  </TabPane>
                  <TabPane tab="Sự kiện" key="4">
                    Chưa có sự kiện nào được diễn ra
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