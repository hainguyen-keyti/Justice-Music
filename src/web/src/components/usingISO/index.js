import React from 'react';
import {
    Form,
    InputNumber,
    Modal,
    Button,
    message,
    Tooltip,
    Typography
  } from 'antd';
import 'antd/dist/antd.css';
import {usingISO} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'
import config from '../../config'
import {getISOAddress} from '../../actions/page'
import {connect} from 'react-redux';
import * as moment from 'moment';

const { Text } = Typography;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      date: 86400,
    };
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
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
                {getFieldDecorator('offerPercent', {
                  rules: [{ required: true, message: 'Please input cost of this song!'}],
                  initialValue: 5000
                })(
                  <InputNumber 
                    min={1}
                    max={50000}
                    step={1}
                    style={{width: 150}}
                    formatter={value => `${value}%`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace('%', '').replace(/\$\s?|(,*)/g, '')}/>
                )}
              </Form.Item>

              <Form.Item label="Offer Amount">
                {getFieldDecorator('offerAmount', {
                  rules: [{ required: true, message: 'Please input cost of this song!'}],
                  initialValue: 1000000
                })(
                  <InputNumber
                    min={0}
                    style={{width: 150}}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                )}
              </Form.Item>

              <Form.Item label="Offer Maintain">
                {getFieldDecorator('maintain', {
                  rules: [{ required: true, message: 'Please input cost of this song!'}],
                  initialValue: this.state.date,
                  onChange: (e) => {this.setState({date: e})}
                  })(
                    <InputNumber
                      min={0}
                      max={2592000} //30 days
                      style={{width: 150}}
                      formatter={value => `🕗 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/🕗\s?|(,*)/g, '')}
                    />
                  )}
                {/* <span className="ant-form-text"> second</span>
                <span className="ant-form-text">➜ {moment(moment.duration(this.state.date, 'seconds')).format("YYYY-MM-DD hh:mm:ss")}</span> */}
              </Form.Item>
              
            </Form>
          </Modal>
        );
      }
    },
);

class UsingISO extends React.Component {
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
      config.provider.waitForTransaction(txHash)
      .then(()=>{
        this.props.getISOAddress(this.props.userReducer.user.addressEthereum)
      })
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
        {this.props.circle ? 
          <Tooltip title="Using ISO this song" placement="top">
            <Button disabled={this.props.disabled} shape="circle" type="danger" ghost icon="usergroup-add" onClick={this.showModal}/>
          </Tooltip>
          :
          <Tooltip title="Using ISO this song" placement="leftTop">
            <Button disabled={this.props.disabled} type="danger" ghost icon="usergroup-add" onClick={this.showModal}>
              <Text>Using ISO</Text>
            </Button>
          </Tooltip>
      }
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

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getISOAddress: (address)=>dispatch(getISOAddress(address)),
})
export default connect(mapStateToProps, mapDispatchToProps)(UsingISO);