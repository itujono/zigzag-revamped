import React from "react"
import { Row, Col, Icon } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import { Section, Heading, Button, GifPlayer, Logo, Card } from "components"
import scenery from "assets/images/scenery.png"

function Logout() {
	const { push } = useHistory()
	const { state = {} } = useLocation()

	if (!state.success) push("/404")

	const isWashingHands = true

	return (
		<Section textAlign="center">
			<Row type="flex" justify="center" style={{ marginTop: "3em" }}>
				<Col lg={8} xs={24}>
					<Card noHover padding="3em">
						<Logo />
						{isWashingHands ? (
							<GifPlayer
								src="https://assets1.lottiefiles.com/packages/lf20_6R2HIH.json"
								width="100%"
								height="250"
							/>
						) : (
							<img src={scenery} alt="Logout" width="160" style={{ marginBottom: "2em" }} />
						)}
						<Heading
							content="Kamu udah keluar!"
							subheader={
								isWashingHands
									? "Oke, jangan lupa cuci tangan ya hari ini. Stay safe out there, guys!"
									: "Oke, jangan lupa balik lagi ya, dan hamburkan duit belanja ibumu!"
							}
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
