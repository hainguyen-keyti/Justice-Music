import React from 'react';
import 'antd/dist/antd.css';
import {
  Row,
  Col,
  Empty,
  Spin
 } from 'antd';
import {getISOAddress} from '../../api/userAPI'
import InfoISO from '../../components/infoISO'
import { connect} from 'react-redux'
import './index.css'

class ISOAddress extends React.Component {
  render() {
    console.log(this.props.pageReducer.isoData.length)
    return (
      <div style={{width: '100%'}}>
        {this.props.pageReducer.loadingIsoData ? <div className="loading-data-iso"> <Spin size="large"/> </div> : 
          (this.props.pageReducer.isoData.length === 0 ?
          <div className="loading-data-iso"> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> </div> :
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
            {this.props.pageReducer.isoData.map(record => 
            <Col key={record.idFile} span={8}>
              <InfoISO
                record={record}
                action={true}
              />
            </Col>
          )}
          </Row>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pageReducer: state.pageReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getISOAddress: (address)=>dispatch(getISOAddress(address))
})
export default connect(mapStateToProps, mapDispatchToProps)(ISOAddress);