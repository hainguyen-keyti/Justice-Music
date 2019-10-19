import React, { Component } from 'react'
import { AutoComplete, Button, Icon, Input, Badge, Tooltip } from 'antd';
import logo from '../../images/logo.png'

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

// const { Text } = Typography;
export default class Header extends Component {
    onClickLogOut = () => {
        this.props.logOut();
        localStorage.clear();
        this.props.history.push('/login')
      }
  render () {
    return (
      <div style={{borderBottom: '1px solid #D6DBDF', height: 60, width: '100vw', display: 'flex' ,justifyContent: 'center' }}>
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
                <Button ghost style={{color: '#424242', marginLeft: 5}} >ISO</Button>
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
            <div>
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
                <Tooltip placement="topLeft" title="Page" arrowPointAtCenter>
                    <Badge count={0}>
                        <Icon type="user" onClick={()=> this.props.history.push('/page')} style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>     
                </Tooltip>
                <Tooltip placement="topLeft" title="Log out" arrowPointAtCenter>
                    <Badge count={0}>
                        <Icon type="logout" onClick={()=> this.onClickLogOut()} style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                </Tooltip>
            </div>
        </div>
      </div>
    )
  }
}