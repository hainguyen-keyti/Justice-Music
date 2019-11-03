
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../home/HomeContent.css'
import { Row, Col, List } from 'antd';
import { Carousel } from 'antd';
import {connect} from 'react-redux';

const data = [
  {
    title: 'Em Gì Ơi',
    singer: 'Jack & KICM',
    img: 'https://avatar-nct.nixcdn.com/song/2019/10/05/8/f/c/f/1570289712419.jpg',
  },
  {
    title: 'Còn Gì Đau Hơn Chữ Đã Từng',
    singer: 'Quân AP',
    img: 'https://avatar-nct.nixcdn.com/song/2019/10/10/8/1/6/9/1570671355503.jpg',
  },
  {
    title: 'Hết Thương Cạn Nhớ',
    singer: 'Đức Phúc',
    img: 'https://avatar-nct.nixcdn.com/song/2019/09/30/2/9/3/3/1569811020573.jpg',

  },
  {
    title: 'Là Bạn Không Thể Yêu',
    singer: 'Lou Hoàng',
    img: 'https://avatar-nct.nixcdn.com/singer/avatar/2017/05/09/0/2/6/7/1494321140695.jpg',
  },
  {
    title: 'Thay Tôi Yêu Cô Ấy',
    singer: 'Thanh Hưng',
    img: 'https://avatar-nct.nixcdn.com/song/2019/09/13/d/3/1/3/1568369182920.jpg',
  },
 {
    title: 'Trời Giấu Trời Mang Đi',
    singer: 'AMee & VirusS',
    img: 'https://avatar-nct.nixcdn.com/song/2019/10/15/6/d/4/7/1571107002806.jpg',
  },
 {
    title: 'Buồn Lắm Em Ơi',
    singer: 'Trịnh Đình Quang',
    img: 'https://avatar-nct.nixcdn.com/singer/avatar/2019/06/04/b/9/b/0/1559630395269.jpg',
  },
  {
    title: 'Lời Yêu Ngây Dại',
    singer: 'Kha',
    img: 'https://avatar-nct.nixcdn.com/song/2019/09/25/0/2/1/8/1569378226451.jpg',
  },
];

class HomeContent extends Component {
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
           <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/10/8/1/6/9/1570702093333.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/10/8/1/6/9/1570677114814.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/09/30/2/9/3/3/1569810233470.jpg"/>
          </Col>
        </Row>
        </div>
        <div className="titlemusic">
        <Row >
        <h1> Mới phát hành</h1> 
        </Row>
        <Row >
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/18/2/0/b/1/1571369776927.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
           <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/22/8/2/0/b/1571718224366.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="iMusic test" src="https://avatar-nct.nixcdn.com/song/2019/09/29/b/f/9/2/1569728885513.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/16/f/8/f/a/1571175605743.jpg"/>
          </Col>
        </Row>
        <Row >
        <h1> Nghe nhiều nhất </h1> 
        </Row>
        <Row >
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/21/4/6/1/e/1571631233967.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
           <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/18/2/0/b/1/1571390960251.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/18/2/0/b/1/1571373940325.jpg"/>
          </Col>
          <Col className="gutter-row" span={6}>
            <img alt="Music test" src="https://avatar-nct.nixcdn.com/song/2019/10/16/f/8/f/a/1571177546801.jpg"/>
          </Col>
        </Row>
        </div>
        </Col>
        <Col className="gutter-row" span={6}>
        <div className="wrapperbxh">
        <div className="bxhcontent">
        <h2 className="h2bxh"> BẢNG XẾP HẠNG</h2>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<img className="img-bxh" alt="temp" src={item.img} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description={item.singer}
        />
      </List.Item>
    )}
  />
        </div>
        </div>
        </Col>
      </Row>
  </div>

)
}
}         


const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);