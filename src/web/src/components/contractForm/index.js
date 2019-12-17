import React from 'react';
import { Typography, Button, Tooltip, Modal, Card } from 'antd';
import ReactQuill from 'react-quill';
import {postLyric} from '../../api/userAPI'
import 'react-quill/dist/quill.snow.css'; // ES6
import {createTemplateContract} from '../../api/userAPI'
import ComponentSuccess from '../success'
const { Paragraph, Text} = Typography;


export default class ContractForm extends React.Component {
  state = { 
    text: '',
   };
   componentDidMount = () => {
     this.setState({text: this.props.content})
   }
  handleChange = (value) => {
    this.setState({ text: value })
  }
  
  handleOk = () => {
    const data = {
      tempContractID: this.props.idMongo,
      content: this.state.text,
    }
    console.log(data)

    console.log(data)
    createTemplateContract(data).then((result) => {
      console.log(result)
      return Modal.success({
        content: 'Update Success!',
      })
    })
    .catch (error => {
      this.setState({text: this.props.content})
      return Modal.error({
        title: 'Update Failed!',
        content: error,
      });
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
      <Card
      bordered={false}
      title={<Text code >Contract Form {this.props.number}</Text>} 
      extra={<Button 
        onClick={this.handleOk}
        type="danger">Submit</Button>} 
      style={{ width: '100%' }}
      >
      <ReactQuill
        theme="snow"
        value={this.state.text}
        onChange={this.handleChange}
        modules={ContractForm.modules}
        formats={ContractForm.formats}
        placeholder="Write something..."
        style={{width: '100%', height: '500px'}}
        />
    </Card>
    )
  }
}


ContractForm.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

ContractForm.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
