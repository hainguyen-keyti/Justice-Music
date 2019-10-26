import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Modal,
    Upload,
    Icon,
    Input,
    Button,
    message
  } from 'antd';
import 'antd/dist/antd.css';
import {usingISO} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        const { Option } = Select;
        return (
          <Modal
            visible={visible}
            title="Using ISO"
            okText="Submit"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="horizontal">
              <Form.Item label="Offer Percent">
                {getFieldDecorator('offerPercent', {rules: [{ required: true, message: 'Please input cost of this song!'}], initialValue: 0})
                (<InputNumber
                    min={0}
                    max={100000}
                    style={{width: 150}}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    />)}
              </Form.Item>
              <Form.Item label="Offer Amount">
                {getFieldDecorator('offerAmount', {rules: [{ required: true, message: 'Please input cost of this song!'}], initialValue: 0})
                (<InputNumber
                    min={0}
                    style={{width: 150}}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />)}
              </Form.Item>
              <Form.Item label="Offer Maintain">
                {getFieldDecorator('maintain', {rules: [{ required: true, message: 'Please input cost of this song!'}], initialValue: 0})
                (<InputNumber
                    min={0}
                    max={3601}
                    style={{width: 150}}
                    formatter={value => `🕗 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\🕗\s?|(,*)/g, '')}
                    />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
);

export default class UsingISO extends React.Component {
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
      if(err){
        return message.error('Please fill out all fields');
      }
      this.openUploadNotification(values)
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  openUploadNotification = (values) => {
    showNotificationLoading("Uploading ...")
    let data = {
      ...values,
      idFile: this.props.idFile
    }
    console.log(data)
    usingISO(data)  
    .then((txHash) => {
      showNotificationTransaction(txHash);
    })
    .catch((error) => {
      showNotificationFail(error)
    })  
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  
  render() {
    return (
      <div>
        <Icon type="usergroup-add" onClick={this.showModal} style={{ color: '#1da1f2'}}/>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
