import React from 'react'
import { Table, Avatar, Typography, Divider, Icon, Tag, Button } from 'antd';
import { getUserUpload } from '../../api/userAPI'
import { connect} from 'react-redux'
import {set_music_selected} from './actions'

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

  render() {
    const columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        // sorter: true,
        render: image => <Avatar shape='square' size='large' src={image} alt="Music photo"/>,
        // width: '20%',
      },
      {
        title: 'name',
        dataIndex: 'name',
        render: name =>
            <div 
                style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center'
                }}
            >
                <Button  style={{textAlign: 'left', padding: 0}}  type="link" onClick={() => {this.props.set_music_selected(name.fileHash)}}>{name.songName}</Button>
                <Text type="secondary">{name.artistName}</Text>
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
        dataIndex: 'view',
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
        render: () => (
            <a href='https://ipfs.io/ipfs/Qmd6GcyBLsYwCSMANcnFBAnWc8nuqxwSvJSYU7rPDkCRJ3'>
                <Icon type="solution" />
                <Divider type="vertical" />
                <Icon type="caret-right" />
                <Divider type="vertical" />
                <Icon type="ellipsis" />
            </a>
        ),
      },
    ];    
    return (
      <Table
        size="middle"
        showHeader={false}
        title={()=><Title level={4} style={{color: '#2daaed'}}>BÀI HÁT SƠN TÙNG M-TP</Title>}
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
  pageReducer: state.pageReducer,
})

const mapDispatchToProps = (dispatch) => ({
  set_music_selected: (musicSelected)=>dispatch(set_music_selected(musicSelected))
})
export default connect(mapStateToProps, mapDispatchToProps)(MusicTable);