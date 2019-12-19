import React from 'react';
import 'antd/dist/antd.css';
import {
  Input,
  Tabs,
  Button,
  Modal
} from 'antd';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import {createContract, getUserTemplateContract} from '../../api/userAPI'
import ContractForm from '../../components/contractForm'


const { TabPane } = Tabs;



class UseContractContent extends React.Component {

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
    getUserTemplateContract(this.props.idTempContract).then(data => {
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
        songID: this.props.idTempContract
      }
      console.log(data)
      createContract(data).then((result) => {
        console.log(result)
        this.setState({
          text: '',
          showCreateForm: false,
        });
        this.props.history.push('/mainContract/' + result.idContract)
        return Modal.success({
          title: 'Create new contract to this song success!',
        })
      })
      .catch(error => {
        return Modal.error({
          title: `Error: ${error}`,
        });
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
      <div>
        <Tabs tabBarExtraContent={operations}>
          {this.state.tempContractData.map( (record, index) => {
            return (
              <TabPane tab={record.nameContractForm} key={index}>
                <ContractForm mainContract={true} nameContractForm={record.nameContractForm} songID={this.props.idTempContract} content={record.content} idTempContract={record._id} date={record.date_updated}/>
              </TabPane>
            )
          })}
        </Tabs>
        <Modal
        title={<Input style={{width: '400px'}} placeholder="Input name of this contract form" onChange={this.handleChangeName} />}
        style={{ top: 20 }}
        visible={this.state.showCreateForm}
        onOk={this.handleOk}
        onCancel={() => this.handleClickBtnCreate(false)}
        >
          <ReactQuill
            theme="snow"
            value={this.state.text}
            onChange={this.handleChange}
            modules={UseContractContent.modules}
            formats={UseContractContent.formats}
            placeholder="Write something..."
            style={{width: '100%', height: '500px',marginBottom: '50px'}}
            />
        </Modal>
      </div>
    )
  }
}


UseContractContent.modules = {
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

UseContractContent.formats = [
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UseContractContent));

