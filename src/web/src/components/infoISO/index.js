import React from 'react';
import 'antd/dist/antd.css';
import './InfoISO.css'
// import InvestISO from '../../components/investISO'
import DetailsISO from '../../components/detailsISO'
import { Card, Progress, Statistic, Avatar, Typography, Button } from 'antd';
import { withRouter } from 'react-router';
import * as moment from 'moment';
import {formatThousands} from '../../utils/common'

const { Meta } = Card;
const { Countdown } = Statistic;
const { Text } = Typography;

class InfoISO extends React.Component {
  render() {
    let { record, action }= this.props
    return (
  <Card
      hoverable
      // style={{ width: 250, display: 'flex', margin: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
      cover={<img className="img-background-music" alt="music background" src={window.$linkIPFS + record.music.image}/>}
      bodyStyle={{padding: '15px', width: '100%', border: '0px solid green'}}
      actions={action ? [
        // <InvestISO idFile={record.idFile} center/>,
        <DetailsISO record={record}/>,
      ] : null
    }
    >
      <Meta 
        style={{paddingBottom: 10}} 
        avatar={<Avatar size={59} src={window.$linkIPFS + record.user.avatar} alt={record.user.nickName}/>} 
        title={ 
        <Button style={{textAlign: 'left', padding: 0, fontSize: 16}}  type="link" onClick={() => this.props.history.push(`/page/${record.user.addressEthereum}`)}>
          <Text style={{fontSize: 16}} type="warning">{record.user.nickName}</Text>
        </Button>
        } 
        description={<Text> {formatThousands(record.user.follow)} Follow </Text>} 
        />
      
      <Button  style={{textAlign: 'center', padding: 0, fontSize: 14, height: 20}}  type="link" onClick={()=> this.props.history.push(`/song/${record.music._id}`)}>{record.music.name}</Button>

      <br />
      <Text type="secondary" style={{marginTop: "10px"}}>Percent</Text>
      <Progress
      style={{paddingRight: '10px'}}
        strokeColor={{
          from: '#108ee9',
          to: '#FF5733',
        }}
        percent={Number(parseFloat(100 - (record.amountRemaining * 100 / record.offerAmount)).toFixed(1))}
        status="active"
        showInfo
      />
      {
        (moment().unix() >= record.timeExpired) ? 
        <div>
            <Text type="secondary">Time Remaining</Text>
            <br />
            <Text style={{fontSize: 18}} type='danger'>Expired</Text> 
        </div>
        :
        <Countdown title="Time Remaining" valueStyle={{fontSize: '16px'}} value={record.timeExpired * 1000} format="D Ngày H Giờ m Phút s" /> 
      }
    </Card>
    )
  }
}

export default withRouter(InfoISO)
