import React, { Component } from 'react'
import {
  Row,
  Col,
  Avatar,
  Typography,
  Tabs,
  Button,
  Icon,
 } from 'antd';
import 'antd/dist/antd.css';
import Home from '../../components/layout/header'
import './index.css'
import MusicTable from './musicTable'

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const operations = <Button>Follow</Button>;
export default class PageContent extends Component {
  render() {
    return (
        <div>
          <Row>
            <Col span={24}>
              <Home/>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div>col-6</div>
            </Col>
            <Col span={13}>
              <Row>
                <Col span={24}>
                   <div className="img-background"/>
                </Col>
              </Row>
              <Row style={{paddingTop: '15px'}}>
                <Col span={7}>
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
                      <Icon className="icon-style" type="twitter"  />
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
                  {/* <Text type="secondary"><Icon type="twitter" />Ant Design</Text><br />
                  <Text strong>Ant Design</Text><br />

                  <Text type="secondary">Ant Design</Text><br /> */}
                </Col>
                  <Col span={17}>
                    <Tabs tabBarExtraContent={operations}>
                      <TabPane tab="Trang chủ" key="1">
                        Content of tab 1
                      </TabPane>
                      <TabPane tab="Bài hát" key="2">
                        <MusicTable/>
                      </TabPane>
                      <TabPane tab="ISO" key="3">
                        Content of tab 3
                      </TabPane>
                      <TabPane tab="Sự kiện" key="4">
                        Content of tab 3
                      </TabPane>
                      <TabPane tab="Giới thiệu" key="5">
                        Content of tab 3
                      </TabPane>
                      <TabPane tab="Đánh giá" key="6">
                        Content of tab 3
                      </TabPane>
                    </Tabs>
                  </Col>
              </Row>
            </Col>
            <Col span={5}>
              <div>col-6</div>
            </Col>
          </Row>
        </div>
    )
  }
}
