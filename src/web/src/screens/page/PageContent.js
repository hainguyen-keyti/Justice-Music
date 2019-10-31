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
import {getUserPage} from '../../api/userAPI'
import ComponentLoading from '../../components/loading'
import Component404 from '../../components/404'

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const operations = <UploadModal/>;
export default class PageContent extends Component {
  state = {
    user: null,
    fail: false
  }
  componentDidMount(){
    const { userName } = this.props
    getUserPage(userName)
    .then((user) => {
      this.setState(() => ({ user }))
    })
    .catch(err=>{
      this.setState(() => ({ fail: true, user: {} }))
    })
  }
  render() {
    if  (this.state.fail) return (<Component404 history={this.props.history} subTitle="Page not found. Please try another link!"/>)
    if (!this.state.user) return (<ComponentLoading/>)
    const {folow, phone, otherInfomaion, avatar, nickName} = this.state.user
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
              <div className="info-icon">
                <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                  <Icon className="icon-style" type="youtube"  />
                  <Text type="secondary">{otherInfomaion ? otherInfomaion.youtube : {}}</Text>
                </a>
                <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                  <Icon className="icon-style" type="facebook"  />
                  <Text type="secondary">{otherInfomaion? otherInfomaion.facebook : {}}</Text>
                </a>
                <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                  <Icon className="icon-style" type="phone"  />
                  <Text type="secondary">{phone}</Text>
                </a>
                <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                  <Icon className="icon-style" type="home"  />
                  <Text type="secondary">{otherInfomaion? otherInfomaion.home : {}}</Text>
                </a>
              </div>
            </Col>
              <Col span={18}>
                <Tabs tabBarExtraContent={operations}>
                  <TabPane tab="Bài hát đã đăng" key="1">
                    <UploadTable/>
                  </TabPane>
                  <TabPane tab="ISO" key="2">
                      <ISOAddress/>
                  </TabPane>
                  <TabPane tab="Bài hát đã mua" key="3">
                    <DownloadTable/>
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
