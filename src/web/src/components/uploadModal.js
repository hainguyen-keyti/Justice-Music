import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Modal,
    Upload,
    Icon,
    Input,
    Button,
    notification,
    Spin
  } from 'antd';
import 'antd/dist/antd.css';
import {upload} from '../api/ethereumAPI'
import getHashIPFS from '../utils/IPFShash';
import config from '../config';

const key = "updatable";
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
        USD: 0,
        costUSD: 23000,
      }
    componentDidMount() {
    this.props.onRef(this)
    }
    componentWillUnmount() {
    this.props.onRef(undefined)
    }
    resetUSD = () => {
        this.setState({ USD: 0 });
    }
    normFile =  e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    if(e.fileList.length === 2) {
        console.log("hahahaha")
        e.fileList = e.fileList.slice(-1);
    }
    return e && e.fileList;
    };
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { Option } = Select;
      return (
        <Modal
          visible={visible}
          title="Upload media"
          okText="Submit"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
          <Form.Item label="Media's name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the name of this song!' }],
          })(<Input placeholder="Please select song's name" />)}
        </Form.Item>

        <Form.Item label="Genres">
          {getFieldDecorator('genres', {
            initialValue: 'Music',
          })(
            <Radio.Group>
              <Radio value="Music">Music</Radio>
              <Radio value="Image">Image</Radio>
            </Radio.Group>,
          )}
        </Form.Item>

        <Form.Item label="Tags">
          {getFieldDecorator('tags', {
            rules: [
              { message: 'Please select song\'s tag ', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select song's tag">
              <Option value="Rap">Rap</Option>
              <Option value="Rock">Rock</Option>
              <Option value="young">Young</Option>
              <Option value="pre-war">Pre-war</Option>
              <Option value="lyrical">Lyrical</Option>
              <Option value="US-UK">US-UK</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Price HAK">
          {getFieldDecorator('price', {rules: [{ required: true, message: 'Please input cost of this song!'}], initialValue: 0, onChange: (e) => {
            // e = Math.ceil(e)
            this.setState({USD: e/this.state.costUSD})
            }})(<InputNumber min={0} max={10000000000} />)}
          <span className="ant-form-text"> HAK</span>
          <span className="ant-form-text">➜   {this.state.USD} USD</span>
        </Form.Item>

        {/* <Form.Item label="Price USD">
          <span className="ant-form-text">{this.state.USD} USD</span>
        </Form.Item> */}

        <Form.Item label="Contract permission">
          {getFieldDecorator('contractPermission', { initialValue: true, valuePropName: 'checked' })(<Switch />)}
        </Form.Item>

        <Form.Item label="Upload">
          {getFieldDecorator('file', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{ required: true}],
          })(
            <Upload.Dragger action='https://www.mocky.io/v2/5cc8019d300000980a055e76'>
              <p className="ant-upload-drag-icon" >
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>,
          )}
        </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export default class UploadModal extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
        this.openUploadNotification(err, values)
      console.log('Received values of form: ', values);
      form.resetFields();
      this.child.resetUSD()
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  openUploadNotification = (err, values) => {
    if(!err){
      notification.open({
        key,
        message: "Uploading",
        description: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Spin />
            <p style={{ marginLeft: '15px' }}>System is uploading this media</p>
          </div>
        ),
        duration: 0,
        placement: "bottomLeft"
      });
      getHashIPFS(values.file[0].originFileObj).then(hash=>{
        let data = {
          fileHash: hash,
          price: values.price,
          kind: (values.genres === "Music") ? 2 : 1
        }
        console.log(data)
        upload(data)  
        .then((txHash) => {
            notification.open({
                key,
                message: "Pending Transaction",
                description: (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Spin />
                    <p style={{ marginLeft: '15px' }}>This Transaction is pending</p>
                  </div>
                ),
                duration: 0,
                placement: "bottomLeft"
              });
        
            config.provider.waitForTransaction(txHash).then((tx) => {
            notification.success({
                key,
                message: "Sucess Transaction",
                description: "Transaction has been successful",
                duration: 0,
                placement: "bottomLeft"
            });
            console.log(tx)
            });
        })
        .catch((err) => {
          notification.error({
            key,
            message: "Error",
            description: "This is error message: " + err,
            duration: 0,
            placement: "bottomLeft"
          });
        });
      })
    }
    else {
      notification.error({
        key,
        message: "Error",
        description: "This is error message: " + err,
        duration: 0,
        placement: "bottomLeft"
      });
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>
          Upload
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onRef={ref => (this.child = ref)}
        />
      </div>
    );
  }
}
