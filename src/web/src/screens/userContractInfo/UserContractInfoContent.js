import React from 'react';
import 'antd/dist/antd.css';
import {
  Row,
  Col,
  Typography
 } from 'antd';
import {getUserContract} from '../../api/userAPI'
import ContractCard from '../../components/contractCard'
import { connect} from 'react-redux'
import ComponentLoading from '../../components/loading'
import MusicCard from '../../components/musicCard'


const { Text, Title } = Typography;

class UserContractInfoContent extends React.Component {
  state = {
    dataContract: null,
    loading: true,
  };

  componentDidMount() {
    getUserContract().then(data => {
      console.log(data)
      this.setState({
        dataContract: data,
        loading: false
      });
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        {!this.state.dataContract ? <ComponentLoading /> : 
        (
          <Row gutter={[32, 32]}>
            <Col span={18}>

              <Row style={{padding: 10, margin: 10, textAlign: 'center'}}>
                <Title level={4} type="secondary"> You Are Owner </Title>
              </Row>

              <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                {this.state.dataContract.ownerData.map(record =>
                <Col key={record._id} span={6}>
                    <MusicCard songInfo={record.songID} contract={record}/>
                </Col>)}
              </Row>

              <Row style={{padding: 10, margin: 10, textAlign: 'center'}}>
                <Title level={4} type="secondary"> You Are Signer </Title>
              </Row>

              <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                {this.state.dataContract.signerData.map(record =>
                <Col key={record._id} span={6}>
                  <MusicCard songInfo={record.songID} contract={record}/>
                </Col>)}
              </Row>

            </Col>

            <Col span={6}>
              <div style={{backgroundColor: '#e0e0e0', height: 1000}}>
                Advertising
              </div>
            </Col>
          </Row>
          
        )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(UserContractInfoContent);