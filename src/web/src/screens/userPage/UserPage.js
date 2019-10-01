import React from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Button,
  Upload,
  Icon,
  Row,
  Col,
  Input,
} from 'antd';

const { Option } = Select;

class Demo extends React.Component {
  state = {
    price: 0,
    ETH: 0,
}
  componentDidMount() {
    fetch('https://api.pro.coinbase.com/products/ETH-USD/ticker')
      .then(response => response.json())
      .then(data => {
        this.setState({ETH: data.price }) 
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log("Click Submit ")
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Media's name">
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input the name of this song!' }],
          })(<Input placeholder="Please select song's name" />)}
        </Form.Item>

        <Form.Item label="Genres">
          {getFieldDecorator('radio-group', {
            initialValue: 'Music',
          })(
            <Radio.Group>
              <Radio value="Music">Music</Radio>
              <Radio value="Image">Image</Radio>
            </Radio.Group>,
          )}
        </Form.Item>

        <Form.Item label="Tags">
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: 'Please select song\'s tag ', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select song's tag">
              <Option value="Rap">Rap</Option>
              <Option value="Rock">Rock</Option>
              <Option value="young">Young</Option>
              <Option value="pre-war">Pre-war</Option>
              <Option value="lyrical">Lyrical</Option>
              <Option value="US-UK">US-UK</Option>
            </Select>,
          )}
        </Form.Item>
        
        <Form.Item label="Price">
          {getFieldDecorator('price')(
            <Row>
            <Col span={8}>
              <Form.Item label="USD">
                {getFieldDecorator('input-number', { initialValue: 0, onChange: (e) => this.setState({price: e/this.state.ETH }) })(<InputNumber min={0} max={10} />)}
                <span className="ant-form-text"> USD</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ETH">
                <span className="ant-form-text">{this.state.price} ETH</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="HAK">
                <span className="ant-form-text">{this.state.price*(Math.pow(10, 8))} HAK</span>
              </Form.Item>
            </Col>
          </Row>
          )}
        </Form.Item>

        <Form.Item label="Contract permission">
          {getFieldDecorator('switch', { initialValue: true, valuePropName: 'checked' })(<Switch />)}
        </Form.Item>

        <Form.Item label="Dragger">
          {getFieldDecorator('dragger', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>,
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Demo = Form.create({ name: 'validate_other' })(Demo);
          