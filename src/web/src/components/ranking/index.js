import React from 'react';
import 'antd/dist/antd.css';
import {
  List,
  Typography,
  Avatar,
  Spin
 } from 'antd';
 import {getRanking} from '../../actions/app'
import { connect} from 'react-redux'
import './index.css'

const { Text } = Typography;
class Ranking extends React.Component {
  componentDidMount(){
    this.props.getRanking()
  }
  render() {
    const {rankingdata} = this.props.appReducer
    return (
      <div style={{width: '100%'}}>
        <h2 > BẢNG XẾP HẠNG TUẦN </h2>
        {rankingdata === null ? <div className="loading-data-iso"> <Spin/> </div> :
          (
            <List
              itemLayout="horizontal"
              dataSource={rankingdata}
              renderItem={item => (
                <List.Item>
                  <div style={{  display: 'flex', flexDirection: 'column' ,alignItems: 'center'}}>
                    <Text style={{alignSelf: 'center'}} strong type="danger">1</Text>
                    <Text style={{alignSelf: 'center'}} code>{item.downloadWeekRanking}</Text>
                  </div>
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={60} src={'https://ipfs.io/ipfs/' + item.music.image}/>}
                    title={<a href="https://ant.design">{item.music.name}</a>}
                    description={item.music.artist}
                  />
                </List.Item>
              )}
            />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getRanking: () => dispatch(getRanking()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Ranking);