import React from 'react';
import 'antd/dist/antd.css';
import './InfoISO.css'
import InvestISO from '../../components/investISO'
import DetailsISO from '../../components/detailsISO'
import { Card, Progress, Statistic, Avatar, Typography } from 'antd';

const { Meta } = Card;
const { Countdown } = Statistic;
const { Text } = Typography;

export default class InfoISO extends React.Component {
  render() {
    let { record, action }= this.props
    return (
  <Card
      hoverable
      // style={{ width: 250, display: 'flex', margin: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
      cover={<img className="img-background-music" alt="music background" src={window.$linkIPFS + record.music.image}/>}
      bodyStyle={{padding: '15px', width: '100%', border: '0px solid green'}}
      actions={action ? [
        <InvestISO idFile={record.idFile} center/>,
        <DetailsISO record={record}/>,
      ] : null
    }
    >
      <Meta style={{paddingBottom: 10}} avatar={<Avatar size={59} src={window.$linkIPFS + record.user.avatar} alt="Avatar photo"/>} title={record.user.nickName} description="15.256 Follows" />
      <Text>
          <a href={this.props.link}>{record.music.name}</a>
      </Text>
      <br />
      <Text type="warning" style={{marginTop: "10px"}}>Percent</Text>
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
      <Countdown title="Time Remaining" valueStyle={{fontSize: '16px'}} value={record.timeExpired * 1000} format="D Ngày H Giờ m Phút s" />
    </Card>
    )
  }
}
