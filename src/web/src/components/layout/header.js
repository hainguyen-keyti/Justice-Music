import React, { Component } from 'react'
import io from 'socket.io-client'
import config from '../../config'
import { AutoComplete, Button, Icon, Input, Badge, Tooltip, Dropdown, Menu, Typography, InputNumber, Modal, Avatar, Result } from 'antd';
import logo from '../../images/logo.png'
import {getFaucet, getNotification} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, formatThousands} from '../../utils/common'
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
        console.log("hihihihihihihihihihihihihihihihihihihihihihihihihih")
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
  
      // this.socket.on('chat message', data => {
      //   let input = {
      //     senderID: data.senderID,
      //     receiverID: data.receiverID,
      //     content: data.content,
      //     date_created: Date(Date.now()),
      //   }
      //   if(data.senderID === this.props.chatReducer.receiverID)
      //     this.props.push_message(input)
      // })
  
      // this.socket.on('first message', data => {
      //   let input = {
      //     senderID: data.senderID,
      //     receiverID: data.receiverID,
      //     content: data.content,
      //     date_created: Date(Date.now()),
      //   }
      //   this.props.getListFriend()
      //   if(data.senderID === this.props.chatReducer.receiverID)
      //     this.props.push_message(input)
      // }) 
  
      // this.socket.on('is seen', () => {
      //   this.props.getListMessage(this.props.chatReducer.receiverID)
      // })
  
      // this.socket.on('typing', data => {
  
      //   if(data.senderID === this.props.chatReducer.receiverID){
      //     if(data.isTyping === true){
      //       this.setState({typing: true})
      //     }
      //     if(data.isTyping === false){
      //       this.setState({typing: false})
      //     }
      //   }
      // })
    }

  render () {
    const { visible, amountFaucet, notificationCount, notificationData } = this.state
    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
    let menuNotification = (
      <Menu>
        {notificationData.map((record, index) => 
            this.props.userReducer.user.id === record.senderID.toString() ? 
              <Menu.Item style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: record.isSeen ? '#f5f5f5' : ''}} onClick={()=> this.handleClickSeen(record._id, index)}>
                <Icon type="bell" style={{ color: '#1da1f2', fontSize: 15}} />
                <Paragraph style={{marginLeft: 10, margin: 5}} ellipsis={{ rows: 4}}>{record.contentSender}</Paragraph>
             </Menu.Item>
            :
            <Menu.Item style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: record.isSeen ? '#f5f5f5' : ''}} onClick={()=> this.handleClickSeen(record._id, index)}>
              <Icon type="pay-circle" style={{ color: '#1da1f2', fontSize: 15}} />
              <Paragraph style={{marginLeft: 10, margin: 5}} ellipsis={{ rows: 4}}>{record.contentReceiver}</Paragraph>
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
                <Button ghost style={{color: '#424242', marginLeft: 5}} >SONGS</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} >ARTISTS</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/iso')} >ISO</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} >RANKING</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} >EVENTS</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/contract')} >CONTRACTS</Button>
                <AutoComplete
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