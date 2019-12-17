import React from 'react';
import {
    Button,
    Modal,
    Table,
    Tooltip,
    Typography
  } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import InfoISO from '../infoISO'
import InvestISO from '../investISO'
import {formatThousands} from '../../utils/common'
import TextText from '../../components/text-text';
import * as moment from 'moment';
import { withRouter } from 'react-router';
const { Text } = Typography;

class DetailsISO extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  onClickOk(value) {
    this.setState({ visible: value });
  }

  onClickCancel(value) {
    this.setState({ visible: value });
  }
  
  render() {
    let { record }= this.props
    const columns = [
      {
        title: 'Address',
        dataIndex: 'investor',
        key: 'address',
        ellipsis: true,
        render: address => <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  type="link" onClick={() => this.props.history.push(`/page/${address}`)}>{address}</Button>
      },
      {
        title: 'Invest percent',
        dataIndex: 'percentage',
        key: 'percent',
        render: percent => <Text>{parseFloat(percent / 1000).toFixed(3)} %</Text>,
      },
      {
        title: 'Invest Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: amount => <Text>{formatThousands(amount)} HAK</Text>,
      }, 
    ];
    return (
      <div>
        <Tooltip title="Show more details of this song" placement="rightTop">
          <Button type="primary" ghost icon="info-circle" onClick={this.showModal}>
            <Text>Detail ISO</Text>
          </Button>
        </Tooltip>
        <Modal
          title={record.music.name + " - ISO"}
          bodyStyle={{ padding: 0, margin: 0 }} // Nên set cái boder bằng 0 chổ này( hoặc trong component InfoISO) thì đẹp hơn.
          visible={this.state.visible}
          // onOk={()=>this.onClickOK(false)}
          onCancel={()=>this.onClickCancel(false)}
          footer={[
              <InvestISO disabled={(moment().unix() >= record.timeExpired) ? true : false} idFile={record.idFile} center/>
          ]}
        >
          <InfoISO record={record} action={false}/>
          
          <TextText title='Total Offer Amount' content={formatThousands(record.offerAmount) + ' HAK'}/>
          <TextText title='Total Offer Percent' content={parseFloat(record.offerPercent / 1000).toFixed(3) + '%'}/>
          <TextText title='Amount Remaining' content={formatThousands(record.amountRemaining) + ' HAK'}/>
          <TextText title='Owner Percent Remaining' content={parseFloat(record.ownerPercent / 1000).toFixed(3) + '%'}/>
          <TextText title='Invest table' content=''/>
          <Table rowKey={(record) => record.idFile} columns={columns} dataSource={record.investListISO} pagination={false}/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({

})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsISO));