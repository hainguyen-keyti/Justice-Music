import React from 'react'
import { Table, Avatar, Typography, Divider, Icon, Tag, Button, Tooltip, Card } from 'antd';
import { download } from '../../api/userAPI'
import { connect} from 'react-redux'
import {set_music_selected} from '../../actions/app'
import UsingISO from '../../components/usingISO'
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'
import config from '../../config'
import {getUserDownload} from '../../actions/page'
import BuyMusic from '../../components/buyMusic'
import { withRouter } from "react-router";
import {formatThousands} from '../../utils/common'

const { Text, Title } = Typography;
const { Meta } = Card;

class DataTable extends React.Component {
  handleBuySong = (idFile) => {
    showNotificationLoading("Downloading ...")
    const data = {
      _idFile: idFile
    }
    download(data)  
    .then((txHash) => {
      showNotificationTransaction(txHash);
      config.provider.waitForTransaction(txHash)
      .then(()=>{
        this.props.getUserDownload(this.props.userReducer.user.addressEthereum)
      })
    })
    .catch((error) => {
      showNotificationFail(error)
    })  
  };

  render() {
    const columns = [
      {
        title: 'songInfo',
        dataIndex: 'music',
        // sorter: true,
        render: music =>
        <Meta 
          avatar={<Avatar shape='square' size={50} src={window.$linkIPFS + music.image} alt="Music photo" onClick={()=> this.props.history.push(`/song/${music._id}`)}/>} 
          title={<Button  style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20}}  type="link" onClick={() => {this.props.set_music_selected(music)}}>{music.name}</Button>} 
          description={<Text type="secondary">{music.artist}</Text>} 
        />
      },
      {
        title: 'Tags',
        key: 'tags',
        render: () => (
          <span>
                <Tag color='volcano'>
                  HOT
                </Tag>
          </span>
        ),
      },
      {
        title: 'view',
        dataIndex: 'music.view',
        render: view => (
          <div>
            <Icon type="customer-service" style={{marginRight: '10px', color: '#1da1f2',  fontSize: 17}} />
            <Text type="secondary">{formatThousands(view)}</Text>
          </div>
        )
      },
      {
        title: 'cost',
        render: record => (
            <div>
              <Icon type="pay-circle" style={{marginRight: '10px', color: '#1da1f2',  fontSize: 17}} />
              <Text type="secondary">{formatThousands(record.price)} HAK</Text>
            </div>
        )
      },
      {
        title: 'action',
        key: 'action',
        render: record => (
          <div style={{display: 'flex'}}>

              <UsingISO disabled={(record.IsISO || this.props.userReducer.user.id !== this.props.pageReducer.userInfoData._id) ? true : false} idFile={record.idFile} circle={true}/>

              <Divider type="vertical" style={{height: '30px'}}/>
              
              <Tooltip title="Get a contract" placement="top"> 
                <Button type="primary" shape="circle" icon="solution" ghost onClick={()=> this.props.history.push(`${(record.music.userUpload == this.props.userReducer.user.id) ? '/contractFormManager' : `/tempContract/${record.music._id}` }`)}/>
              </Tooltip>

              <Divider type="vertical" style={{height: '30px'}}/>

              <BuyMusic  idFile={record.idFile} circle={true}/>

          </div>
        ),
      },
    ];
    return (
      <Table
        size="middle"
        showHeader={false}
        title={()=><Title level={4} style={{color: '#2daaed'}}>{ this.props.tableUpload ? `BÀI HÁT CỦA "${this.props.pageName}"` : `BÀI HÁT MÀ "${this.props.pageName}" ĐÃ MUA`}</Title>}
        columns={columns}
        rowKey={record => record.idFile}
        dataSource={this.props.tableUpload ? this.props.pageReducer.uploadData : this.props.pageReducer.downloadData}
        loading={ this.props.tableUpload ? this.props.pageReducer.loadingUpload : this.props.pageReducer.loadingDownload}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  pageReducer: state.pageReducer,
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getUserDownload: (myAddress)=>dispatch(getUserDownload(myAddress)),
  set_music_selected: (musicSelected)=>dispatch(set_music_selected(musicSelected))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTable));