import React, { Component } from 'react'
import { AutoComplete, Button, Icon, Input, Badge, Tooltip, Dropdown, Menu, Typography, InputNumber, Modal, Avatar } from 'antd';
import logo from '../../images/logo.png'
import {getFaucet} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, formatThousands} from '../../utils/common'
import { connect} from 'react-redux'
import { getBalance } from '../../actions/user' 

const { Text } = Typography;
class Header extends Component {
    state = { 
        visible: false,
        amountFaucet: 25000,
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
    }

  render () {
    const { visible, amountFaucet } = this.state
    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
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
                    <img src={logo} onClick={()=> this.props.history.push('/home')} alt="Justice music" style={{ width: "35px", height: "30px"}} />
                    {/* <Text strong style={{fontSize: 20}}>Justice Music</Text> */}
                </Tooltip>
            </div>
            <div>
                <Button ghost style={{color: '#424242', marginLeft: 5}} >SONGS</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} >ARTISTS</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/iso')} >ISO</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} >RANKING</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} >EVENTS</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} >CONTRACTS</Button>
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
                    <Badge count={1234}>
                        <Icon type="bell" style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                </Tooltip>
                <Tooltip placement="topLeft" title="Message" arrowPointAtCenter>
                    <Badge count={20}>
                        <Icon type="message" onClick={()=> this.props.history.push('/message')} style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                </Tooltip>
                <Tooltip placement="topLeft" title="Contract" arrowPointAtCenter>
                    <Badge count={5}>
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
                min={1000}
                max={1000000}
                style={{width: 150}}
                formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                onChange={e => {this.setState({ amountFaucet: e })}}
            />
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