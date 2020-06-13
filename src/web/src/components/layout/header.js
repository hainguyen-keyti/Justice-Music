import React, { Component } from 'react'
import io from 'socket.io-client'
import config from '../../config'
import { AutoComplete, Button, Icon, Input, Badge, Tooltip, Dropdown, Menu, Typography, InputNumber, Modal, Avatar, Result } from 'antd';
import logo from '../../images/logo.png'
import {getFaucet, getNotification} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, formatThousands, estimatedTime} from '../../utils/common'
import { connect} from 'react-redux'
import { getBalance } from '../../actions/user' 

const { Text, Paragraph } = Typography;
class Header extends Component {
    state = { 
        visible: false,
        amountFaucet: 5000000,
        notificationData: [],
        notificationCount: 0
    };
    onClickLogOut = () => {
        this.props.logOut();
        localStorage.clear();
        this.props.history.push('/login')
    }
    handleOk = () => {
      this.setState({visible: false});
      showNotificationLoading("Faucet HAK loading ...")
      let data = {
          address: this.props.userReducer.user.addressEthereum,
          amount: this.state.amountFaucet
      }
      getFaucet(data)
      .then((txHash) => {
          showNotificationTransaction(txHash);
      })
    };
    componentDidMount = () => {
        this.props.getBalance(this.props.userReducer.user.addressEthereum)
        if(this.state.notificationData.length === 0){
          getNotification().then(result => {
            this.setState({
              notificationData: result.data,
              notificationCount: result.countFalse
            })
          })
        }
    }
    handleClickSeen = (id, index) => {
      window.$socket.emit('notification_seen', {id})
      if(!this.state.notificationData[index].isSeen){
        const temp = this.state.notificationData
        temp[index].isSeen = true
        this.setState({
          notificationData: temp,
          notificationCount: this.state.notificationCount - 1
        })
      }
    }

    componentWillMount = () => {
      const token = this.props.userReducer.user.accessToken
      if(!window.$socket){
        window.$socket = io(config.url + '/chat', {'query':{'token':token}});
      }

      window.$socket.on('notification', data => {
        const temp = this.state.notificationData;
        temp.unshift(data);
        this.setState({
          notificationCount: this.state.notificationCount + 1,
          notificationData: temp,
        })
        // this.setState({notificationData: this.state.notificationData.push(data)})
        // alert('socket notification' + data);
      })
    }

