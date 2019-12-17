import React from 'react';
import { Typography, Button, Tooltip, Modal } from 'antd';
import ReactQuill from 'react-quill';
import {postLyric} from '../../api/userAPI'
import 'react-quill/dist/quill.snow.css'; // ES6
const { Text} = Typography;


export default class InputLyric extends React.Component {
  state = { 
    visible: false,
    text: '',
   };

  handleChange = (value) => {
    this.setState({ text: value })
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {

    const data = {
      idMongo: this.props.idMongo,
      lyric: this.state.text,
    }
    this.setState({
      visible: false,
      text: '',
    });
    console.log(data)
    postLyric(data).then((result) => {
      console.log(result)
    })
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
    <div>
      <Tooltip title="Edit lyric" placement="leftTop">
        <Button disabled={this.props.disabled} ghost type="danger" icon="edit" onClick={this.showModal}>
          <Text>Edit lyric</Text>
        </Button>
      </Tooltip>
      <Modal
        title="Edit Lyric"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{ type: "danger" }}
        okText="Submit"
      >
        <ReactQuill
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange} />
      </Modal>
    </div>
    )
  }
}