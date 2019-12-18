import React from 'react';
import 'antd/dist/antd.css';
import {
  Input,
  Tabs,
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Card,
  Avatar,
  Form,
  message,
  InputNumber,
  Switch,
  Icon
} from 'antd';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import {getContract} from '../../api/userAPI'
import ComponentLoading from '../../components/loading'
import IconText from '../../components/icon-text';
import {formatThousands} from '../../utils/common'

const { Meta } = Card;
const { TabPane } = Tabs;
const { Text, Title } = Typography


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
class extends React.Component {
    state = {
        contractMoney: 0,
        OwnerCA: 0,
        SignerCA: 0,
        costUSD: 23000,
      }
    componentDidMount() {
    this.props.onRef(this)
    }
    componentWillUnmount() {
    this.props.onRef(undefined)
    }
    render() {
      const { nameContractForm, contractMoney, ownerCompensationAmount, signerCompensationAmount, isPublic, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form layout="vertical">

          <Form.Item label="Contract name">
          {getFieldDecorator('nameContractForm', {
            rules: [{ required: true, message: 'Please input the name of this contract!' }],
            initialValue: nameContractForm
          })(<Input placeholder="Please input contract's name" />)}
        </Form.Item>

          <Form.Item label="Contract Money">
            {getFieldDecorator('contractMoney', {
              rules: [{ required: true, message: 'Please input contract money of this song!'}], 
              initialValue: contractMoney, 
              onChange: (e) => {
              this.setState({contractMoney: e/this.state.costUSD})
              }})(<InputNumber placeholder="9.000.000" style={{width: 200}} min={0} />)}
            <span className="ant-form-text"> HAK</span>
            <span className="ant-form-text">➜   {this.state.contractMoney} USD</span>
          </Form.Item>

          <Form.Item label="Owner Compensation Amount">
            {getFieldDecorator('ownerCompensationAmount', {
              rules: [{ required: true, message: 'Please input Owner Compensation Amount!'}], 
              initialValue: ownerCompensationAmount, 
              onChange: (e) => {
              this.setState({OwnerCA: e/this.state.costUSD})
              }})(<InputNumber placeholder="6.000.000"  style={{width: 200}} min={0} />)}
            <span className="ant-form-text"> HAK</span>
            <span className="ant-form-text">➜   {this.state.OwnerCA} USD</span>
          </Form.Item>
          
          <Form.Item label="Signer Compensation Amount">
            {getFieldDecorator('signerCompensationAmount', {
              rules: [{ required: true, message: 'Please input Signer Compensation Amount!'}], 
              initialValue: signerCompensationAmount, 
              onChange: (e) => {
              this.setState({SignerCA: e/this.state.costUSD})
              }})(<InputNumber placeholder="10.000.000" style={{width: 200}} min={0} />)}
            <span className="ant-form-text"> HAK</span>
            <span className="ant-form-text">➜   {this.state.SignerCA} USD</span>
          </Form.Item>

          <Form.Item label="Public Permission">
            {getFieldDecorator('isPublic', {
              rules: [{ required: true, message: 'Please choose this field!'}], 
              initialValue: isPublic,
              valuePropName: 'checked'
              })(<Switch />)}
          </Form.Item>

        </Form>
      );
    }
  },
);



class MainContractContent extends React.Component {

  state = { 
    text: '',
    contract: null,
   };

  componentWillReceiveProps({idContract}){
    if (idContract !== this.props.idContract) {
      getContract(idContract)
    }
  }
  componentDidMount(){
    console.log(this.props.idContract)
    getContract(this.props.idContract).then((data) => {
      console.log(data)
      this.setState({contract: data, text: data.content})
    })
    .catch(error => {
      console.log(error)
    })
  }


  handleChangeContent = (value) => {
    this.setState({ text: value })
  }

