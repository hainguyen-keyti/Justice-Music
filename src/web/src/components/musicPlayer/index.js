import React, { Component } from 'react'
import { Card } from 'antd';
import './index.css'
import { connect} from 'react-redux';
import MusicPlayerMainContent from './musicPlayerMainContent';


class MusicPlayer extends Component {
  render () {
    const {hash, image, idSolidity} = this.props.appReducer.musicSelected
    return (
      <div style={{visibility: this.props.isMusicDetail ? '' : Object.entries(this.props.appReducer.musicSelected).length === 0 ? 'hidden' : ''}}>
          <Card
          hoverable
          bordered={false}
          bodyStyle={{backgroundColor: '#D6DBDF', position: 'fixed', bottom: 0, width: '100vw', padding: 10 }}
          >
            <MusicPlayerMainContent 
              musicHash={hash} 
              imageHash={image} 
              idFile={idSolidity}/>
          </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);