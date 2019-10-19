
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../home/HomeContent.css'
import { Row, Col } from 'antd';
import { Carousel } from 'antd';


export default class HomeContent extends Component {
render() {
  return (
  <div >
    <Row>
      <Carousel autoplay>
        <div>
          <img className="slideimg" alt="Music test" src="https://avatar-nct.nixcdn.com/slideshow/2019/10/06/3/3/e/3/1570338800356_org.jpg"/>
        </div>
        <div>
        <img className="slideimg" alt="Music test" src="https://avatar-nct.nixcdn.com/slideshow/2019/10/12/b/c/f/6/1570873660501_org.jpg"/>
        </div>
        <div>
        <img className="slideimg" alt="Music test" src="https://avatar-nct.nixcdn.com/slideshow/2019/09/26/7/5/3/0/1569473810559_org.jpg"/>
        </div>
        <div>
        <img className="slideimg" alt="Music test" src="https://avatar-nct.nixcdn.com/slideshow/2019/10/15/3/3/8/1/1571105713176_org.jpg"/>
        </div>
      </Carousel>        
    </Row>
  
      <Row>
        <Col className="gutter-row" span={18}>
        <div className="titlemusic">
        <Row >
          <h1> Hôm nay nghe gì</h1> 
        </Row>
        <Row >
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/09/19/1/5/4/8/1568861360406.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
           <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/09/19/1/5/4/8/1568861360406.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/09/19/1/5/4/8/1568861360406.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/09/19/1/5/4/8/1568861360406.jpg"/>
          </Col>
        </Row>
        </div>
        <div className="titlemusic">
        <Row >
        <h1> Mới phát hành</h1> 
        </Row>
        <Row >
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/09/19/1/5/4/8/1568861360406.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
           <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/09/19/1/5/4/8/1568861360406.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="iMusic test" src="https://avatar-nct.nixcdn.com/song/2019/09/19/1/5/4/8/1568861360406.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/09/19/1/5/4/8/1568861360406.jpg"/>
          </Col>
        </Row>
        </div>
        </Col>

        <Col className="gutter-row" span={6}>
          BXH
        </Col>
      </Row>
  </div>

)
}
}         