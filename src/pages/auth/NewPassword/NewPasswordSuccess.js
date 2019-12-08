import React, { useEffect } from "react"
import { Row, Col, Button, Icon, Alert, Card } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import { Section, Success, Heading } from "components"

function NewPasswordSuccess() {
	const { state = {} } = useLocation()
	const { push } = useHistory()

	if (!state.success || state.success === false) push("/404")

	return (
		<Section textAlign="center">
			<Row type="flex" justify="center" style={{ marginTop: "3em" }}>
				<Col lg={8}>
					<Card noHover padding="3em">
						<Success />
						<Heading
							content="Berhasil!"
							subheader="Mantap! Password kamu sudah berhasil terganti. Silakan langsung coba login lagi"
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

export default NewPasswordSuccess
