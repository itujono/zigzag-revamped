import React, { useState } from "react"
import { Section, Heading, Card, Button, Modal } from "components"
import styled from "styled-components"
import { Row, Col, Tooltip, Icon } from "antd"
import { useHistory } from "react-router-dom"

import { theme } from "styles"
import { pricer } from "helpers"

const StyledCard = styled(Card)`
	&& {
		padding: 2em 3em;
		background-color: ${theme.greyColor[4]};
	}
`

const StyledRow = styled(Row).attrs({
	type: "flex",
	justify: "space-between",
	align: "middle"
})`
	.right {
		text-align: right;
	}
`

export default function Summary({ handlers: { saveOrder } }) {
	const { push } = useHistory()
	const [confirmModal, setConfirmModal] = useState(false)

	const formData = JSON.parse(localStorage.getItem("formData")) || {}
	const { cartTotal = {}, order_detail = {} } = formData
	const generalTotal =
		Number(order_detail.ekspedition_total) +
		Number(cartTotal.price) +
		Number(formData.unique_code || 0) -
		Number(formData.discount || 0)

	console.log({ generalTotal })

	const handleSaveOrder = () => {}

	return (
		<Section paddingHorizontal="0">
			<Modal visible={confirmModal} onCancel={() => setConfirmModal(false)}>
				<Heading
					content="Place order sekarang?"
					subheader="Apa kamu yakin mau place order sekarang? Action ini tidak bisa di-undo lagi."
				/>
				<Button icon="check" onClick={() => push("/order/order_success")}>
					Ya, place order sekarang
				</Button>
			</Modal>

			<Heading
				content="Ringkasan pemesanan"
				subheader="Harap dibaca lagi semua detail dengan seksama"
				marginBottom="3em"
			/>

			<StyledCard noHover>
				<Heading
					content="Periksa sekali lagi 🧐"
					subheader="Setelah ini, kamu akan placing order. Sebelumnya, mohon pastikan sekali lagi melalui panel di samping (dan detail total di bawah ini) bahwa semua detail orderan kamu sudah tepat."
					marginBottom="2em"
				/>
				<Section paddingHorizontal="0">
					<StyledRow>
						<Col lg={12}>
							<Heading reverse content="Diskon" subheader="Jika ada diskon, akan muncul di sini" />
						</Col>
						<Col lg={8} className="right">
							<Heading content={`Rp ${pricer(formData.discount || 0)}`} />
						</Col>
					</StyledRow>
					<StyledRow>
						<Col lg={12}>
							<Heading reverse content="Ongkos kirim" subheader="Ongkos kirim untuk orderan ini" />
						</Col>
						<Col lg={8} className="right">
							<Heading content={`Rp ${pricer(order_detail.ekspedition_total)}`} />
						</Col>
					</StyledRow>
					<StyledRow>
						<Col lg={12}>
							<Heading
								reverse
								content="Kode unik transfer"
								subheader="Jangan lupakan kode unik ini ketika transfer"
							/>
						</Col>
						<Col lg={8} className="right">
							<Heading content={formData.unique_code} />
						</Col>
					</StyledRow>
					<StyledRow gutter={32}>
						<Col lg={16}>
							<Heading reverse content="Grand total" subheader="Total yang harus dibayar sekarang" />
						</Col>
						<Col lg={8} className="right">
							<Heading
								content={`Rp ${pricer(generalTotal || 0)}`}
								subheader={`${cartTotal.weight} gram`}
								className="price"
							/>
						</Col>
					</StyledRow>
				</Section>
				<Button icon="check" onClick={() => setConfirmModal(true)}>
					Ya, semua nya sudah benar. Place order sekarang
				</Button>
			</StyledCard>
		</Section>
	)
}
