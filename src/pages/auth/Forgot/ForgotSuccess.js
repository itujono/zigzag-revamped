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
							content="Cek email kamu"
							subheader="Oke, instruksi tentang gimana cara ngereset password akun kamu udah dikirim ke inbox email ya"
						/>
						<Alert
							message="Kalo di inbox nggak ada, jangan lupa cek di folder spam juga ya"
							type="info"
							showIcon
							banner
							closable
							style={{ textAlign: "left", marginBottom: "4em" }}
						/>
						<Link to="/login">
							<Button type="primary">
								<Icon type="home" /> &nbsp; Balik ke Login
							</Button>
						</Link>
					</Card>
				</Col>
			</Row>
		</Section>
	)
}

export default ForgotSuccess
