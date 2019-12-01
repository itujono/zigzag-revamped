import React from "react"
import { Section, Card, Success, Heading, Alert, ButtonLink } from "components"
import { Row, Col } from "antd"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { theme } from "styles"

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
`

const bankAccountText = (
	<ul>
		<li>
			<Heading reverse content="Bank Mandiri" subheader={<div>109.000.243.2432 an Zigzag Online Shop</div>} />
		</li>
		<li>
			<Heading reverse content="Bank BCA" subheader={<div>109.000.243.2432 an Zigzag Online Shop</div>} />
		</li>
		<li>
			<Heading reverse content="Bank CIMB Niaga" subheader={<div>109.000.243.2432 an Zigzag Online Shop</div>} />
		</li>
	</ul>
)

export default function CheckoutSuccess() {
	return (
		<Section centered width="75%" textAlign="center">
			<StyledCard noHover>
				<Row type="flex">
					<Col lg={16} className="left">
						<Success />
						<Heading
							content="Order berhasil! 🎉🎉"
							subheader="Mantap! Orderan kamu sudah kami terima, dan email berisi detail info orderan juga
							sudah ada di inbox email kamu. Namun sebelumnya, silakan lakukan pembayaran
							terlebih dahulu ke rekening yang tertulis di samping."
						/>
						<Alert
							type="info"
							showIcon
							message={
								<span>
									Kalo kamu belum melakukan konfirmasi order lebih dari 2 jam, maka orderan kamu akan{" "}
									<strong>dibatalkan otomatis</strong> oleh sistem
								</span>
							}
						/>
						<Section textAlign="center">
							Sudah melakukan pembayaran? <Link to="/order/confirmation">Konfirmasi pembayaran</Link>
						</Section>
					</Col>
					<Col lg={8} className="right">
						<Heading content="Rekening Zigzag" subheader={bankAccountText} />
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
