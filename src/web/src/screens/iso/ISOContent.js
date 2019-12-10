import React from 'react';
import 'antd/dist/antd.css';
import {
  Row,
  Col,
 } from 'antd';
import {getISOList} from '../../api/userAPI'
import InfoISO from '../../components/infoISO'
import { connect} from 'react-redux'
import ComponentLoading from '../../components/loading'

class ISOContent extends React.Component {
  state = {
    dataISO: [],
    loading: true,
  };

  componentDidMount() {
    getISOList().then(data => {
      this.setState({
        dataISO: data,
        loading: false
      });
    });
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        {this.state.loading ? <ComponentLoading /> : 
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
            {this.state.dataISO.map(record =>
            <Col key={record.idFile} span={6}>
              <InfoISO
                record={record}
                action={true}
              />
            </Col>
          )}
          </Row>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ISOContent);