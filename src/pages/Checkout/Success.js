import React from "react"
import { Section, Card, Success, Heading } from "components"
import { Row, Col } from "antd"
import styled from "styled-components/macro"
import { theme } from "styles"

const StyledCard = styled(Card)`
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
					</Col>
					<Col lg={8} className="right">
						<Heading content="Rekening Zigzag" subheader={bankAccountText} />
					</Col>
				</Row>
			</StyledCard>
		</Section>
	)
}
