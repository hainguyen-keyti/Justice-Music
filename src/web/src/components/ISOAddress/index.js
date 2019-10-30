import React from 'react';
import 'antd/dist/antd.css';
import {
  Col,
  Skeleton
 } from 'antd';
import {getISOAddress} from '../../api/userAPI'
import InfoISO from '../../components/infoISO'
import { connect} from 'react-redux'

class ISOAddress extends React.Component {
  state = {
    dataISO: [],
    loading: true,
  };

  componentDidMount() {
    getISOAddress(this.props.userReducer.user.addressEthereum).then(data => {
      this.setState({
        dataISO: data,
        loading: false
      });
    });
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        {this.state.loading ? <Skeleton active /> : 
          this.state.dataISO.map(record => 
            <Col span={8}>
              <InfoISO 
                background={"https://ipfs.io/ipfs/" + record.background}
                artistAvatar={"https://ipfs.io/ipfs/" + record.avatar}
                artistName={record.artistName}
                songName={record.musicName}
                currentPercent={100 - (record.amountRemaining * 100 / record.offerAmount)}
                timeExpire={record.timeExpired}
              />
            </Col>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ISOAddress);