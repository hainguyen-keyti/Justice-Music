import React from 'react';
import {connect} from 'react-redux';
import { login, signin_fail_handle} from '../../screens/login/actions/signin'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import BugReport from '@material-ui/icons/BugReport';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Register from './Register';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  type: {
    marginTop: theme.spacing.unit * 3,
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
  },
});

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  constructor(props){
    super(props)

    this.onClickSignin = this.onClickSignin.bind(this)
}

componentWillMount(){
    if(localStorage.getItem('accessToken')){
      this.props.history.push('/app')
      // window.location.reload()
    }
}

  onClickSignin(){
    let {username, password} = this.state

    this.props.login(username, password)
  }

  render(){ 
    const { classes } = this.props;
    if(this.props.signinReducer.error){
      alert("sign fail: " + this.props.signinReducer.error)
      this.props.signin_fail_handle();
    }
    if(this.props.signinReducer.signinSuccessful)
      this.props.history.push('/app')
      
    return (
      <main className={classes.main}>
          <React.Fragment>
            <Typography className={classes.type} component="h4" variant="h6">
              <span role="img" aria-label="Love"> ❤️ </span>
              Chat Realtime
              <span role="img" aria-label="Love"> ❤️ </span>
            </Typography>
            <Grid container spacing={40}>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Register />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <React.Fragment>
                  <CssBaseline />
                  <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <BugReport />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <form className={classes.form}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input 
                        id="email" 
                        name="email" 
                        autoComplete="email" 
                        autoFocus
                        onChange={e=>this.setState({username: e.target.value})}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                        name="password" 
                        type="password" 
                        id="password" 
                        autoComplete="current-password"
                        onChange={e=>this.setState({password: e.target.value})} 
                        />
                      </FormControl>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={this.props.signinReducer.isSignin && !this.props.signinReducer.signinSuccessful}
                        onClick={this.onClickSignin}
                      >
                        Sign in
                      </Button>
                    </form>
                  </Paper>
                  <Typography className={classes.type} component="h4" variant="h6">
                    Develop with 
                    <span role="img" aria-label="Love"> ❤️ </span>
                    by Keyti
                  </Typography>
                </React.Fragment>
              </Grid>
            </Grid>
            </React.Fragment>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  signinReducer: state.signinReducer
})

const mapDispatchToProps = (dispatch) => ({
  login: (username, password)=>dispatch(login(username, password)),
  signin_fail_handle: ()=>dispatch(signin_fail_handle()),
})

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(Login));