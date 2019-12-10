import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Text} = Typography;


export default class TextText extends React.Component {
  render() {
    return (
      <Paragraph style={{padding: 5, margin: 5}} ellipsis>
        <Text strong>{this.props.title} : </Text>
        <Text >
           {this.props.link ? 
            <a href={this.props.link}>{this.props.content}</a>
            :
            <Text type="secondary"> {this.props.content} </Text>
          }
        </Text>
      </Paragraph>
    )
  }
}
