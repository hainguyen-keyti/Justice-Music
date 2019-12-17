import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Icon,
  Tabs,
  Button,
  Tooltip,
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Table,
  Progress,
  Statistic,
  Modal
} from 'antd';
import * as moment from 'moment';
import MusicPlayerMainContent from '../../components/musicPlayer/musicPlayerMainContent';
import {connect} from 'react-redux';
import BuyMusic from '../../components/buyMusic';
import InvestISO from '../../components/investISO';
import InfoISO from '../../components/infoISO';
import UsingISO from '../../components/usingISO';
import TextText from '../../components/text-text';
import InputLyric from '../../components/inputLyric';
import {getSongByID, getSongSameSinger, getRelatedUser} from '../../actions/song';
import ComponentLoading from '../../components/loading'
import FollowButton from '../../components/followButton'
import { withRouter } from 'react-router';
import {formatThousands} from '../../utils/common'
import Component404 from '../../components/404'
import {postViewMusic} from '../../api/userAPI'
import MusicCard from '../../components/musicCard'
import StyleLoadingCard from '../../components/musicCard/styleLoadingCard'
import UserHomeCard from '../../components/userHomeCard'
import StyleLoadingCardUser from '../../components/userHomeCard/styleLoadingCardUser'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import {createTemplateContract, getUserTemplateContract} from '../../api/userAPI'
import ComponentSuccess from '../../components/success'
import ContractForm from '../../components/contractForm'


const { Paragraph, Text, Title} = Typography;
const { Countdown } = Statistic;
const { Meta } = Card;
const { TabPane } = Tabs;



class ContractContent extends React.Component {

  state = { 
    text: '',
    showCreateForm: false,
    isSuccess: false,
    tempContractData: [],
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
    getUserTemplateContract().then(data => {
      this.setState({tempContractData: data})
      console.log(data)
    })
  }


  handleChange = (value) => {
    this.setState({ text: value })
  }

  handleClickBtnCreate = (value) => {
    this.setState({showCreateForm: value})
  }

  handleOk = () => {
    const data = {
      tempContractID: this.props.tempContractID,
      content: this.state.text,
    }
    console.log(data)
    createTemplateContract(data).then((result) => {
      console.log(result)
      this.setState({
        text: '',
        isSuccess: true,
        showCreateForm: false,
      });
    })
  };

  render() {
    if(this.state.isSuccess){
      return <ComponentSuccess title="SUCCESSFUL" subTitle="Create contract form successful" goTo='home'/>
    }
    const operations = <Button type="primary" onClick={() => this.handleClickBtnCreate(true)}>Create Form</Button>;
    return (
      <div>
        <Tabs tabBarExtraContent={operations}>
          {this.state.tempContractData.map( (record, index) => {
            return <TabPane tab={'Template ' + (index + 1)} key={index}>
                      <ContractForm content={record.content} idMongo={record._id} number={index + 1}/>
                  </TabPane>
          })}
        </Tabs>
        <Modal
        title="CREATE NEW CONTRACT FORM"
        style={{ top: 20 }}
        visible={this.state.showCreateForm}
        onOk={this.handleOk}
        onCancel={() => this.handleClickBtnCreate(false)}
        >
          <ReactQuill
            theme="snow"
            value={this.state.text}
            onChange={this.handleChange}
            modules={ContractContent.modules}
            formats={ContractContent.formats}
            placeholder="Write something..."
            style={{width: '100%', height: '500px',marginBottom: '50px'}}
            />
        </Modal>
      </div>
    )
  }
}


ContractContent.modules = {
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

ContractContent.formats = [
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractContent));

