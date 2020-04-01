import React, { useState } from "react"
import { Row, Col, Icon, Typography } from "antd"
import styled from "styled-components"
import { useHistory, Link } from "react-router-dom"
import { connect } from "react-redux"

import { upgradeAccount, fetchUser } from "store/actions/userActions"
import { Heading, Button, Modal, ButtonLink } from "components"
import scenery from "assets/images/scenery.png"
import { theme } from "styles"

const upgradeText = (
	<div className="benefits">
		<ul>
			<li>
				<Icon type="check-circle" theme="filled" style={{ color: theme.greenColor }} /> &nbsp; Dapat pahala dan
				amal jariyah
			</li>
			<li>
				<Icon type="check-circle" theme="filled" style={{ color: theme.greenColor }} /> &nbsp; Dapat potongan
				harga yang super gede
			</li>
			<li>
				<Icon type="check-circle" theme="filled" style={{ color: theme.greenColor }} /> &nbsp; Dapat pahala dan
				amal jariyah lagi
			</li>
		</ul>
	</div>
)

const StyledRow = styled(Row)`
	&.has-proposed {
		.ant-col {
			text-align: center;
			padding: 2em;
			.image {
				margin-bottom: 2em;
			}
		}
	}
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

function UpgradePropose({ upgradeAccount, user: { customer_upgrade = {} } }) {
	const [confirmationModal, setConfirmationModal] = useState(false)
	const { push } = useHistory()

	const hasProposed = customer_upgrade.id && customer_upgrade.id === 2

	const handlePropose = () => upgradeAccount(push)

	if (hasProposed) {
		return (
			<StyledRow type="flex" justify="center" className="has-proposed">
				<Col lg={16} xs={24}>
					<div className="image">
						<img src={scenery} alt="Benefit jadi VIP member" width="160" />
					</div>
					<Heading
						content="Kamu sudah mengajukan"
						subheader="Oke, kamu sudah mengajukan untuk jadi member VIP kami. That's good! :)"
						marginBottom="3em"
					/>
					<p>
						Sudah bayar? <Link to="/upgrade/confirmation">Konfirmasi upgrade sekarang</Link>
					</p>
				</Col>
			</StyledRow>
		)
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
					titleMargin={{ mb: "1em" }}
					subheader={
						<Typography>
							<Typography.Paragraph>
								Dengan menge-klik tombol di bawah ini, kamu setuju untuk propose menjadi member VIP di
								Zigzag Online Shop
							</Typography.Paragraph>
							<Typography.Text type="secondary">
								Note: akun VIP kamu akan di-reset menjadi Reguler jika kamu nggak bisa belanja minimal 4
								item/bulan. Reset dilakukan tiap tanggal awal bulan.
							</Typography.Text>
						</Typography>
					}
				/>
				<Button onClick={() => setConfirmationModal(true)}>Jadi member VIP sekarang</Button>
			</Col>
		</StyledRow>
	)
}

export default connect(({ user }) => ({ user: user.user }), { upgradeAccount, fetchUser })(UpgradePropose)