  hanldeUpdateContract = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if(err){
        return message.error('please fill out all fields');
      }
      form.resetFields();
      this.child.resetUSD();
      //goi api
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    if(!this.state.contract){
      return <ComponentLoading />
    }
    const {songID, isExecuteContract, ownerID, ownerFollow, ownerApproved, signerID, signerApproved, signerFollow, nameContractForm, contractMoney, ownerCompensationAmount, signerCompensationAmount, isPublic } = this.state.contract
    return (
      <div style={{}}>

        <Row  style={{display: 'flex', justifyContent: 'center', padding: 5, margin: 5}}>
          <Title level={4}>{songID.name}</Title>
        </Row>

        <Row gutter={[32, 32]}>
          <Col span={6}>
            <Card style={{backgroundColor: '#FBFBFB'}} hoverable bordered={false}>
              <div className="logo-name">
                <div style={{padding: '15px'}}>
                  <Avatar size={180} src={window.$linkIPFS + ownerID.avatar} alt="Avatar photo"/>
                </div>
                <div>
                  <Title ellipsis level={4}>{ownerID.nickName}</Title>
                  <Text type="secondary">{ownerFollow} Follow</Text>
                  <br/>
                  <Text type="danger">Owner</Text>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                    <Text type="secondary">Approved : </Text>
                    <Switch
                      disabled={this.props.userReducer.user.id === ownerID._id ? false : true }
                      defaultChecked={ownerApproved}
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="close" />}
                    />
                  </div>
                </div>
              </div>
              <IconText icon='phone' link="linkPhone" content={ownerID.phone} />
              <IconText icon='youtube' link="linkYoutube" content={ownerID.youtube} />
              <IconText icon='facebook' link="linkFacebook" content={ownerID.facebook} />
              <IconText icon='home' link="linkHome" content={ownerID.home} />
            </Card>
          </Col>

          <Col  style={{backgroundColor: '#FBFBFB'}} span={12}>
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              onRef={ref => (this.child = ref)}
              nameContractForm={nameContractForm}
              contractMoney={contractMoney}
              ownerCompensationAmount={ownerCompensationAmount}
              signerCompensationAmount={signerCompensationAmount}
              isPublic={isPublic}
            />
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button disabled={(signerApproved && ownerApproved && !isExecuteContract) ? false : true} type="danger"> Execute Transaction</Button>
              <Button disabled={(isExecuteContract) ? true : false} type="primary"> Update Contract</Button>
              <Button disabled={(signerApproved && ownerApproved && isExecuteContract) ? false : true} type="danger"> Confirm Transaction</Button>
            </div>
          </Col>

          <Col span={6}>
            <Card style={{backgroundColor: '#FBFBFB'}} hoverable bordered={false}>
              <div className="logo-name">
                <div style={{padding: '15px'}}>
                  <Avatar size={180} src={window.$linkIPFS + signerID.avatar} alt="Avatar photo"/>
                </div>
                <div>
                  <Title ellipsis level={4}>{signerID.nickName}</Title>
                  <Text type="secondary">{signerFollow} Follow</Text>
                  <br/>
                  <Text type="warning">Signer</Text>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                    <Text type="secondary">Approved : </Text>
                    <Switch
                      disabled={this.props.userReducer.user.id === signerID._id ? false : true }
                      defaultChecked={signerApproved}
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="close" />}
                    />
                  </div>
                </div>
              </div>
              <IconText icon='phone' link="linkPhone" content={signerID.phone} />
              <IconText icon='youtube' link="linkYoutube" content={signerID.youtube} />
              <IconText icon='facebook' link="linkFacebook" content={signerID.facebook} />
              <IconText icon='home' link="linkHome" content={signerID.home} />
            </Card>
          </Col>
        </Row>
        <Row>
          <ReactQuill
              theme="snow"
              value={this.state.text}
              onChange={this.handleChangeContent}
              modules={MainContractContent.modules}
              formats={MainContractContent.formats}
              placeholder="Write something..."
              style={{width: '100%', height: '1000px',marginBottom: '50px'}}
              />
        </Row>
      </div>
    )
  }
}


MainContractContent.modules = {
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

MainContractContent.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]



const mapStateToProps = (state) => ({
  // songReducer: state.songReducer,
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  // getSongByID: (idContract) => dispatch(getSongByID(idContract)),
  // getSongSameSinger: (data) => dispatch(getSongSameSinger(data)),
  // getRelatedUser: () => dispatch(getRelatedUser())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContractContent));

