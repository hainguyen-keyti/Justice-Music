import React from 'react';
import 'antd/dist/antd.css';
import {
  List,
  Typography,
  Avatar,
  Spin,
  Skeleton
 } from 'antd';
 import {getRanking} from '../../actions/app'
import { connect} from 'react-redux'
import './index.css'

const { Text, Title } = Typography;
const arrTemp = [{},{},{},{},{},{},{},{},{},{}]
class Ranking extends React.Component {
  componentDidMount(){
    this.props.getRanking()
  }
  render() {
    const {rankingdata} = this.props.appReducer
    return (
      <div style={{width: '100%'}}>
        <Title level={4} type="secondary"> BẢNG XẾP HẠNG TUẦN </Title>
        {rankingdata === null ? 
        (
          <List
          itemLayout="horizontal"
          dataSource={arrTemp}
          renderItem={item => (
            <List.Item>
              <Skeleton loading={true} active paragraph={{rows: 1}} avatar={{shape: 'square', size: 70}} /> 
            </List.Item>
          )}
        />
        )
        :
          (
            <List
              itemLayout="horizontal"
              dataSource={rankingdata}
              renderItem={(item, index) => (
                <List.Item>
                  <div style={{  display: 'flex', flexDirection: 'column' ,alignItems: 'center'}}>
                    <Title level={4} style={{alignSelf: 'center', marginRight: 10}} type={index === 0 ? "danger" : (index === 1 ? "warning" : (index === 2 ? "" : "secondary"))}>{index + 1}</Title>
                  </div>
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={70} src={'https://ipfs.io/ipfs/' + item.music.image}/>}
                    title={<a href="https://ant.design">{item.music.name}</a>}
                    description={
                    <div>
                      {item.music.artist}
                      <br/>
                      <Text style={{alignSelf: 'center'}} code>{item.downloadWeekRanking}</Text>
                    </div>
                    }
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