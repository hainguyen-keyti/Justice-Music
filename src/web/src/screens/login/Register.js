import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Checkbox,
  Button,
  Radio,
  Result
} from 'antd';
import { createUser, signup_fail, signup_fail_handle, clear_state_register} from '../../actions/user'
import {connect} from 'react-redux';
import ComponentLoading from '../../components/loading'
import ComponentError from '../../components/error'

const { Option } = Select;
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let {email, password, nickName, phone, genre} = values
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.createUser(email, password, nickName, phone, genre)
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmitSuccess = () => {
    this.props.history.push('/home')
    this.props.clear_state_register()
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84',
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="86">+86</Option>
      </Select>,
    );
    if(this.props.userReducer.error){
      alert(this.props.userReducer.error)
      // this.props.signup_fail_handle();
      this.props.clear_state_register()
      return <ComponentError />
    }
    if(this.props.userReducer.signupSuccessful){
      console.log("vo roi ne")
      this.props.form.resetFields()
      return (  
      <Result
        status="success"
        title="Login Success"
        subTitle="Click here to go home page !"
        extra={[
          <Button type="primary" onClick={this.handleSubmitSuccess}>
            Go to homepage
          </Button>
        ]}
      />
      )
    }
    if(this.props.userReducer.isSignup){
      return <ComponentLoading />
    }
    return (
      <div className="wrap-form-login">
          <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: 'Your input is not valid.'}],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item label="Genre">
              {getFieldDecorator('genre', {
                initialValue: 3,
              })(
                <Radio.Group>
                  <Radio value={1}>Man</Radio>
                  <Radio value={2}>Woman</Radio>
                  <Radio value={3}>Other</Radio>
                </Radio.Group>,
              )}
            </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a>agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

const mapStateToProps = (state) => ({
    userReducer: state.userReducer
})

const mapDispatchToProps = (dispatch) =>({
    createUser: (email, password, nickName, phone, genre) => dispatch(createUser(email, password, nickName, phone, genre)),
    signup_fail: () => dispatch(signup_fail()),
    signup_fail_handle: () => dispatch(signup_fail_handle()),
    clear_state_register: () => dispatch(clear_state_register())
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);

          