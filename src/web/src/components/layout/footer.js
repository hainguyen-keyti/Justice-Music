import 'antd/dist/antd.css';
import './footer.css'
import { Row, Col } from 'antd';
import React from 'react';
import logo from '../../images/logo.png'





class Footer extends React.Component {
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
							<p> Justice Music</p>
							<p> Home About Contact Price</p>
							<p> © 2019 Justice Music All Rights Reserverd</p>
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
export default Footer;
