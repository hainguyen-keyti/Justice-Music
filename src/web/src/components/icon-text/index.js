import React from 'react';
import { Typography, Button } from 'antd';

const { Paragraph, Text} = Typography;


export default class TextText extends React.Component {
  render() {
    return (
      <Paragraph ellipsis>
        {/* <Icon style={{paddingRight: 10, fontSize: 20, color: '#1da1f2'}} type="phone"  />
            <Text href={"link"} type="secondary">
              fasdfsssssssss
            </Text> */}
          <Button icon="phone" type="link">
            <Text>
              alalalalalalaa
            </Text>
          </Button>
      </Paragraph>
    )
  }
}
