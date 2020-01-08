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
import {set_music_selected} from '../../actions/app'
import { connect} from 'react-redux'

const { Text } = Typography;
const { Meta } = Card;

class MusicCard extends React.Component {
  render() {
    const {songInfo, contract} = this.props
    return (
      <Tooltip title={songInfo.view + ' view song'} placement="top">
        {
          contract ?
        <Card
          hoverable
          size="small"
          cover={<img onClick={() => this.props.history.push(`/mainContract/${contract._id}`)} className="img-background-music" alt="music background" src={window.$linkIPFS + contract.songID.image}/>}
          bodyStyle={{padding: '10px'}}
          bordered={false}
        >
        <Meta 
          title={
            <Tooltip style={{display: 'flex', flexDirection: 'column'}} title={contract.songID.name} placement="top" onClick={() => this.props.history.push(`/song/${contract.songID._id}`)} >
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Button style={{textAlign: 'left', padding: 0, fontSize: 13, height: 20,  width: '100%'}}  type="link" >{contract.songID.name}</Button>
              <Text style={{fontSize: 13}} type="secondary">{contract.nameContractForm}</Text>
            </div>
            </Tooltip>
            }
          description={
            contract.signerID ?
            <Tooltip style={{display: 'flex'}} title={contract.signerID.nickName} placement="bottom" onClick={() => this.props.history.push(`/page/${contract.signerID.addressEthereum}`)} >
              <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + contract.signerID.avatar } />   
              <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '70%', overflow: 'hiden'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >{contract.signerID.nickName}</Text></Button>
            </Tooltip>
            :
            contract.ownerID ?
            <Tooltip style={{display: 'flex'}} title={contract.ownerID.nickName} placement="bottom" onClick={() => this.props.history.push(`/page/${contract.ownerID.addressEthereum}`)} >
              <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + contract.ownerID.avatar } />   
              <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '70%', overflow: 'hiden'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >{contract.ownerID.nickName}</Text></Button>
            </Tooltip>
            :
            null
            }
          />
        </Card>
        :
        <Card
          hoverable
          size="small"
          cover={<img onClick={() => this.props.history.push(`/song/${ songInfo._id}`)} className="img-background-music" alt="music background" src={window.$linkIPFS + songInfo.image}/>}
          bodyStyle={{padding: '10px'}}
          bordered={false}
        >
        <Meta 
          title={
            <Tooltip style={{display: 'flex', flexDirection: 'column'}} title={songInfo.name} placement="top" onClick={() =>{this.props.set_music_selected(songInfo)}} >
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Button style={{textAlign: 'left', padding: 0, fontSize: 13, height: 20,  width: '100%'}}  type="link" >{songInfo.name}</Button>
              <Text style={{fontSize: 13}} type="secondary">{songInfo.artist}</Text>
            </div>
            </Tooltip>
            }
          description={
            <Tooltip style={{display: 'flex'}} title={songInfo.userUpload.nickName} placement="bottom" onClick={() => this.props.history.push(`/page/${songInfo.userUpload.addressEthereum}`)} >
              <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + songInfo.userUpload.avatar } />   
              <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '70%', overflow: 'hiden'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >{songInfo.userUpload.nickName}</Text></Button>
            </Tooltip>
            }
          />
        </Card>
        }
      </Tooltip>
      
    );
  }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  set_music_selected: (musicSelected)=>dispatch(set_music_selected(musicSelected)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicCard));