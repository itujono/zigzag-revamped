import React, { useEffect } from "react"
import { Row, Col } from "antd"
import { Success, Heading, Button, Alert } from "components"
import { useLocation, useHistory } from "react-router-dom"
import styled from "styled-components"

const StyledRow = styled(Row)`
	padding: 2em 3em;
	text-align: center;
`

export default function UpgradeSent() {
	const { state = {} } = useLocation()
	const { push } = useHistory()

	useEffect(() => {
		if (!state.isSuccess) push("/404")
	}, [])

	return (
		<StyledRow type="flex" justify="center">
			<Col lg={18}>
				<Success />
				<Heading
					content="Upgrade request berhasil"
					subheader="Great! Permintaan VIP member kamu telah kami terima, dan email berisi detail info dan
							instruksi selanjutnya juga sudah ada di inbox email kamu. Sampai jumpa lagi tahun depan! 🧚"
					marginBottom="2em"
				/>
				<Alert
					type="info"
					showIcon
					message={
						<span>
							Kalo email nya gak ada di inbox, jangan lupa <strong>cek folder spam</strong> nya juga ya.
						</span>
					}
				/>
				<Button icon="home">Kembali ke Home</Button>
			</Col>
		</StyledRow>
	)
}
