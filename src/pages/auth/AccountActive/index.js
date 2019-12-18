import React, { useEffect } from "react"
import { Row, Col, Card } from "antd"
import { Link, useLocation } from "react-router-dom"
import { Section, Success, Heading, ButtonLink } from "components"

function AccountActive() {
	const { search } = useLocation()
	const params = new URLSearchParams(search)

	const subheader = (
		<div>
			<p>Oke, akun kamu udah berhasil diaktifkan. Sekarang saatnya belanja belenjiii! Yeay!</p>
		</div>
	)

	if (!params.get("isActive") || params.get("isActive") === "false")
		return (
			<Section textAlign="center">
				<Row type="flex" justify="center" style={{ marginTop: "3em" }}>
					<Col lg={8}>
						<Card noHover padding="3em" style={{ marginBottom: "3em" }}>
							<Heading
								content="Oops! &nbsp; 😢😢"
								subheader="Sepertinya ada kesalahan. Silakan coba beberapa saat lagi"
							/>
						</Card>
						<Link to="/login">
							<ButtonLink icon="home">Coba login sekarang</ButtonLink>
						</Link>
					</Col>
				</Row>
			</Section>
		)

	return (
		<Section textAlign="center">
			<Row type="flex" justify="center" style={{ marginTop: "3em" }}>
				<Col lg={8}>
					<Card noHover padding="3em" style={{ marginBottom: "3em" }}>
						<Success />
						<Heading content="Akun udah aktif! &nbsp; 🎉🎉" subheader={subheader} />
					</Card>
					<Link to="/login">
						<ButtonLink icon="home">Coba login sekarang</ButtonLink>
					</Link>
				</Col>
			</Row>
		</Section>
	)
}

export default AccountActive
