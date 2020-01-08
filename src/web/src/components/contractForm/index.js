import React from 'react';
import { Typography, Button, Modal, Card } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import {createTemplateContract, createContract} from '../../api/userAPI'
import * as moment from 'moment';
import { withRouter } from 'react-router';

const {Text} = Typography;


class ContractForm extends React.Component {
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
    if(this.props.mainContract){
      const data = {
        songID: this.props.songID,
        content: this.state.text,
        nameContractForm: this.props.nameContractForm
      }
    console.log(data)
      createContract(data).then((result) => {
        console.log(result)
        this.props.history.push('/mainContract/' + result.idContract)
        return Modal.success({
          content: 'Create a contract to this song success!',
        })
      })
      .catch (error => {
        this.setState({text: this.props.content})
        return Modal.error({
          title: 'Create a contract to this song failed!',
          content: error,
        });
      })
    }
    else{
      const data = {
        tempContractID: this.props.idMongo,
        content: this.state.text,
      }
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
    }
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
      title={
        <div style={{display: 'flex', justifyContent: 'space-between', marginRight: 20}}>
            <Text code > Last updated: {moment(this.props.date).format('LLLL')}</Text>
            {/* {
              this.props.mainContract ? 
              <Button 
                onClick={this.handleOk}
                type="primary">Go to main contract
              </Button>
              :
              null
            } */}
        </div>
    } 
      extra={
      <Button 
        onClick={this.handleOk}
        type="danger">{this.props.mainContract ? "Use this form" : "Update"}
        </Button>} 
      style={{ width: '100%' }
    }
      >
      <ReactQuill
        theme="snow"
        value={this.state.text}
        onChange={this.handleChange}
        modules={ContractForm.modules}
        formats={ContractForm.formats}
        placeholder="Write something..."
        style={{width: '100%', height: '1000px'}}
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

export default withRouter(ContractForm)