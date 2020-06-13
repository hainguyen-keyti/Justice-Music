
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
        title: 'JUSTICE MUSIC (JUMU)',
        content:
        (
          <div>
            <Text >Justice Music (hay còn gọi là Jumu) là hệ thống sử dụng Blockchain để đăng ký bản quyền tác phẩm âm nhạc, 
              đăng ký sử dụng hợp pháp bản quyền âm nhạc, ký kết hợp đồng giữa các bên đối tác trong ngành âm nhạc và cho 
              phép người nghệ sĩ sử dụng tính năng kêu gọi vốn đầu từ thông qua tác phẩm của họ một cách trực tuyến.Blockchain 
              lưu lại tất cả các lịch sử giao dịch mà người dùng đã thực hiện và không thể thay đổi được, kể cả những người
               quản trị viên như nhóm tác giả. Đồng thời hệ thống Jumu giúp thay thế hệ thống đăng ký bản quyền, ký hợp đồng
                trước đây nhằm giảm chi phí phát sinh, rủi ro từ bên thứ ba củng như cải thiện tính minh bạch không bị kiểm 
                soát từ bên thứ ba.</Text>
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
          