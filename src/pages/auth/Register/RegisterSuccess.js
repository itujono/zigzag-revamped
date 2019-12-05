import React, { useEffect } from "react"
import { Row, Col, Button, Icon, Alert, Card } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import { Section, Success, Heading, ButtonLink } from "components"

function RegisterSuccess() {
	const { state = {} } = useLocation()
	const { push } = useHistory()
	const { success, isVip } = state

	const subheader = (
		<div>
			<p>
				Kamu udah berhasil registrasi. Sekarang, silakan cek inbox email kamu dan verifikasi akun kamu supaya
				bisa mulai belanja.
			</p>
			{isVip && (
				<p>
					Namun, karena kamu milih untuk jadi member VIP Zigzag, kamu diwajibkan untuk membayar biaya
					pendaftaran VIP member sebesar <span className="primary">Rp 50.000,00</span> +{" "}
					<strong>sejumlah kode unik</strong> yg dapat kamu lihat di email yang baru saja kami kirim.
				</p>
			)}
		</div>
	)

	useEffect(() => {
		if (!success) push("/404")
	}, [])

	return (
		<Section textAlign="center">
			<Row type="flex" justify="center" style={{ marginTop: "3em" }}>
				<Col lg={8}>
					<Card noHover padding="3em" style={{ marginBottom: "3em" }}>
						<Success />
						<Heading content="Good job! 🎉🎉" subheader={subheader} />
						<Alert
							showIcon
							banner
							closable
							message="Kalo email nya gak ada di inbox, jangan lupa cek folder spam nya juga ya"
							type="info"
							style={{ textAlign: "left", marginBottom: "4em" }}
						/>
					</Card>
					<Link to="/login">
						<ButtonLink icon="home">Balik ke Login</ButtonLink>
					</Link>
				</Col>
			</Row>
		</Section>
	)
}

export default RegisterSuccess
