import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Divider from '@material-ui/core/Divider'
import logo from '../../images/logo.png'



const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: "37px",
    height: "30px"
  },
  appBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
  },
  searchDiv: {
    borderRadius: 3,
    color: '#212121',
    display: 'flex',
    flexDirection: 'row',
    border:'1px solid #e0e0e0',
  },
  inputSearchRoot: {
  },
  inputSearch: {
    paddingLeft: '8px',
  },
  divider: {
    width: 1,
    height: 25,
    margin: 4,
  },
  iconButton: {
    padding: "5px",
    background: '#eeeeee',
  },
};

class Header extends React.Component {

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
        <div>
          <Grid container spacing={8} >
            <Grid item xs={2} className={classes.appBar}>
              <IconButton style={{padding: '0px'}}>
                <a href="/">
                  <img src={logo} alt="Smiley face" className={classes.logo} />
                </a>
              </IconButton>
              <Typography variant="h5">
                  Justice Music
              </Typography>

            </Grid>
            <Grid item xs={8} style={styles.appBar}>
              <Button color="inherit" onClick={this.handleClickFileManager}>Songs</Button>
              <Button color="inherit" onClick={this.handleClickFileManager}>Videos</Button>
              <Button color="inherit" onClick={this.handleClickFileManager}>Artists</Button>
              <Button color="inherit" onClick={this.handleClickFileManager}>Ranking</Button>
              <Button color="inherit" onClick={this.handleClickFileManager}>Top 100</Button>
              <Button color="inherit" onClick={this.handleClickFileManager}>Theme</Button>
              <Button color="inherit" onClick={this.handleClickFileManager}>Events</Button>
              <Button color="inherit" onClick={this.handleClickFileManager}>Music news</Button>
              <Button color="inherit" onClick={this.handleClickFileManager}>ISO</Button>
              <div className={classes.searchDiv}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputSearchRoot,
                    input: classes.inputSearch,
                  }}
                />
                <Divider className={classes.divider} />
                <IconButton 
                  type="submit"
                  variant="outlined"
                  className={classes.iconButton}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={2} className={classes.appBar}>
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
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Header);


