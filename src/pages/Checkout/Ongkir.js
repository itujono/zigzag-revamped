import React from "react"
import { Section, Heading, Card } from "components"
import { Row, Col } from "antd"
import styled from "styled-components"
import { theme } from "styles"
import jneLogo from "assets/images/jne-logo.svg"
import jntLogo from "assets/images/j&t-logo.jpeg"
import sicepatLogo from "assets/images/sicepat-logo.png"

const StyledCard = styled(Card)`
	&& {
		margin-bottom: 2em;
		box-shadow: ${theme.boxShadow.main};
		border: none;
		height: 200px;
		.ant-card-head {
			padding-left: 2em;
		}
		.ant-row {
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

export default function Ongkir() {
	return (
		<Section paddingHorizontal="0">
			<Heading content="Pilih kurir" subheader="Pilih kurir dan ongkir yang paling sesuai untuk kamu" />
			<StyledCard noHover>
				<Row gutter={16}>
					<Col lg={6}>
						<img src={jneLogo} alt="JNE logo" width="100%" />
					</Col>
				</Row>
			</StyledCard>
			<StyledCard noHover>
				<Row gutter={16}>
					<Col lg={6}>
						<img src={jntLogo} alt="J&T logo" width="100%" />
					</Col>
				</Row>
			</StyledCard>
			<StyledCard noHover>
				<Row gutter={16}>
					<Col lg={6}>
						<img src={sicepatLogo} alt="Sicepat logo" width="100%" />
					</Col>
				</Row>
			</StyledCard>
		</Section>
	)
}
