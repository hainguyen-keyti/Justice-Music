
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Icon, Input, Button, Checkbox, Modal, Typography } from 'antd';
import {connect} from 'react-redux';
import { login, signin_fail_handle} from '../../actions/user'
const { Text } = Typography;

class LoginForm extends React.Component {
  state = {
    isloading: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({isloading: true})
        this.props.login(values.email, values.password)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if(this.props.userReducer.error){
      this.setState({isloading: false})
      Modal.error({
        title: 'Login error message ',
        content: this.props.userReducer.error,
      });
      this.props.signin_fail_handle();
    }
    if(this.props.userReducer.signinSuccessful){
      this.props.history.push('/home')
      Modal.success({
        title: 'Sinh Viên thực hiện khoá luận',
        content:
        (
          <div>
            <Text >Nguyễn Hoàng Hải</Text>
            <Text code>15520186</Text>
            <br />
            <Text >Nguyễn Xuân Tú</Text>
            <Text code>15520961</Text>
          </div>
        )
      });
      
    }
    return (
      <div className="wrap-form-login">
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a href='' className="login-form-forgot">
            Forgot password
          </a>
          <Button loading={this.state.isloading} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button> 
          Or<Button onClick={()=>this.props.history.push('/register')} type="link">register now!</Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

const mapStateToProps = (state) => ({
  userReducer: state.userReducer
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password)=>dispatch(login(email, password)),
  signin_fail_handle: ()=>dispatch(signin_fail_handle()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm)
          