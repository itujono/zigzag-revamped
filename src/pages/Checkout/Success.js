import React, { useEffect } from "react"
import { Row, Col, Typography } from "antd"
import styled from "styled-components/macro"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useHistory } from "react-router-dom"

import { Section, Card, Success, Heading, Alert, ButtonLink } from "components"
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

const { Paragraph: Par, Text } = Typography

function CheckoutSuccess() {
	const { state = {} } = useLocation()
	const { push } = useHistory()
	const dispatch = useDispatch()
	const bankAccounts = useSelector(({ other }) => other.bankAccounts)

	const withDeposit = state.paymentMethod && state.paymentMethod === "deposit"

	useEffect(() => {
		if (!state.isSuccess) push("/404")
		dispatch(fetchBankAccounts())
	}, [dispatch, push, state.isSuccess])

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
								type="warning"
								showIcon
								message="HARAP DIPERHATIKAN!"
								description={
									<Typography>
										Kalo kamu belum melakukan{" "}
										<Link to="/order/confirmation">konfirmasi pembayaran</Link> lebih dari{" "}
										<Text mark underline>
											2 jam
										</Text>
										, maka orderan kamu akan{" "}
										<Text mark underline>
											dibatalkan otomatis
										</Text>{" "}
										oleh sistem
									</Typography>
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

export default CheckoutSuccess
