import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import blue from '@material-ui/core/colors/blue';
import {select_user_to_chat, getListFriend, getListMessage, set_title_name} from '../../actions/chat';
import {connect} from 'react-redux';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class ListUser extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = (receiveID, email) => {
    this.props.onClose();
    this.props.set_title_name(email)
    this.props.getListMessage(receiveID);
    this.props.select_user_to_chat(receiveID);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">List users</DialogTitle>
        <div>
          <List>
            {this.props.chatReducer.dataFindUser.map(user => (
              <ListItem button onClick={()=>this.handleListItemClick(user._id, user.email)} key={user._id}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.email} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

ListUser.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
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
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(ListUser));