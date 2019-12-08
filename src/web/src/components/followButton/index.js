import React from 'react';
import {
    Button,
  } from 'antd';
import 'antd/dist/antd.css';
import UploadModal from '../uploadModal'
import {follow} from '../../api/userAPI'
import {set_is_follow} from '../../actions/song'
import { connect} from 'react-redux'

class FollowButton extends React.Component {
  onHanleFollow = (setFollow) =>{
    const data = {
      followedID: this.props.pageReducer.userInfoData._id
    }
    follow(data)
    .then(result => {
      this.props.set_is_follow(setFollow)
    })
  }
  
  render() {
    if (this.props.ownerSongID === this.props.userReducer.user.id) {
      return <UploadModal/>
    }
    return(
      <Button type="danger" onClick={() => this.onHanleFollow(!this.props.songReducer.isFollowed)}>{this.props.isFollowed ? "Unfollow" : "Follow"}</Button>
    )
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
  songReducer: state.songReducer
})

const mapDispatchToProps = (dispatch) => ({
  set_is_follow: (setFollow)=>dispatch(set_is_follow(setFollow)),
})
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);