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
import { createUser, signup_fail, signup_fail_handle, clear_state} from '../../actions/user'
import {connect} from 'react-redux';

const styles = theme => ({
    submit: {
        marginTop: theme.spacing.unit * 3,
        opacity: '0.6',
        backgroundColor: '#0099FF',
        color:'white',
      },
      typeColor: {
        color: 'black',
        textAlign: 'center',
      },
});

class Register extends React.Component{
    state = {
        name: "",
        email: "",
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
        let {name, email, password, phone, genre} = this.state;
        this.props.createUser(email, password, name, phone, genre)
    }
    render(){
        const { classes } = this.props;
        if(this.props.userReducer.error){
            alert("Register fail: you must input correct email and mobie phone format,   " + this.props.userReducer.error)
            this.props.signup_fail_handle();
        }
        if(this.props.userReducer.signupSuccessful){
            this.props.clear_state();
            this.setState({
                name: "",
                email: "",
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
                        label="Name"
                        fullWidth
                        autoComplete="billing full name"
                        value={this.state.name}
                        onChange={e=>this.setState({name: e.target.value})} 
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
                        value={this.state.email}
                        onChange={e=>this.setState({email: e.target.value})} 
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
                                color="black"
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
                                color="black"

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
                                color="black"

                            />
                        }
                        label="Other"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        disabled={this.props.userReducer.isSignup && !this.props.userReducer.signupSuccessful}
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
    userReducer: state.userReducer
})

const mapDispatchToProps = (dispatch) =>({
    createUser: (email, password, name, phone, genre) => dispatch(createUser(email, password, name, phone, genre)),
    signup_fail: () => dispatch(signup_fail()),
    signup_fail_handle: () => dispatch(signup_fail_handle()),
    clear_state: () => dispatch(clear_state())
})

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(Register));