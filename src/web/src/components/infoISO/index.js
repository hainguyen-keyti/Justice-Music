import React from 'react';
import 'antd/dist/antd.css';
import './InfoISO.css'
import { Card, Progress, Tooltip, Statistic, Avatar, Typography } from 'antd';

const { Meta } = Card;
const { Countdown } = Statistic;
const { Text } = Typography;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30

export default class InfoISO extends React.Component {
  render() {
    let { background, artistAvatar, songName, artistName, currentPercent, timeExpire}= this.props
    console.log(deadline)
    return (
  <Card
      hoverable
      style={{ width: 250, display: 'flex', margin: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
      cover={<img className="img-background-music" alt="music background" src={background}/>}
      bodyStyle={{padding: '15px', width: '100%'}}
    >
      <Meta style={{paddingBottom: 10}} avatar={<Avatar size={59} src={artistAvatar} alt="Avatar photo"/>} title={songName} description={artistName} />
      <Tooltip title="ISO">
        <Text type="warning" style={{marginTop: "10px"}}>Percent Remaining</Text>
        <Progress
        style={{paddingRight: '10px'}}
          strokeColor={{
            from: '#108ee9',
            to: '#FF5733',
          }}
          percent={currentPercent}
          status="active"
          showInfo
        />
      </Tooltip>
      <Countdown title="Time Remaining" valueStyle={{fontSize: '16px'}} value={timeExpire} format="D Ngày H Giờ m Phút s" />
    </Card>
    )
  }
}
