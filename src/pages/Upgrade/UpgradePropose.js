import React, { useState } from "react"
import { Row, Col, Icon } from "antd"
import { Heading, Button, Modal, ButtonLink } from "components"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import scenery from "assets/images/scenery.png"
import { theme } from "styles"

const upgradeText = (
	<div className="benefits">
		<ul>
			<li>
				<Icon type="check-circle" theme="filled" /> &nbsp; Dapat pahala dan amal jariyah
			</li>
			<li>
				<Icon type="check-circle" theme="filled" /> &nbsp; Dapat potongan harga yang super gede
			</li>
			<li>
				<Icon type="check-circle" theme="filled" /> &nbsp; Dapat pahala dan amal jariyah lagi
			</li>
		</ul>
	</div>
)

const StyledRow = styled(Row)`
	.left {
		padding: 2em 3em;
		background-color: ${theme.greyColor[4]};
		text-align: center;
		.image {
			margin-bottom: 2em;
		}
		.benefits {
			margin-top: 2em;
			li {
				margin-bottom: 1.5em;
				list-style-type: none;
			}
		}
	}
	.right {
		padding: 2em 3em;
		text-align: center;
	}
`

export default function UpgradePropose() {
	const [confirmationModal, setConfirmationModal] = useState(false)
	const { push } = useHistory()

	const handlePropose = () => {
		push({ pathname: "/upgrade/sent", state: { isSuccess: true } })
	}

	return (
		<StyledRow type="flex" align="middle">
			<Modal visible={confirmationModal} onCancel={() => setConfirmationModal(false)} footer={false}>
				<Heading
					content="Apa kamu yakin?"
					subheader="Apa kamu yakin mau jadi VIP member di Zigzag Online Shop?"
					marginBottom="2em"
				/>
				<Button onClick={handlePropose}>Ya, saya mau jadi VIP member</Button> &nbsp;{" "}
				<ButtonLink>Batal</ButtonLink>
			</Modal>
			<Col lg={12} className="left">
				<div className="image">
					<img src={scenery} alt="Benefit jadi VIP member" width="160" />
				</div>
				<Heading content="Apa keuntungan jadi VIP member?" subheader={upgradeText} />
			</Col>
			<Col lg={12} className="right">
				<Heading
					content="Upgrade jadi VIP sekarang"
					subheader="Dengan menge-klik tombol di bawah ini, kamu setuju untuk propose menjadi member VIP di Zigzag Online Shop"
				/>
				<Button onClick={() => setConfirmationModal(true)}>Jadi member VIP sekarang</Button>
			</Col>
		</StyledRow>
	)
}