  render () {
    const { visible, amountFaucet, notificationCount, notificationData } = this.state
    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
    let menuNotification = (
      <Menu>
        {notificationData.map((record, index) => 
            this.props.userReducer.user.id === record.senderID ? 
              <Menu.Item style={{display: 'flex', alignItems: 'center', backgroundColor: record.isSeen ? '#f5f5f5' : ''}} onClick={()=> this.handleClickSeen(record._id, index)}>
                <Avatar 
                  shape='square'
                  size={48} 
                  src={window.$linkIPFS + record.songImage}
                />
                <div style={{height: 50, marginLeft: 10}}>
                  <Paragraph style={{marginBottom: 7}} ellipsis>{record.contentSender}</Paragraph>
                  {record.type === 1 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Đang chờ <Text code>xác thực bản quyền tác phẩm</Text> trên hệ thống.</Paragraph>
                  :
                  record.type === 2 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn bị trừ vào ví <Text code>{formatThousands(record.money)}</Text> HAK.</Paragraph>
                  :
                  record.type === 3 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Thời gian cho phép đầu tư còn <Text code>{estimatedTime(record.money)}</Text></Paragraph>
                  :
                  record.type === 4 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn bị trừ vào ví <Text code>{formatThousands(record.money)}</Text> HAK.</Paragraph>
                  :
                  record.type === 6 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Approved</Text> nếu đã chấp nhận hợp đồng</Paragraph>
                  :
                  record.type === 7 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Chờ</Text> đối tác chấp nhận hợp đồng</Paragraph>
                  :
                  record.type === 8 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Kiểm tra</Text> lại số dư</Paragraph>
                  :
                  record.type === 9 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn phải chịu <Text code> tiền bồi thường</Text> vì hành động này</Paragraph>
                  :
                  record.type === 10 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bây giờ bạn là <Text code>Chủ sở hữu</Text> tác phẩm này trên hệ thống</Paragraph>
                  :
                  null
                }
                  </div>
             </Menu.Item>
            :
              <Menu.Item style={{display: 'flex', alignItems: 'center', backgroundColor: record.isSeen ? '#f5f5f5' : ''}} onClick={()=> this.handleClickSeen(record._id, index)}>
                {
                  record.type === 5 || record.type === 6 || record.type === 7 || record.type === 8 || record.type === 9 ? 
                  <Avatar 
                    shape='square'
                    size={48} 
                    src={window.$linkIPFS + record.songImage}
                  />
                  :
                  <Avatar 
                    shape='circle'
                    size={48} 
                    src={window.$linkIPFS + record.senderAvatar}
                  />
                }
                <div style={{height: 50, marginLeft: 10}}>
                  <Paragraph style={{marginBottom: 7}} ellipsis>{record.contentReceiver}</Paragraph>
                  {
                    record.type === 6 ?
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Kiểm tra</Text> lại hợp đồng này</Paragraph>
                    :
                    record.type === 7 ?
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Confirm</Text> hợp đồng trên Blockchain </Paragraph>
                    :
                    record.type === 8 ?
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Kiểm tra</Text> lại số dư</Paragraph>
                    :
                    record.type === 9 ?
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn nhận được <Text code>tiền bồi thường</Text></Paragraph>
                    :
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn được cộng thêm vào ví <Text code>{formatThousands(record.money)}</Text> HAK</Paragraph>
                  }
                </div>
              </Menu.Item>
          )}
      </Menu>
    )
    const menu = (
        <Menu>
            <Menu.Item onClick={()=> this.props.history.push('/HAK')}>
                <Icon type="pay-circle" style={{ color: '#1da1f2', fontSize: 15, margin: 5}} />
                <Text>{formatThousands(this.props.userReducer.user.HAK)} HAK</Text>
            </Menu.Item>
            <Menu.Item onClick={()=> this.props.history.push('/ETH')}>
                <Icon type="dollar" style={{ color: '#1da1f2', fontSize: 15, margin: 5}} />
                <Text>{this.props.userReducer.balanceETH} ETH</Text>
            </Menu.Item>
            <Menu.Divider />
          <Menu.Item onClick={()=> this.props.history.push('/contractFormManager')}>
            <Icon type="solution" style={{ color: '#1da1f2', fontSize: 15, margin: 5}} />
            <Text>Contract form manager</Text>
          </Menu.Item>
          <Menu.Item onClick={()=> this.props.history.push('/setting')}>
            <Icon type="setting" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
            <Text>Setting</Text>
          </Menu.Item>
          <Menu.Item onClick={() => {this.setState({visible: true})}}>
            <Icon type="transaction" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
            <Text>Faucet</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={()=> this.onClickLogOut()}>
            <Icon type="logout" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
            <Text>Log Out</Text>
          </Menu.Item>
        </Menu>
      );
    return (
      <div style={{borderBottom: '1px solid #D6DBDF', height: 60, display: 'flex' ,justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' , width: 1100}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tooltip placement="topLeft" title="Justice music" arrowPointAtCenter>
                    <img src={logo} onClick={()=> this.props.history.push('/home')} alt="Justice music" style={{ width: "40px", height: "40px"}} />
                    {/* <Text strong style={{fontSize: 20}}>Justice Music</Text> */}
                </Tooltip>
            </div>
            <div>
                <Button disabled type="text" style={{color: '#424242', marginLeft: 5}} >RANKING</Button>
                <Button disabled type="text" style={{color: '#424242', marginLeft: 5}} >EVENTS</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/upload')} >UPLOAD</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/iso')} >ISO</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/contract')} >CONTRACTS</Button>
                <AutoComplete
                    disabled
                    style={{ width: 200 }}
                    dataSource={dataSource}
                    placeholder="Tìm bài hát hoặc ca sĩ ..."
                    filterOption={(inputValue, option) =>
                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                >
                    <Input suffix={<Icon type="search"  className="certain-category-icon" />} />
                </AutoComplete>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tooltip placement="topLeft" title="Home Page" arrowPointAtCenter>
                      <Avatar 
                      shape='circle'
                      size={35} 
                      src={window.$linkIPFS + this.props.userReducer.user.avatar}
                      onClick={()=> {
                        this.props.userReducer.user.userName ?
                        this.props.history.push(`/page/${this.props.userReducer.user.userName}`) :
                        this.props.history.push(`/page/${this.props.userReducer.user.addressEthereum}`)
                      }}
                      />   
                </Tooltip>
                <Tooltip placement="topLeft" title="Notification" arrowPointAtCenter>
                  <Dropdown placement="bottomCenter" trigger={['click']} overlay={menuNotification} overlayStyle={{width:500 }}>
                    <Badge count={notificationCount}>
                        <Icon type="bell" style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                  </Dropdown>
                </Tooltip>
                <Tooltip placement="topLeft" title="Message" arrowPointAtCenter>
                    <Badge count={0}>
                        <Icon type="message" onClick={()=> this.props.history.push('/message')} style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                </Tooltip>
                <Tooltip placement="topLeft" title="Contract" arrowPointAtCenter>
                    <Badge count={0}>
                        <Icon type="profile" style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                </Tooltip>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Icon type="caret-down" style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                </Dropdown>
            </div>
        </div>
        <Modal
            title="Faucet HAK"
            width={250}
            visible={visible}
            onOk={this.handleOk}
            onCancel={() => {this.setState({visible: false})}}
            >
            <InputNumber
                defaultValue={amountFaucet}
                min={1000000}
                max={10000000}
                style={{width: 150, marginBottom: 20,marginRight: 10}}
                formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                onChange={e => {this.setState({ amountFaucet: e })}}
            />
            <span className="ant-form-text"> HAK</span>
            <InputNumber
                style={{marginRight: 10}} 
                disabled 
                defaultValue={0.1}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                 />
            <span className="ant-form-text"> ETH</span>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getBalance: (userAddress) => dispatch(getBalance(userAddress)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);