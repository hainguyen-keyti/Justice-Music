import React from 'react';
import {
    Button,
  } from 'antd';
import 'antd/dist/antd.css';
import UploadModal from '../uploadModal'
import {follow} from '../../api/userAPI'
import {set_is_follow_song} from '../../actions/song'
import {set_is_follow_page} from '../../actions/page'
import { connect} from 'react-redux'

class FollowButton extends React.Component {
  onHanleFollow = (setFollow) =>{
    const data = {
      followedID: this.props.ownerSongID
    }
    follow(data)
    .then(result => {
      if(this.props.isPage){
        this.props.set_is_follow_page(setFollow)
      }
      else{
        console.log("this is console log is page")
        console.log(this.props.isPage)
        this.props.set_is_follow_song(setFollow)
      }
    })
  }
  
  render() {
    if (this.props.ownerSongID === this.props.userReducer.user.id) {
      return <UploadModal/>
    }
    return(
      <Button type="danger" onClick={() => this.onHanleFollow(!this.props.isFollowed)}>{this.props.isFollowed ? "Unfollow" : "Follow"}</Button>
    )
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
  // songReducer: state.songReducer
})

const mapDispatchToProps = (dispatch) => ({
  set_is_follow_song: (setFollow)=>dispatch(set_is_follow_song(setFollow)),
  set_is_follow_page: (setFollow)=>dispatch(set_is_follow_page(setFollow)),
})
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);