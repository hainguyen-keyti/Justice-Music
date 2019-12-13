import React from 'react';
import {
    Button,
    Card,
    Tooltip,
    Typography,
    Avatar
  } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';

const { Text } = Typography;
const { Meta } = Card;

class MusicCard extends React.Component {
  render() {
    const {songInfo} = this.props
    return (
      <Card
        hoverable
        size="small"
        cover={<img className="img-background-music" alt="music background" src={window.$linkIPFS + songInfo.image}/>}
        bodyStyle={{padding: '10px'}}
        bordered={false}
      >
      <Meta 
        title={
          <Tooltip style={{display: 'flex', flexDirection: 'column'}} title="Play this song now" placement="top" onClick={() => this.props.history.push(`/song/${songInfo._id}`)} >
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button style={{textAlign: 'left', padding: 0, fontSize: 13, height: 20,  width: '100%'}}  type="link" >{songInfo.name}</Button>
            <Text style={{fontSize: 13}} type="secondary">{songInfo.artist}</Text>
          </div>
          </Tooltip>
          }
        description={
          <Tooltip style={{display: 'flex'}} title="Go to page of user upload" placement="bottom" onClick={() => this.props.history.push(`/page/${songInfo.userUpload.addressEthereum}`)} >
            <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + songInfo.userUpload.avatar } />   
            <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '80%'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >{songInfo.userUpload.nickName}</Text></Button>
          </Tooltip>
        }
      />
    </Card>
    );
  }
}

export default withRouter(MusicCard)