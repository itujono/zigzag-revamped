import React, { useState } from "react"
import { Section, Heading, Card, Button, Modal } from "components"
import styled from "styled-components"
import { theme } from "styles"

const StyledCard = styled(Card)`
	&& {
		padding: 2em 3em;
		background-color: ${theme.greyColor[4]};
	}
`

export default function Summary() {
	const [confirmModal, setConfirmModal] = useState(false)

	return (
		<Section paddingHorizontal="0">
			<Modal visible={confirmModal} onCancel={() => setConfirmModal(false)}>
				<Heading
					content="Place order sekarang?"
					subheader="Apa kamu yakin mau place order sekarang? Action ini tidak bisa di-undo lagi."
				/>
				<Button icon="check">Ya, place order sekarang</Button>
			</Modal>
			<Heading
				content="Ringkasan pemesanan"
				subheader="Harap dibaca lagi semua detail dengan seksama"
				marginBottom="3em"
			/>
			<StyledCard noHover>
				<Heading
					content="Periksa sekali lagi 🧐"
					subheader="Setelah ini, kamu akan placing order. Sebelumnya, mohon pastikan sekali lagi melalui panel di samping bahwa semua detail orderan kamu sudah tepat."
					marginBottom="2em"
				/>
				<Button icon="check" onClick={() => setConfirmModal(true)}>
					Ya, semua nya sudah benar. Place order sekarang
				</Button>
			</StyledCard>
		</Section>
	)
}
