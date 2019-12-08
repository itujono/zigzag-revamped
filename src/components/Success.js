import React from "react"
import { Row, Col } from "antd"
import success from "assets/gifs/user-success-animation.gif"

function Success({ checkmark }) {
	return (
		<Row type="flex" justify="center" className="animated-tick">
			<Col span={12}>
				{checkmark ? (
					<svg
						width="133px"
						height="133px"
						viewBox="0 0 133 133"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						style={{ marginBottom: "2.5em" }}
					>
						<g id="check-group" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
							<circle id="filled-circle" fill="#66ceb2" cx="66.5" cy="66.5" r="54.5" />
							<circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5" />
							<circle id="outline" stroke="#66ceb2" strokeWidth="4" cx="66.5" cy="66.5" r="54.5" />
							<polyline id="check" stroke="#FFFFFF" strokeWidth="4" points="41 70 56 85 92 49" />
						</g>
					</svg>
				) : (
					<img src={success} width="180" alt="Success" style={{ marginBottom: "2em" }} />
				)}
			</Col>
		</Row>
	)
}

export default Success
