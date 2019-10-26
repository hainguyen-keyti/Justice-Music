import 'antd/dist/antd.css';
import './footer.css'
import { Row, Col,Icon } from 'antd';
import React from 'react';
import logo from '../../images/logo.png'

export default class Footer extends React.Component {
	render () {
		return(
			<div className="wrapper">
				<div className="footerdiv">
					<div className='footercontent'>
					<Row gutter={8}>
						<Col className="gutter-row" span={8}>
							<img src={logo} className="footerlogo" alt='Justice music'/>
							<h2>Justice Music</h2>
						</Col>
						<Col className="gutter-row" span={8}>
							<div className="footermiddlecol">
							<p> <Icon type="environment" /> Silicon Valley, United States
							</p>
							<p> <Icon type="mobile" /> 0372598218</p>
							<p> © 2019 Justice Music All Rights Reserverd</p>
							</div>
						</Col>
						<Col className="gutter-row" span={8}>
							<h2> About The Company</h2>
							<p></p>
							<p> We offer many solutions to protect your music copyright.  </p>
						</Col>
					</Row>
					</div>
				</div>
			</div>
    	)
   }
}
