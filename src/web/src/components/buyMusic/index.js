import React from 'react'
import { Button, Tooltip, Typography } from 'antd';
import { download } from '../../api/userAPI'
import { connect} from 'react-redux'
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'
import config from '../../config'
import {getUserDownload} from '../../actions/page'


const { Text } = Typography;


class BuyMusic extends React.Component {
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
    return (
      <div>
        {
        this.props.circle ? 
        <Tooltip title="Buy this song" placement="top">
          <Button shape="circle" type="primary" ghost icon="download" onClick={()=>{this.handleBuySong(this.props.idFile)}}/>
        </Tooltip>
        :
        <Tooltip title="Buy this song" placement="leftTop">
          <Button type="primary" ghost icon="download" onClick={()=>{this.handleBuySong(this.props.idFile)}}>
            <Text>Buy</Text>
          </Button>
        </Tooltip>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getUserDownload: (address)=>dispatch(getUserDownload(address)),
})
export default connect(mapStateToProps, mapDispatchToProps)(BuyMusic);