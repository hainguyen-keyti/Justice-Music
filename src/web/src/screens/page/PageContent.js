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
import MusicTable from './musicTable'
import UploadModal from '../../components/uploadModal/uploadModal'
import InfoISO from '../../components/infoISO'

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const operations = <UploadModal/>;
export default class PageContent extends Component {
  render() {
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
                  <Avatar size={160} src="https://ipfs.io/ipfs/QmXwrePcDqV2YR1xyJU4mpxadaQgHHMLsitBgWtZS2c9Zn" alt="Avatar photo"/>
                </div>
                <div>
                  <Title level={4}>Nguyễn Hoàng Hải</Title>
                  <Text type="secondary">2.469.827 Theo dõi</Text>
                </div>
              </div>
              <div className="info-icon">
                <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                  <Icon className="icon-style" type="youtube"  />
                  <Text type="secondary">ngoctrinhfashion89</Text>
                </a>
                <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                  <Icon className="icon-style" type="facebook"  />
                  <Text type="secondary">fb.com/hainguyen.keyti</Text>
                </a>
                <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                  <Icon className="icon-style" type="phone"  />
                  <Text type="secondary">037 259 8218</Text>
                </a>
                <a href="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" className="line-space">
                  <Icon className="icon-style" type="home"  />
                  <Text type="secondary">Thành phố Hồ Chí Minh</Text>
                </a>
              </div>
            </Col>
              <Col span={18}>
                <Tabs tabBarExtraContent={operations}>
                  <TabPane tab="Bài hát" key="1">
                    <MusicTable/>
                  </TabPane>
                  <TabPane tab="ISO" key="2">
                    <Col span={8}>
                      <InfoISO 
                        background="https://i.ytimg.com/vi/DZDYZ9nRHfU/maxresdefault.jpg"
                        artistAvatar="https://2sao.vietnamnetjsc.vn/images/2019/09/26/23/24/unnamed---Copy-1.jpg"
                        songName="Đức Phúc"
                        artistName="Hết Duyên Cạn Nhớ"
                        currentPercent={26}
                        timeExpire={1572139227906}
                        />
                      </Col>
                  </TabPane>
                  <TabPane tab="Bài hát đã mua" key="3">
                    Content of tab 3
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
