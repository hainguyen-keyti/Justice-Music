import React, { Component } from 'react'
import {
  Row,
  Col,
  Avatar,
  Typography,
  Tabs,
  Button,
 } from 'antd';
import 'antd/dist/antd.css';
import Home from '../home/Home'
import './index.css'
import MusicTable from './musicTable'

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const operations = <Button>Follow</Button>;
export default class Page extends Component {
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
                    <div style={{paddingRight: '15px'}}>
                      <Avatar size={150} src="https://ipfs.io/ipfs/QmS1NihcXcm57fLf2jx5UkQhJyC1QogWcoF78DMbrYfmid" alt="Avatar photo"/>
                    </div>
                    <div>
                      <Title level={4}>Trịnh Ngọc Trinh</Title>
                      <Text type="secondary">2.469.827 Theo dõi</Text>
                    </div>
                  </div>
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
