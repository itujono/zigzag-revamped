import React from "react"
import { Row, Col } from "antd"

function Success() {
	return (
		<Row type="flex" justify="center" className="animated-tick">
			<Col span={12}>
				<svg
					width="133px"
					height="133px"
					viewBox="0 0 133 133"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					style={{ marginBottom: "2.5em" }}
				>
					<g id="check-group" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
						<circle id="filled-circle" fill="#1890ff" cx="66.5" cy="66.5" r="54.5" />
						<circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5" />
						<circle id="outline" stroke="#1890ff" strokeWidth="4" cx="66.5" cy="66.5" r="54.5" />
						<polyline id="check" stroke="#FFFFFF" strokeWidth="4" points="41 70 56 85 92 49" />
					</g>
				</svg>
			</Col>
		</Row>
	)
}

export default Success