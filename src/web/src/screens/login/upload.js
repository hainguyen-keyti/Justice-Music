import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import config from '../../config';
import { Upload, message } from 'antd';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    
    action: config.api_url + "/users/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log({name: info.file.originFileObj.name, link: (config.ipfs_url + info.file.response.result)});
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
export default class UploadFile extends React.Component {
    return 
    render() {
        return (
        <Dragger {...props}>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
        )
    }
}
