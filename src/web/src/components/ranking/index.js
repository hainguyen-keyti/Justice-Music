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
 import {getRanking} from '../../actions/app'
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
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={70} src={window.$linkIPFS + item.music.image}/>}
                    title={<Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20}}  type="link" onClick={() => this.props.history.push(`/song/${item.music._id}`)}>{item.music.name}</Button>}
                    description={
                    <div>
                      {item.music.artist}
                      <br/>
                      <div className="row-space-between">
                        <Tooltip title={item.user.nickName} placement="leftTop">
                          <Avatar shape='circle' size='small' src={window.$linkIPFS + item.user.avatar} onClick={() => this.props.history.push(`/page/${item.user.addressEthereum}`)} />
                        </Tooltip>
                        <Text style={{alignSelf: 'center'}} code>{item.downloadWeekRanking} Downloads</Text>
                      </div>
                    </div>
                    }
                  />
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
  getRanking: () => dispatch(getRanking()),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ranking));