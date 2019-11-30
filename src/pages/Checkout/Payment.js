import React from "react"
import { Section, Heading, Card } from "components"
import { Row, Col } from "antd"
import styled from "styled-components"
import mandiriLogo from "assets/images/mandiri-logo.png"
import bcaLogo from "assets/images/bca-logo.jpeg"
import { theme } from "styles"

const StyledCard = styled(Card)`
	&& {
		margin-bottom: 2em;
		box-shadow: ${theme.boxShadow.main};
		border: none;
		height: 200px;
		.ant-card-head {
			padding-left: 2em;
		}
		.ant-row-flex {
			> .ant-col {
				height: 150px;
				img {
					height: 100%;
					object-fit: contain;
				}
			}
		}
	}
`

export default function Payment() {
	return (
		<Section paddingHorizontal="0">
			<Heading content="Metode pembayaran" subheader="Pilih metode pembayaran yang paling nyaman untuk kamu" />
			<StyledCard noHover title="ATM / Transfer bank">
				<Row gutter={32}>
					<Col lg={6}>
						<img src={bcaLogo} alt="BCA" width="100%" />
					</Col>
					<Col lg={6}>
						<img src={mandiriLogo} alt="Mandiri" width="100%" />
					</Col>
					<Row>
						<Col lg={24}>
							<p>
								Kamu memilih untuk menggunakan transfer bank: Hanya bank-bank di atas yang saat ini kami
								supoort Nomor rekening akan diberitahukan di email dan di akhir proses order ini. Dapat
								pahala dan amal jariyah
							</p>
						</Col>
					</Row>
				</Row>
			</StyledCard>
		</Section>
	)
}
