import React from 'react'
import { Table, Avatar, Typography, Divider, Icon, Tag, Button } from 'antd';
import { getUserUpload, download } from '../../api/userAPI'
import { connect} from 'react-redux'
import {set_music_selected} from '../../actions/app'
import UsingISO from '../../components/usingISO'
import InvestISO from '../../components/investISO'
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'

const { Text, Title } = Typography;
class MusicTable extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.handleTableChange();
  }

  handleTableChange = (pagination) => {
    this.setState({ loading: true })
    getUserUpload(pagination ? pagination.current : 1).then(data => {
        const pagination = { ...this.state.pagination };
        console.log("this is data")
        console.log(data)
        pagination.pageSize = 10;
        pagination.total = data.total
        this.setState({
          loading: false,
          data: data.file,
          pagination,
        });
      });
  };

  handleBuySong = (idFile) => {
    showNotificationLoading("Downloading ...")
    const data = {
      _idFile: idFile
    }
    download(data)  
    .then((txHash) => {
      showNotificationTransaction(txHash);
    })
    .catch((error) => {
      showNotificationFail(error)
    })  
  };


  render() {
    const columns = [
      {
        title: 'Image',
        dataIndex: 'music.image',
        // sorter: true,
        render: image => <Avatar shape='square' size='large' src={'https://ipfs.io/ipfs/' + image} alt="Music photo"/>,
        // width: '20%',
      },
      {
        title: 'name',
        dataIndex: 'music',
        render: music =>
            <div 
                style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center'
                }}
            >
                <Button  style={{textAlign: 'left', padding: 0}}  type="link" onClick={() => {this.props.set_music_selected(music.hash)}}>{music.name}</Button>
                <Text type="secondary">{music.artist}</Text>
            </div>,
        // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        // width: '20%',
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
            <Text type="secondary">
                <Icon type="customer-service" style={{marginRight: '10px'}} theme="twoTone" />
                {view}
            </Text>
        )
      },
      {
        title: 'action',
        key: 'action',
        render: record => (
          <div style={{display: 'flex'}}>
              <Icon type="solution" />
              <Divider type="vertical" />
              <Icon type="caret-right" />
              <Divider type="vertical" />
              <UsingISO idFile={record.idFile}/>
              <Divider type="vertical" />
              {record.IsISO ? <Icon type="check-square" style={{ color: '#1da1f2'}} /> : <Icon type="close-square" />}
              <Divider type="vertical" />
              <InvestISO idFile={record.idFile}/>
              <Divider type="vertical" />
              <Icon  style={{ color: '#1da1f2'}} type="download" onClick={()=>{this.handleBuySong(record.idFile)}} />
          </div>
        ),
      },
    ];    
    return (
      <Table
        size="middle"
        showHeader={false}
        title={()=><Title level={4} style={{color: '#2daaed'}}>BÀI HÁT CỦA KEYTI</Title>}
        columns={columns}
        rowKey={record => record.idFile}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
})

const mapDispatchToProps = (dispatch) => ({
  set_music_selected: (musicSelected)=>dispatch(set_music_selected(musicSelected))
})
export default connect(mapStateToProps, mapDispatchToProps)(MusicTable);