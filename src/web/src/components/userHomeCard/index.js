import React from 'react';
import {
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
    const {user} = this.props
    return (
      <Tooltip style={{display: 'flex'}} title={user.view + ' view page'} placement="top" onClick={() => this.props.history.push(`/page/${user.addressEthereum}`)} >
        <Card
            hoverable
            size="small"
            cover={<Avatar alt="music background" size={this.props.songPage ? 160 : 170} src={window.$linkIPFS + user.avatar}/>}
            bodyStyle={{padding: '10px', textAlign: 'center'}}
            bordered={false}
            style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}
          >
          <Meta 
            title = {<Text style={{fontSize: 15}} type="warning">{user.nickName}</Text>}
            description = {<Text style={{fontSize: 14}} type="secondary">{user.follow} Follows</Text>}
          />
        </Card>
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