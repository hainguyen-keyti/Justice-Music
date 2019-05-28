import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ReceiptIcon from '@material-ui/icons/Receipt';

const styles = {
  root: {
    flexGrow: 1,
    
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: "50px",
    height: "42px"
  },
};

class Home extends React.Component {

  handleClickLogin = () => {
    this.props.history.push('/login')
  }
  handleClickFileManager = () => {
    this.props.history.push('/fileManager')
  }
  handleClickMessage = () => {
    this.props.history.push('/message')
  }


  render() {
    const{ classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton>
              <a href="/home">
                <img src="https://cdn.freebiesupply.com/logos/large/2x/strange-music-logo-logo-png-transparent.png" alt="Smiley face" className={classes.logo} />
              </a>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Keyti
            </Typography>
            <Button color="inherit" onClick={this.handleClickFileManager}>File Manager</Button>
            <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <ReceiptIcon />
                </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={this.handleClickMessage}>
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <Button color="inherit" onClick={this.handleClickLogin}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Home);


