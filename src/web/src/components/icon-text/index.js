import React from 'react';
import { Typography, Icon } from 'antd';

const { Paragraph} = Typography;


export default class IconText extends React.Component {
  render() {
    const {icon, link, content} = this.props
    return (
      <div style={{display: 'flex', alignItems: 'center', paddingBottom: 5, marginBottom: 15}}>
        <Icon type={icon} style={{marginRight: 10,fontSize: 16,  color: '#1da1f2'}}/>
        <Paragraph style={{marginBottom: 0}} ellipsis>
          <a href={link} style={{color: '#888888'}}>
          {content}
          </a>
        </Paragraph>
      </div>
    )
  }
}
