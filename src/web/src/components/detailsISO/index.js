import React from 'react';
import {
    Button,
    Modal,
    Icon,
    Table,
    Tooltip,
    Typography
  } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import InfoISO from '../infoISO'
import InvestISO from '../investISO'
import {formatThousands} from '../../utils/common'
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
        render: address => <a href={`/${address}`}>{address}</a>,
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
          <Button type="danger" ghost icon="info-circle" onClick={this.showModal}>
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
              <InvestISO idFile={record.idFile} center/>
          ]}
        >
          <InfoISO record={record} action={false}/>
          <div style={{padding: 5, margin: 5}}>
            <Text >Total Offer Amount: </Text>
            <Text type="secondary">{formatThousands(record.offerAmount)} HAK</Text>
            <br />
            <Text >Total Offer Percent: </Text>
            <Text type="secondary">{parseFloat(record.offerPercent / 1000).toFixed(3)} %</Text>
            <br />
            <Text >Amount Remaining: </Text>
            <Text type="secondary">{formatThousands(record.amountRemaining)} HAK</Text>
            <br />
            <Text >Owner Percent Remaining: </Text>
            <Text type="secondary">{parseFloat(record.ownerPercent / 1000).toFixed(3)} %</Text>
            <br />
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailsISO);