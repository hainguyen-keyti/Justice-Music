import React from 'react';
import io from 'socket.io-client'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PieceMessage from '../../components/pieceMessage/pieceMessage';
import ListUser from './ListUser'
import ShowListFriend from '../../components/showListFriend/showListFriend'
import { connect} from 'react-redux'
import config from '../../config'
import { getNewFriend, getListFriend, getListMessage, push_message, findUser_fail_handle, findUser} from '../../actions/chat'
import { log_out } from '../../actions/index';


const styles = theme => ({
  messageBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    width: 1,
    height: 40,
    margin: 4,
  },
  divTop: {
    padding: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e0e0e0'
  },
  divBottom: {
    height: "calc(100vh - " + theme.spacing.unit * 15 + "px)",
    padding: theme.spacing.unit * 2,

  },
  searchDiv: {
    background: '#e0e0e0',
    borderRadius: 6,
    color: '#212121',
    display: 'flex',
    flexDirection: 'row',
  },
  iconButton: {
    background: '#bdbdbd',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  inputSearchRoot: {
    width: '100%',
  },
  inputSearch: {
    paddingLeft: theme.spacing.unit,
  },
  cardMessage:{
    borderRadius: '6px',
    height: "calc(100vh - " + theme.spacing.unit * 13 + "px)",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cardListFriend:{
    marginTop: theme.spacing.unit * 2,
    borderRadius: '6px',
    height: "calc(100vh - " + theme.spacing.unit * 21 + "px)",
    overflow: 'auto',
  },
  findUser:{
    overflow: 'auto',
    height: "calc(100vh - " + theme.spacing.unit * 21 + "px)",
  },
  typing: {
    display: 'none'
  }
});

class ChatContent extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      open: false,
      searchText: "",
      content: "",
      typing: false
    }
    this.socket = null;
    this.handleKeyPressSearch = this.handleKeyPressSearch.bind(this)
    this.handleKeyPressMessage= this.handleKeyPressMessage.bind(this)
  }

  handleClickSearch = () => {
    this.setState({open: true})
    this.props.findUser(this.state.searchText);
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  onClickLogOut = (e) => {
     window.$socket.disconnect()
    this.props.log_out();
    localStorage.clear();
    this.props.history.push('/login')
    // window.location.reload()

  }

  handleKeyPressSearch(e) {
    if (e.key === 'Enter') {
      this.handleClickSearch();
    }
  }

  handleKeyPressMessage(e) {
    var data = {
      receiverID: this.props.chatReducer.receiverID,
      senderID: this.props.userReducer.user.id
    }
    if (e.key === 'Enter') {
      this.handleClickSend(e);
    }
    else if(e.key === 'Backspace' && this.state.content === ""){
       window.$socket.emit('typing', {...data, isTyping: false})
    }
  }

  onFocusMessage = () => {
    var arr = this.props.chatReducer.listMessage;
    var lastMessage = arr[arr.length - 1];
    if(lastMessage){
      var data = {
        senderID: lastMessage.senderID,
        receiverID: lastMessage.receiverID
      }
  
      if(this.props.userReducer.user.id !== lastMessage.senderID){
         window.$socket.emit('is seen', data)
      }
    }
  }
  
  onTyping(e){
    this.setState({content: e.target.value})
    var data = {
      receiverID: this.props.chatReducer.receiverID,
      senderID: this.props.userReducer.user.id
    }
    if(this.state.content.length === 0){
      this.onFocusMessage();
       window.$socket.emit('typing', {...data, isTyping: true})
    }
  }

  handleClickSend = () => {
    if(this.state.content){
      let data = {
        senderID: this.props.userReducer.user.id,
        receiverID: this.props.chatReducer.receiverID,
        content: this.state.content,
      }
      let input = {
        senderID: this.props.userReducer.user.id,
        content: this.state.content,
        date_created: Date(Date.now()),
      }

      var user = this.props.chatReducer.listFriend.find(u=>u._id === this.props.chatReducer.receiverID)

        if(user){
           window.$socket.emit('chat message', data)
        }
        else{
           window.$socket.emit('first message', data)
           window.$socket.on('return friend', () => {
            this.props.getNewFriend()
          })
        }

      this.props.push_message(input)
      
      this.setState({content: ''})
      
      var x = document.getElementById("inputMessage")
      x.scrollTop = x.scrollHeight;

       window.$socket.emit('typing', {...data, isTyping: false})
    }
  }
  componentWillMount = () => {
    if(this.props.userReducer.user.accessToken === null){
      this.props.history.push('/login')
    }

    this.props.getListFriend();

    // let token = this.props.userReducer.user.accessToken
    // this.socket = io(config.url + '/chat', {'query':{'token':token}});

     window.$socket.on('error', data => {
      alert('socket error' + data);
    })

    window.$socket.on('chat message', data => {
      let input = {
        senderID: data.senderID,
        receiverID: data.receiverID,
        content: data.content,
        date_created: Date(Date.now()),
      }
      if(data.senderID === this.props.chatReducer.receiverID)
        this.props.push_message(input)
    })

     window.$socket.on('first message', data => {
      let input = {
        senderID: data.senderID,
        receiverID: data.receiverID,
        content: data.content,
        date_created: Date(Date.now()),
      }
      this.props.getListFriend()
      if(data.senderID === this.props.chatReducer.receiverID)
        this.props.push_message(input)
    }) 

     window.$socket.on('is seen', () => {
      this.props.getListMessage(this.props.chatReducer.receiverID)
    })

     window.$socket.on('typing', data => {

      if(data.senderID === this.props.chatReducer.receiverID){
        if(data.isTyping === true){
          this.setState({typing: true})
        }
        if(data.isTyping === false){
          this.setState({typing: false})
        }
      }
    })
  }

  componentDidUpdate(){
    var x = document.getElementById("inputMessage");
    x.scrollTop = x.scrollHeight;
  }

  render(){
    const { classes } = this.props;
    if(this.props.chatReducer.error){
        alert("Find user fail: " + this.props.chatReducer.error)
        this.props.signin_fail_handle();
    }

    return (
      <Grid container style={{marginBottom: 100}}>
        <Grid item xs={12} sm={4}>
          <div className={classes.divBottom} style={{borderRight: '1px solid #e0e0e0'}}>
            <div className={classes.searchDiv}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputSearchRoot,
                  input: classes.inputSearch,
                }}
                value={this.state.searchText}
                onChange={e=>this.setState({searchText: e.target.value})}
                onKeyPress={this.handleKeyPressSearch}
              />
              <Divider className={classes.divider} />
              <IconButton 
                type="submit"
                variant="outlined"
                className={classes.iconButton}
                onClick={this.handleClickSearch}
                disabled={this.props.chatReducer.isFindUser}
              >
                <SearchIcon />
              </IconButton>
              <ListUser className={classes.findUser}
                open={this.state.open}
                onClose={this.handleClose}
              />
            </div>
            <div>
              <Card className={classes.cardListFriend}>
                <ShowListFriend />
              </Card>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
        <div className={classes.divTop} style={{justifyContent: 'space-between',}}>
          <div>
            <IconButton style={{padding: 5}}>
              <AccountCircle/>
            </IconButton>
            {this.props.userReducer.user.email}
          </div>
            <Typography variant="h6">
              {this.props.chatReducer.titleName}
            </Typography>
          </div>
          <div className={classes.divBottom}>
            <Card className={classes.cardMessage}>
              <div id="inputMessage" style={{overflow: 'auto',}}>
                <ul>
                  {
                    this.props.chatReducer.listMessage.map( msg => {
                      if(msg.senderID === this.props.userReducer.user.id){
                        var arr = this.props.chatReducer.listMessage;
                        var lastMessage = arr[arr.length - 1];
                        if(msg === lastMessage && lastMessage.isSeen === true)
                          return <PieceMessage content={msg.content} key={msg._id} sender={true}  seen={true} />
                        return <PieceMessage content={msg.content} key={msg._id} sender={true} /> // input date and time here
                      }
                      return <PieceMessage content={msg.content} key={msg._id} sender={false} /> 
                    })
                  }
                  {
                    <Typography style={{color: '#bdbdbd'}}>
                      {this.state.typing ? 'Typing.......' : ''}
                    </Typography>
                  }
                </ul>
              </div>
              <div>
              <Paper className={classes.messageBar} elevation={4}>
                <InputBase
                  className={classes.input}
                  onFocus={this.onFocusMessage}
                  placeholder="Message..."
                  value={this.state.content}
                  onChange={e => {this.onTyping(e)}}
                  onKeyUp={this.handleKeyPressMessage}
                  />
                <Divider className={classes.divider} />
                <Button color="secondary" onClick={e => {this.handleClickSend(e)}}>
                  Send
                  <SendIcon />
                </Button>
              </Paper>
              </div>
            </Card>
          </div>
        </Grid>
      </Grid>
  );
  }
  
}


const mapStateToProps = (state) => ({
  chatReducer: state.chatReducer,
  userReducer: state.userReducer
})

const mapDispatchToProps = (dispatch) => ({
  findUser: (email)=>dispatch(findUser(email)),
  findUser_fail_handle: ()=>dispatch(findUser_fail_handle()),
  getListFriend: ()=>dispatch(getListFriend()),
  getListMessage: (receiverID)=>dispatch(getListMessage(receiverID)),
  push_message: (arr)=>dispatch(push_message(arr)),
  getNewFriend: ()=>dispatch(getNewFriend()),
  log_out: ()=>dispatch(log_out())

})
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(ChatContent));