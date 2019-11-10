import React, { useEffect } from "react"
import { Row, Col, Button, Icon, Alert } from "antd"
import { Link } from "react-router-dom"
import Section from "components/Section"
import Success from "components/Success"
import Heading from "components/Heading"

function ForgotSuccess({ location: { state }, history }) {
	useEffect(() => {
		if (!state || !state.success) history.push("/forgot")
	})

	return (
		<Section textAlign="center">
			<Row type="flex" justify="center">
				<Col lg={8}>
					<Success />
					<Heading
						content="Check your email!"
						subheader="Great! The instruction on how to recover your password has been sent to your inbox. Thanks!"
					/>
					<Alert
						message="Don't forget to check your spam folder too"
						type="info"
						showIcon
						banner
						closable
						style={{ textAlign: "left", marginBottom: "2em" }}
					/>
					<Button type="primary">
						<Icon type="home" /> &nbsp; <Link to="/login">Go back to Login</Link>
					</Button>
				</Col>
			</Row>
		</Section>
	)
}

export default ForgotSuccess
