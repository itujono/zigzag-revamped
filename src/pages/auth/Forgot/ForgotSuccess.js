import React, { useEffect } from "react"
import { Row, Col, Button, Icon, Alert, Card } from "antd"
import { Link } from "react-router-dom"
import { Section, Success, Heading } from "components"

function ForgotSuccess({ location: { state }, history }) {
	return (
		<Section textAlign="center">
			<Row type="flex" justify="center" style={{ marginTop: "3em" }}>
				<Col lg={8}>
					<Card noHover padding="3em">
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
							style={{ textAlign: "left", marginBottom: "4em" }}
						/>
						<Button type="primary">
							<Icon type="home" /> &nbsp; <Link to="/login">Go back to Login</Link>
						</Button>
					</Card>
				</Col>
			</Row>
		</Section>
	)
}

export default ForgotSuccess
