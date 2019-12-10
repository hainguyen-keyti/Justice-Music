
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
import {updateUser, handle_update_error, reset_update} from '../../actions/user'
import ComponentLoading from '../../components/loading'
import ComponentSuccess from '../../components/success'
import ComponentError from '../../components/error'
import { connect} from 'react-redux'

class SettingForm extends React.Component {
  state = {
    hashAvatar: '',
    hashCoverPhoto: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          hashAvatar: '',
          hashCoverPhoto: ''
        })
          this.props.updateUser(values)
          this.props.form.resetFields()
        }
      }
    );
  };

  normFile = file => {
    this.setState({
      hashAvatar: file
    })
  };

  normFile2 = file => {
    this.setState({
      hashCoverPhoto: file
    })
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    if(this.props.userReducer.isUpdate){
      return <ComponentLoading />
    }
    if (this.props.userReducer.updateSuccessful){
      return <ComponentSuccess title="SUCCESSFUL" subTitle="Update user information successful" goTo='home' func={this.props.reset_update}/>
    }
    if (this.props.userReducer.errorUpdate){
      
      return <ComponentError func={this.props.handle_update_error} title="ERROR at update user information!" subTitle={this.props.userReducer.errorUpdate} goTo='setting'/>
    }
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
          {getFieldDecorator('nickName')(<Input />)}
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
            rules: [{ message: 'Your input is not valid.', pattern: /^\S{8,16}$/ }],
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
            initialValue: this.state.hashAvatar
          })(
            <Avatar file={(e) => this.normFile(e)}/>
          )}
        </Form.Item>

        <Form.Item 
          label={
            <span>
              CoverPhoto&nbsp;
              <Tooltip title="Upload your cover photo.">
                <Icon style={{ fontSize: '15px', color: '#1da1f2', paddingLeft: 5}} type="picture"/>
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('coverPhoto', {
            initialValue: this.state.hashCoverPhoto
          })(
            <Avatar file={(e) => this.normFile2(e)}/>
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
const mapStateToProps = (state) => ({
  userReducer: state.userReducer
})

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data)=>dispatch(updateUser(data)),
  handle_update_error: ()=>dispatch(handle_update_error()),
  reset_update: ()=>dispatch(reset_update()),
})

const SettingContent = Form.create({ name: 'validate_other' })(SettingForm);
export default connect(mapStateToProps, mapDispatchToProps)(SettingContent);