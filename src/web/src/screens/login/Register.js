import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import { createUser, signup_fail, signup_fail_handle, clear_state} from './actions/signup'
import {connect} from 'react-redux';

const styles = theme => ({
    submit: {
        marginTop: theme.spacing.unit * 3,
        opacity: '0.6',
      },
      typeColor: {
        color: '#e0e0e0',
        textAlign: 'center',
      },
});

class Register extends React.Component{
    state = {
        full_name: "",
        username: "",
        password: "",
        phone: "",
        genre: ""
    }

    constructor(props){
        super(props)
    
        this.onClickSignUp = this.onClickSignUp.bind(this)
    }

    handleChange = event => {
        this.setState({genre: event.target.value})
    }

    onClickSignUp() {
        let {full_name, username, password, phone, genre} = this.state;
        this.props.createUser(username, password, full_name, phone, genre)
    }
    render(){
        const { classes } = this.props;
        if(this.props.signupReducer.error){
            alert("Register fail: you must input correct email and mobie phone format,   " + this.props.signupReducer.error)
            this.props.signup_fail_handle();
        }
        if(this.props.signupReducer.signupSuccessful){
            this.props.clear_state();
            this.setState({
                full_name: "",
                username: "",
                password: "",
                phone: "",
                genre: ""
            })
            alert("Register successfully")
        }
        return (
            <div>
              <Typography variant="h6" gutterBottom className={classes.typeColor}>
                Register Form
              </Typography>
              <form >
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        label="Full name"
                        fullWidth
                        autoComplete="billing full name"
                        value={this.state.full_name}
                        onChange={e=>this.setState({full_name: e.target.value})} 
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="billing email"
                        value={this.state.username}
                        onChange={e=>this.setState({username: e.target.value})} 
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        color= '#e0e0e0'
                        fullWidth
                        autoComplete="billing password"
                        value={this.state.password}
                        onChange={e=>this.setState({password: e.target.value})} 
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone"
                        fullWidth
                        autoComplete="billing phone"
                        value={this.state.phone}
                        onChange={e=>this.setState({phone: e.target.value})} 
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel required component="legend">Genre</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel
                        control ={
                            <Radio
                                checked={this.state.genre === '1'}
                                onChange={this.handleChange}
                                value="1"
                                name="radio-button-demo"
                                aria-label="B"
                            />
                        }
                        label="Male"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel
                        control ={
                            <Radio
                                checked={this.state.genre === '2'}
                                onChange={this.handleChange}
                                value="2"
                                name="radio-button-demo"
                                aria-label="B"
                            />
                        }
                        label="Female"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel
                        control ={
                            <Radio
                                checked={this.state.genre === '3'}
                                onChange={this.handleChange}
                                value="3"
                                name="radio-button-demo"
                                aria-label="B"
                            />
                        }
                        label="Other"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="inherit"
                        className={classes.submit}
                        disabled={this.props.signupReducer.isSignup && !this.props.signupReducer.signupSuccessful}
                        onClick={this.onClickSignUp}
                        >
                        Sign Up
                    </Button>
                </Grid>
              </form>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => ({
    signupReducer: state.signupReducer
})

const mapDispatchToProps = (dispatch) =>({
    createUser: (username, password, full_name, phone, genre) => dispatch(createUser(username, password, full_name, phone, genre)),
    signup_fail: () => dispatch(signup_fail()),
    signup_fail_handle: () => dispatch(signup_fail_handle()),
    clear_state: () => dispatch(clear_state())
})

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(Register));