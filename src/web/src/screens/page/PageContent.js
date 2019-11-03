import React, { Component } from 'react'
import {
  Row,
  Col,
  Avatar,
  Typography,
  Tabs,
  Icon,
 } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import UploadTable from './UploadTable'
import DownloadTable from './DownloadTable'
import UploadModal from '../../components/uploadModal'
import ISOAddress from '../../components/ISOAddress'
import ComponentLoading from '../../components/loading'
import Component404 from '../../components/404'
import {getUserPage} from '../../actions/page'
import { connect} from 'react-redux'

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const operations = <UploadModal/>;
class PageContent extends Component {

  componentDidMount(){
    this.props.getUserPage(this.props.userName)
  }
  handle_error = () => {}
  render() {
    if (this.props.pageReducer.errorPage) return (<Component404 history={this.props.history} subTitle="Page not found. Please try another link!"></Component404>)
    if (!this.props.pageReducer.userInfoData) return (<ComponentLoading/>)
    const {folow, phone, otherInfomaion, avatar, nickName, addressEthereum} = this.props.pageReducer.userInfoData
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
                  <Avatar size={160} src={`https://ipfs.io/ipfs/${avatar}`} alt="Avatar photo"/>
                </div>
                <div>
                  <Title level={4}>{nickName}</Title>
                  <Text type="secondary">{folow} Theo dõi</Text>
                </div>
              </div>
              {
                otherInfomaion ?
                <div className="info-icon">
                  <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                    <Icon className="icon-style" type="phone"  />
                    <Text type="secondary">{phone}</Text>
                  </a>
                  {
                    otherInfomaion.youtube ? 
                    <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                      <Icon className="icon-style" type="youtube"  />
                      <Text type="secondary">{otherInfomaion.youtube}</Text>
                    </a> :
                    null
                  }
                  {
                    otherInfomaion.facebook ? 
                    <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                      <Icon className="icon-style" type="facebook"  />
                      <Text type="secondary">{otherInfomaion.facebook}</Text>
                    </a> :
                    null
                  }
                  {
                    otherInfomaion.home ?
                    <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                      <Icon className="icon-style" type="home"  />
                      <Text type="secondary">{otherInfomaion.home}</Text>
                    </a> :
                    null
                  }
              </div> :
              null
              }
            </Col>
              <Col span={18}>
                <Tabs tabBarExtraContent={operations}>
                  <TabPane tab="Bài hát đã đăng" key="1">
                    <UploadTable address={addressEthereum}/>
                  </TabPane>
                  <TabPane tab="ISO" key="2">
                      <ISOAddress/>
                  </TabPane>
                  <TabPane tab="Bài hát đã mua" key="3">
                    <DownloadTable address={addressEthereum}/>
                  </TabPane>
                  <TabPane tab="Sự kiện" key="">
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
  pageReducer: state.pageReducer
})

const mapDispatchToProps = (dispatch) => ({
  getUserPage: (userName)=>dispatch(getUserPage(userName)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PageContent);