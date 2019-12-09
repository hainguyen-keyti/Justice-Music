import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({ component: Component, userReducer, ...rest }) => (
  <Route {...rest} render={props => (
    userReducer.signinSuccessful ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
  })  
const mapDispatchToProps = (dispatch) => ({
  })
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
