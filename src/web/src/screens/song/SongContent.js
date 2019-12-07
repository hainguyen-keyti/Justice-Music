
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Icon,
  Tabs,
  Button,
  Tooltip,
  Row,
  Col,
  Card,
  Avatar,
  Typography,

} from 'antd';
import MusicPlayerMainContent from '../../components/musicPlayer/musicPlayerMainContent';
import {connect} from 'react-redux';
import BuyMusic from '../../components/buyMusic';
import InvestISO from '../../components/investISO';
import InfoISO from '../../components/infoISO';
import UsingISO from '../../components/usingISO';
import TextText from '../../components/text-text';


const { Paragraph, Text} = Typography;

const { Meta } = Card;
const { TabPane } = Tabs;

class SongContent extends React.Component {
  state = {
    hashAvatar: "",
  };
  componentDidMount(){
    // this.props.getSongByID(this.props.idFile)
  }

  render() {
    const {idFile} = this.props
    return (
      <Row>
        <Row gutter={[0, 32]}>
          <Col span={18}>
            <Row>
              <MusicPlayerMainContent musicHash='this is hash of music' imageHash='this is hash of image' isDetail/>
            </Row>
            <Row style={{padding: 5, margin: 5}}>
              <Col span={8}>
                <Row>
                  <Meta style={{paddingBottom: 10}} avatar={<Avatar size={59} src={"https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C"} alt="Avatar photo"/>} title="Ngoc Trinh" description="15.256 Follows" />
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <Avatar shape='square' size={220} src={'https://ipfs.fotra.tk/ipfs/QmUFZGKFic3GVeWmkeGu1p2BpAYMPj5ZTamvwv29uRBg4C'} alt="Music photo"/>
                  <Paragraph strong style={{fontSize: '25px', margin: '15px'}} ellipsis>
                    Nói Hêt Lòng Này
                  </Paragraph>
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <TextText title='Singer' content='Liz Kim Cuong'  link='link here'/>
                  <TextText title='Author' content='Nguyễn Hoàng Hải'  link='link here'/>
                  <TextText title='Release' content='2019'/>
                  <TextText title='View' content='30.230.027'/>
                  <TextText title='Download Total' content='5.625'/>
                  <TextText title='Download Week' content='285'/>
                  <TextText title='Contract Permission' content='Allow'/>
                  <TextText title='ISO' content='Not Use' link='link here'/>
                  
                </Row>
              </Col>
              <Col span={16}>
                <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                  {/* <Button size="large" type="primary" ghost>
                    <InfoISO />
                  </Button>               */}
                  <Button size="large" type="primary" ghost>
                    <InvestISO idFile={idFile}/>
                  </Button>
                  <Button size="large" type="primary" ghost>
                    <UsingISO idFile={idFile}/>  
                  </Button>
                  <Button size="large" type="primary" ghost>
                    <BuyMusic idFile={idFile}/>  
                  </Button>
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <Tabs defaultActiveKey="2">
                    <TabPane
                      tab={
                        <span>
                          <Icon type="apple" />
                          Lyric
                        </span>
                      }
                      key="1"
                    >
                      Tab 1
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <Icon type="android" />
                          Review
                        </span>
                      }
                      key="2"
                    >
                      Tab 2
                    </TabPane>
                  </Tabs>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <div style={{backgroundColor: '#e0e0e0', height: 1000}}>
              Advertising
            </div>
          </Col>
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(SongContent);