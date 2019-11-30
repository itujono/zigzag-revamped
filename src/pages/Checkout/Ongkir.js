import React from "react"
import { Section, Heading, Card, Button } from "components"
import { Row, Col, Badge, Icon } from "antd"
import styled from "styled-components"
import { theme } from "styles"
import { useHistory } from "react-router-dom"
import jneLogo from "assets/images/jne-logo.svg"
import jntLogo from "assets/images/j&t-logo.jpeg"
import sicepatLogo from "assets/images/sicepat-logo.png"
import { pricer } from "helpers"

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

const CourierCol = styled.div`
	padding: 2em 1.5em;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-color: ${({ isSelected }) => isSelected && theme.greyColor[4]};
	border: ${({ isSelected }) =>
		(isSelected && `2px solid ${theme.primaryColor}`) || `2px solid ${theme.greyColor[3]}`};
	cursor: pointer;
	&:hover {
		background-color: ${theme.greyColor[4]};
	}
	article.ant-typography {
		margin-bottom: 0;
		h4 {
			font-size: 1em;
			color: ${theme.primaryColor};
		}
	}
	p {
		font-weight: bold;
		color: ${theme.greyColor[1]};
		margin-bottom: 0;
	}
	.ant-badge {
		display: ${({ isSelected }) => (isSelected && "block") || "none"};
		position: absolute;
		top: 20px;
		right: 30px;
		svg {
			fill: ${theme.primaryColor};
		}
	}
`

export default function Ongkir({ data, handlers }) {
	const { push } = useHistory()

	const { couriers = [], selectedCourier } = data
	const { setSelectedCourier } = handlers

	const handleSelectCourier = courier => setSelectedCourier(courier)

	return (
		<Section paddingHorizontal="0">
			<Heading
				content="Pilih kurir"
				subheader="Pilih kurir dan ongkir yang paling sesuai untuk kamu"
				marginBottom="3em"
			/>
			{couriers.map(courier => {
				const { code, costs = [], name } = courier
				const courierLogo = code === "jne" ? jneLogo : code === "jnt" ? jntLogo : sicepatLogo

				return (
					<StyledCard noHover key={code}>
						<Row gutter={16} type="flex">
							<Col lg={6}>
								<img src={courierLogo} alt={name} width="100%" />
							</Col>
							{costs.map((item, idx) => {
								const { service, description, cost = [] } = item
								const isSelected =
									selectedCourier.code === code && selectedCourier.details.service === service

								return (
									<Col lg={6} key={service + idx}>
										<CourierCol
											onClick={() => handleSelectCourier({ code, details: item })}
											isSelected={isSelected}
										>
											<Badge count={<Icon type="check-circle" theme="filled" />} />
											<Heading
												content={service}
												subheader={
													<div>
														{description} <p>Rp {pricer(cost[0].value)}</p>
													</div>
												}
											/>
										</CourierCol>
									</Col>
								)
							})}
						</Row>
					</StyledCard>
				)
			})}
			<Section textAlign="right" paddingHorizontal="0">
				<Button onClick={() => push("/checkout/payment")}>
					Lanjut ke Pembayaran <Icon type="right" />
				</Button>
			</Section>
		</Section>
	)
}