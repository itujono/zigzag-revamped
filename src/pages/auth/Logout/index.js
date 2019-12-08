import React, { useEffect } from "react"
import { Row, Col, Button, Icon, Alert, Card } from "antd"
import { Link, useHistory, useLocation } from "react-router-dom"
import { Section, Heading } from "components"
import scenery from "assets/images/scenery.png"

function Logout() {
	const { push } = useHistory()
	const { state = {} } = useLocation()

	if (!state.success) push("/404")

	return (
		<Section textAlign="center">
			<Row type="flex" justify="center" style={{ marginTop: "3em" }}>
				<Col lg={8}>
					<Card noHover padding="3em">
						<img src={scenery} alt="Logout" width="160" style={{ marginBottom: "2em" }} />
						<Heading
							content="Kamu udah keluar!"
							subheader="Oke, jangan lupa balik lagi ya, dan hamburkan duit belanja ibumu!"
						/>
						<Button type="primary" onClick={() => window.location.replace("/")}>
							<Icon type="home" /> &nbsp; Balik ke Home
						</Button>
					</Card>
				</Col>
			</Row>
		</Section>
	)
}

export default Logout
