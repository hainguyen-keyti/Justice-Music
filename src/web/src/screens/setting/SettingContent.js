
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Form,
  Input,
  Button,
  Tooltip,
  Icon,
} from 'antd';
import Avatar from '../../components/uploadAvatar'
import {updateUser} from '../../api/userAPI'

class SettingForm extends React.Component {
  state = {
    hashAvatar: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        updateUser(values).then((result)=>{
          alert(result)
          // this.props.history.push('/home')
        })
      }
    });
  };

  normFile = file => {
    // console.log(file)
    this.setState({
      hashAvatar: file
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon style={{ fontSize: '15px', color: '#1da1f2', paddingLeft: 5}} type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              UserName&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon style={{ fontSize: '15px', color: '#1da1f2', paddingLeft: 5}} type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Your input is not valid.', pattern: /^\S{8,16}$/ }],
          })(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Youtube&nbsp;
              <Tooltip title="Write your link youtube chanel.">
                <Icon style={{ fontSize: '15px', color: '#1da1f2', paddingLeft: 5}} type="youtube"/>
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('youtube')(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Facebook&nbsp;
              <Tooltip title="Write your link facebook.">
                <Icon style={{ fontSize: '15px', color: '#1da1f2', paddingLeft: 5}} type="facebook"/>
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('facebook')(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Phone Number&nbsp;
              <Tooltip title="Write your phone number.">
                <Icon style={{ fontSize: '15px', color: '#1da1f2', paddingLeft: 5}} type="phone"/>
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('phone')(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Home Address&nbsp;
              <Tooltip title="Write your home address.">
                <Icon style={{ fontSize: '15px', color: '#1da1f2', paddingLeft: 5}} type="home"/>
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('home')(<Input />)}
        </Form.Item>

        <Form.Item 
          label={
            <span>
              Avatar&nbsp;
              <Tooltip title="Upload your avatar.">
                <Icon style={{ fontSize: '15px', color: '#1da1f2', paddingLeft: 5}} type="smile"/>
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('avatar', {
            rules: [{ required: true, message: 'Please upload your avatar!'}],
            initialValue: this.state.hashAvatar
          })(
            <Avatar file={(e) => this.normFile(e)}/>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const SettingContent = Form.create({ name: 'validate_other' })(SettingForm);
          