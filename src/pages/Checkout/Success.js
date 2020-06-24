import React, { useEffect } from "react"
import { Section, Card, Success, Heading, Alert, ButtonLink } from "components"
import { Row, Col } from "antd"
import styled from "styled-components/macro"
import { connect } from "react-redux"
import { Link, useLocation, useHistory } from "react-router-dom"

import { fetchBankAccounts } from "store/actions/otherActions"
import { theme } from "styles"
import { mobile, media } from "helpers"

const StyledCard = styled(Card)`
	&& {
		margin-bottom: 3em;
		.ant-card-body {
			padding: 0;
			.left {
				padding: 2em 3em;
			}
			.right {
				padding: 2em 3em;
				text-align: left;
				background-color: ${theme.greyColor[4]};
			}
		}
	}

	${media.mobile`
		&& {
			.ant-card-body {
				padding: 0;
				.left {
					padding: 2em;
				}
				.right {
					padding: 2em;
					text-align: left;
					background-color: ${theme.greyColor[4]};
				}
			}
		}
	`}
`

const bankAccountText = (bankAccounts) => (
	<ul className="mt2em pl0">
		{bankAccounts.map((item) => (
			<li key={item.id}>
				<Heading
					reverse
					content={item.bank_name}
					subheader={<div>{`${item.bank_account} an ${item.under_name}`}</div>}
				/>
			</li>
		))}
	</ul>
)

function CheckoutSuccess({ bankAccounts, fetchBankAccounts }) {
	const { state = {} } = useLocation()
	const { push } = useHistory()

	const withDeposit = state.paymentMethod && state.paymentMethod === "deposit"

	useEffect(() => {
		if (!state.isSuccess) push("/404")
		fetchBankAccounts()
	}, [fetchBankAccounts, push, state.isSuccess])

	return (
		<Section centered width={mobile ? "100%" : "75%"} textAlign="center">
			<StyledCard noHover>
				<Row type="flex">
					<Col lg={16} className="left">
						<Success />
						{withDeposit ? (
							<Heading
								content="Order berhasil! 🎉🎉"
								subheader={`Mantap! Orderan kamu sudah kami terima, dan pembayaran kamu juga sudah diterima. Email berisi detail info orderan juga sudah ada di inbox email kamu. Tidak ada yg perlu dilakukan, cukup duduk manis saja menunggu kabar selanjutnya dari kami.`}
							/>
						) : (
							<Heading
								content="Order berhasil! 🎉🎉"
								subheader={`Mantap! Orderan kamu sudah kami terima, dan email berisi detail info orderan juga sudah ada di inbox email kamu. Namun sebelumnya, silakan lakukan pembayaran terlebih dahulu ke rekening yang tertulis di ${
									mobile ? "bawah" : "samping"
								}`}
							/>
						)}
						{!withDeposit && (
							<Alert
								type="info"
								showIcon
								message={
									<span>
										Kalo kamu belum melakukan{" "}
										<Link to="/order/confirmation">konfirmasi pembayaran</Link> lebih dari 2 jam,
										maka orderan kamu akan <strong>dibatalkan otomatis</strong> oleh sistem
									</span>
								}
							/>
						)}
						{!withDeposit && (
							<Section textAlign="center">
								Sudah melakukan pembayaran? <Link to="/order/confirmation">Konfirmasi pembayaran</Link>
							</Section>
						)}
					</Col>
					<Col lg={8} xs={24} className="right">
						<Heading content="Rekening Zigzag" subheader="Jika kamu memilih metode pembayaran transfer" />
						{bankAccountText(bankAccounts)}
					</Col>
				</Row>
			</StyledCard>
			<Section centered textAlign="center">
				<Link to="/">
					<ButtonLink icon="home">Kembali ke Home</ButtonLink>
				</Link>
			</Section>
		</Section>
	)
}

const mapState = ({ other }) => ({
	bankAccounts: other.bankAccounts
})

export default connect(mapState, { fetchBankAccounts })(CheckoutSuccess)
