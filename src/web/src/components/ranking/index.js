import React from 'react';
import 'antd/dist/antd.css';
import {
  List,
  Typography,
  Avatar,
  Button,
  Skeleton,
  Tooltip
 } from 'antd';
 import {getRanking, set_music_selected} from '../../actions/app'
import { connect} from 'react-redux'
import './index.css'
import { withRouter } from 'react-router';

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
                item ? 
                <List.Item>
                  <div style={{  display: 'flex', flexDirection: 'column' ,alignItems: 'center'}}>
                    <Title level={4} style={{alignSelf: 'center', marginRight: 10}} type={index === 0 ? "danger" : (index === 1 ? "warning" : (index === 2 ? "" : "secondary"))}>{index + 1}</Title>
                  </div>
                  <Tooltip title={item.view + " view"} placement="leftTop">
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={70} src={window.$linkIPFS + item.image} onClick={() => this.props.history.push(`/song/${item._id}`)}/>}
                      title={<Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20}}  type="link"  onClick={() =>{this.props.set_music_selected(item)}}>{item.name}</Button>}
                      description={
                      <div>
                        {item.artist}
                        <br/>
                        <div className="row-space-between">
                          <Tooltip title={item.userUpload.nickName} placement="leftTop">
                            <Avatar shape='circle' size='small' src={window.$linkIPFS + item.userUpload.avatar} onClick={() => this.props.history.push(`/page/${item.userUpload.addressEthereum}`)} />
                          </Tooltip>
                          <Text style={{alignSelf: 'center'}} code>{item.downloadWeekRanking} Downloads</Text>
                        </div>
                      </div>
                      }
                    />
                  </Tooltip>
                </List.Item>
                :
                null
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
  set_music_selected: (musicSelected)=>dispatch(set_music_selected(musicSelected)),
  getRanking: () => dispatch(getRanking()),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ranking));