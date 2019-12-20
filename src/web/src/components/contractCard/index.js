import React from 'react';
import 'antd/dist/antd.css';
import './index.css'
// import InvestISO from '../../components/investISO'
import DetailsISO from '../detailsISO'
import { Card, Progress, Statistic, Avatar, Typography, Button } from 'antd';
import { withRouter } from 'react-router';
import * as moment from 'moment';
import {formatThousands} from '../../utils/common'

const { Meta } = Card;
const { Countdown } = Statistic;
const { Text } = Typography;

class ContractCard extends React.Component {
  render() {
    let { record, isOwner }= this.props
    return (
  <Card
      style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}
      hoverable
      // style={{ width: 250, display: 'flex', margin: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
      cover={<img className="img-background-music" alt="music background" src={window.$linkIPFS + record.songID.image} onClick={()=> this.props.history.push(`/mainContract/${record._id}`)} />}
      bodyStyle={{padding: '15px', width: '100%', border: '0px solid green'}}
    //   actions={action ? [
    //     // <InvestISO idFile={record.idFile} center/>,
    //     <DetailsISO record={record}/>,
    //   ] : null
    // }
    >
      <Button  style={{textAlign: 'center', padding: 0, fontSize: 14, height: 20}}  type="link" onClick={()=> this.props.history.push(`/song/${record.songID._id}`)}>{record.songID.name}</Button>
      {isOwner ? 
      <Meta 
        style={{paddingBottom: 10}} 
        avatar={<Avatar size={59} src={window.$linkIPFS + record.ownerID.avatar} alt={record.ownerID.nickName}/>} 
        title={ 
        <Button style={{textAlign: 'left', padding: 0, fontSize: 16}}  type="link" onClick={() => this.props.history.push(`/page/${record.ownerID.addressEthereum}`)}>
          <Text style={{fontSize: 16}} type="warning">{record.ownerID.nickName}</Text>
        </Button>
        } 
        // description={<Text> {formatThousands(record.user.follow)} Follow </Text>} 
        />
        :
        <Meta 
        style={{paddingBottom: 10}} 
        avatar={<Avatar size={59} src={window.$linkIPFS + record.signerID.avatar} alt={record.signerID.nickName}/>} 
        title={ 
        <Button style={{textAlign: 'left', padding: 0, fontSize: 16}}  type="link" onClick={() => this.props.history.push(`/page/${record.signerID.addressEthereum}`)}>
          <Text style={{fontSize: 16}} type="warning">{record.signerID.nickName}</Text>
        </Button>
        }
        // description={<Text> {formatThousands(record.user.follow)} Follow </Text>} 
        />
      }
      

    </Card>
    )
  }
}

export default withRouter(ContractCard)
