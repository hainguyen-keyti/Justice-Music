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
  Select,
  InputNumber,
  Switch,
  Icon
} from 'antd';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import {createContract, getUserTemplateContract} from '../../api/userAPI'
import ContractForm from '../../components/contractForm'
import IconText from '../../components/icon-text';
import {formatThousands} from '../../utils/common'

const { Meta } = Card;
const { TabPane } = Tabs;
const { Text, Title } = Typography


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

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { Option } = Select;
      return (
        <Form layout="vertical">
          <Form.Item label="Contract name">
          {getFieldDecorator('nameContractForm', {
            rules: [{ required: true, message: 'Please input the name of this contract!' }],
          })(<Input placeholder="Please input contract's name" />)}
        </Form.Item>

        <Form.Item label="Price HAK">
          {getFieldDecorator('Price', {rules: [{ required: true, message: 'Please input cost of this song!'}], initialValue: 0, onChange: (e) => {
            // e = Math.ceil(e)
            this.setState({USD: e/this.state.costUSD})
            }})(<InputNumber style={{width: 200}} min={0} />)}
          <span className="ant-form-text"> HAK</span>
          <span className="ant-form-text">➜   {this.state.USD} USD</span>
        </Form.Item>

        <Form.Item label="Owner Compensation Amount">
          {getFieldDecorator('ownerCompensationAmount', {rules: [{ required: true, message: 'Please input Owner Compensation Amount!'}], initialValue: 0, onChange: (e) => {
            // e = Math.ceil(e)
            this.setState({USD: e/this.state.costUSD})
            }})(<InputNumber style={{width: 200}} min={0} />)}
          <span className="ant-form-text"> HAK</span>
          <span className="ant-form-text">➜   {this.state.USD} USD</span>
        </Form.Item>
        
        <Form.Item label="Signer Compensation Amount">
          {getFieldDecorator('signerCompensationAmount', {rules: [{ required: true, message: 'Please input Signer Compensation Amount!'}], initialValue: 0, onChange: (e) => {
            // e = Math.ceil(e)
            this.setState({USD: e/this.state.costUSD})
            }})(<InputNumber style={{width: 200}} min={0} />)}
          <span className="ant-form-text"> HAK</span>
          <span className="ant-form-text">➜   {this.state.USD} USD</span>
        </Form.Item>

        {/* <Form.Item label="Price USD">
          <span className="ant-form-text">{this.state.USD} USD</span>
        </Form.Item> */}

        <Form.Item label="Public Permission">
          {getFieldDecorator('isPublic', { rules: [{ required: true, message: 'Please choose this field!'}], initialValue: false})(<Switch />)}
        </Form.Item>

          </Form>
      );
    }
  },
);



class MainContractContent extends React.Component {

  state = { 
    text: '',
    showCreateForm: false,
    tempContractData: [],
    nameContractForm: ''
   };

  // componentWillReceiveProps({idContract}){
  //   if (idContract !== this.props.idContract) {
  //     this.props.getSongByID(idContract)
  //   }
  // }
  componentDidMount(){
    // console.log(this.props.idContract)
    // this.props.getSongByID(this.props.idContract)
    // this.props.getRelatedUser()
    // postViewMusic({idSongMongo: this.props.idContract})
    getUserTemplateContract(this.props.idMongo).then(data => {
      this.setState({tempContractData: data})
      console.log(data)
    })
  }


  handleChange = (value) => {
    this.setState({ text: value })
  }

  handleChangeName = (e) => {
    const { value } = e.target;
    this.setState({ nameContractForm: value })
  }

  handleClickBtnCreate = (value) => {
    this.setState({showCreateForm: value})
  }

  handleOk = () => {
    if(this.state.text && this.state.nameContractForm){
      const data = {
        content: this.state.text,
        nameContractForm: this.state.nameContractForm,
        songID: this.props.idMongo
      }
      console.log(data)
      createContract(data).then((result) => {
        console.log(result)
        this.setState({
          text: '',
          showCreateForm: false,
        });
        this.props.history.push('/home')
        return Modal.success({
          title: 'Update Success!',
        })
      })
    }
    else{
      return Modal.error({
        title: 'Please fill all field!',
      });
    }
  };

