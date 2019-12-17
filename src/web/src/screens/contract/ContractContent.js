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
import {createTemplateContract} from '../../api/userAPI'
import ComponentSuccess from '../../components/success'


const { Paragraph, Text, Title} = Typography;
const { Countdown } = Statistic;
const { Meta } = Card;
const { TabPane } = Tabs;
class ContractContent extends React.Component {

  // componentWillReceiveProps({idContract}){
  //   if (idContract !== this.props.idContract) {
  //     this.props.getSongByID(idContract)
  //   }
  // }
  // componentDidMount(){
  //   console.log(this.props.idContract)
  //   this.props.getSongByID(this.props.idContract)
  //   this.props.getRelatedUser()
  //   postViewMusic({idSongMongo: this.props.idContract})
  // }

  state = { 
    text: '',
    isSuccess: false
   };

  handleChange = (value) => {
    this.setState({ text: value })
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
        isSuccess: true
      });
    })
  };

  render() {
    if(this.state.isSuccess){
      return <ComponentSuccess title="SUCCESSFUL" subTitle="Create contract form successful" goTo='home'/>
    }
    return (
      <Card
      bordered={false}
      title={<Title style={{alignContent: 'center'}} level={4}>CREATE NEW CONTRACT FORM</Title>} 
      extra={<Button 
        onClick={this.handleOk}
        type="primary">Submit</Button>} 
      style={{ width: '100%' }}
      >
      <ReactQuill
        theme="snow"
        value={this.state.text}
        onChange={this.handleChange}
        modules={ContractContent.modules}
        formats={ContractContent.formats}
        placeholder="Write something..."
        style={{width: '100%', height: '500px'}}
        />
    </Card>
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

