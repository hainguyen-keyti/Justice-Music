import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { set_title_name, select_user_to_chat, getListFriend, getListMessage} from '../../actions/chat';
import {connect} from 'react-redux';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  onlineBar:{
    textAlign: 'right',
  }
};

class ShowListFriend extends React.Component {

  handleListItemClick = (receiveID, email) => {
    this.props.getListMessage(receiveID);
    this.props.select_user_to_chat(receiveID);
    this.props.set_title_name(email);
  };

    render() {
      const { classes } = this.props;
      return(
        <div>
            <List>
                {this.props.chatReducer.listFriend.map(user => {
                  if(user.socketID){
                    return (
                      <ListItem button onClick={()=>this.handleListItemClick(user._id, user.email)} key={user._id}>
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.email} />
                        <ListItemText primary="online" className={classes.onlineBar}/>
                      </ListItem>
                      )
                  }
                    return (
                      <ListItem button onClick={()=>this.handleListItemClick(user._id, user.email)} key={user._id}>
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.email} />
                      </ListItem>
                    )
                })}
            </List>
        </div>
      )
    }
}

ShowListFriend.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => ({
  chatReducer: state.chatReducer
})

const mapDispatchToProps = (dispatch) => ({
  getListFriend: ()=>dispatch(getListFriend()),
  getListMessage: (receiverID)=>dispatch(getListMessage(receiverID)),
  select_user_to_chat: (receiveID)=>dispatch(select_user_to_chat(receiveID)),
  set_title_name: (titleName)=>dispatch(set_title_name(titleName))
})
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(ShowListFriend));