  render() {
    const operations = <Button type="primary" onClick={() => this.handleClickBtnCreate(true)}>Create Form</Button>;
    return (
      <div style={{}}>
        <Row  style={{display: 'flex', justifyContent: 'center', padding: 5, margin: 5}}>
          <Title level={4}>This is song name</Title>
        </Row>
        <Row gutter={[32, 32]}>
        <Col span={6}>
          <Card style={{backgroundColor: '#FBFBFB'}} hoverable bordered={false}>
          <div className="logo-name">
                <div style={{padding: '15px'}}>
                  <Avatar size={180} src={window.$linkIPFS + 'Qmbu6yzNrZG8HpBhR5WXr7tSVkLfGZVkeo6sHEP2WECdBK'} alt="Avatar photo"/>
                </div>
                <div>
                  <Title level={4}>hai dep trai</Title>
                  <Text type="secondary">{5} Follow</Text>
                  <div style={{display: 'flex', marginTop: 10}}>
                    <Text type="secondary">Approved : </Text>
                    <Switch
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="close" />}
                    />
                  </div>
                </div>
              </div>
              {
                true ?
                <IconText icon='phone' link="linkPhone" content={"0375256958"} />
                :
                null
              }
             {
                true ?
                <IconText icon='youtube' link="linkYoutube" content={"youtube"} />
                :
                null
              }
              {
                true ?
                <IconText icon='facebook' link="linkFacebook" content={"facebook"} />
                :
                null
              }
              {
                true ?
                <IconText icon='home' link="linkHome" content={"home"} />
                :
                null
              }
          </Card>
             
            </Col>
          <Col  style={{backgroundColor: '#FBFBFB'}} span={12}>
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              onRef={ref => (this.child = ref)}
            />
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button type="danger"> Execute Transaction</Button>
              <Button type="primary"> Update Contract</Button>
              <Button disabled type="danger"> Confirm Transaction</Button>
            </div>
          </Col>
          <Col span={6}>
          <Card style={{backgroundColor: '#FBFBFB'}} hoverable bordered={false}>
          <div className="logo-name">
                <div style={{padding: '15px'}}>
                  <Avatar size={180} src={window.$linkIPFS + 'Qmbu6yzNrZG8HpBhR5WXr7tSVkLfGZVkeo6sHEP2WECdBK'} alt="Avatar photo"/>
                </div>
                <div>
                  <Title level={4}>hai dep trai</Title>
                  <Text type="secondary">{5} Follow</Text>
                  <div style={{display: 'flex', marginTop: 10}}>
                    <Text type="secondary">Approved : </Text>
                    <Switch
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="close" />}
                    />
                  </div>
                </div>
              </div>
              {
                true ?
                <IconText icon='phone' link="linkPhone" content={"0375256958"} />
                :
                null
              }
             {
                true ?
                <IconText icon='youtube' link="linkYoutube" content={"youtube"} />
                :
                null
              }
              {
                true ?
                <IconText icon='facebook' link="linkFacebook" content={"facebook"} />
                :
                null
              }
              {
                true ?
                <IconText icon='home' link="linkHome" content={"home"} />
                :
                null
              }
          </Card>
             
            </Col>
        </Row>
        <Row>
          <ReactQuill
              theme="snow"
              value={this.state.text}
              onChange={this.handleChange}
              modules={MainContractContent.modules}
              formats={MainContractContent.formats}
              placeholder="Write something..."
              style={{width: '100%', height: '1000px',marginBottom: '50px'}}
              />
        </Row>
        {/* <Tabs tabBarExtraContent={operations}>
          {this.state.tempContractData.map( (record, index) => {
            return (
              <TabPane tab={record.nameContractForm} key={index}>
                <ContractForm mainContract={true} nameContractForm={record.nameContractForm} songID={this.props.idMongo} content={record.content} idMongo={record._id} date={record.date_updated}/>
              </TabPane>
            )
          })}
        </Tabs>
        <Modal
        title={<Input style={{width: '400px'}} placeholder="Input name of this contract form" onChange={this.handleChangeName} />}
        style={{ top: 10 }}
        visible={this.state.showCreateForm}
        onOk={this.handleOk}
        onCancel={() => this.handleClickBtnCreate(false)}
        >
          <ReactQuill
            theme="snow"
            value={this.state.text}
            onChange={this.handleChange}
            modules={MainContractContent.modules}
            formats={MainContractContent.formats}
            placeholder="Write something..."
            style={{width: '100%', height: '500px',marginBottom: '50px'}}
            />
        </Modal> */}
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
  // userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  // getSongByID: (idContract) => dispatch(getSongByID(idContract)),
  // getSongSameSinger: (data) => dispatch(getSongSameSinger(data)),
  // getRelatedUser: () => dispatch(getRelatedUser())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContractContent));

