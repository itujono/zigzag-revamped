import React, { useEffect, useCallback } from "react"
import { Section, Heading, Card, Button, Loading } from "components"
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

export default function Ongkir({ data, handlers, loading }) {
	const { push } = useHistory()

	const formData = JSON.parse(localStorage.getItem("formData")) || {}

	const { couriers = [], selectedCourier } = data
	const { setSelectedCourier, fetchCouriers, saveCourierDetails } = handlers
	const { cartTotal = {}, subdistrict } = formData

	const handleSelectCourier = courier => setSelectedCourier(courier)
	const handleFetchCouriers = useCallback(() => {
		const data = {
			origin: "48",
			destination: subdistrict,
			weight: cartTotal.roundedWeight,
			destinationType: subdistrict ? "subdistrict" : "city",
			originType: "city",
			courier: "jne:jnt:sicepat"
		}

		fetchCouriers(data)
	}, [cartTotal.roundedWeight, subdistrict, fetchCouriers])

	const handleSaveCourier = () => {
		const order_detail = {
			expedition_code: selectedCourier.code,
			expedition_company:
				selectedCourier.code === "jne"
					? "JNE"
					: selectedCourier.code === "sicepat"
					? "SiCepat"
					: selectedCourier.code,
			expedition_remark: `${selectedCourier.details.service} - ${selectedCourier.details.description}`,
			expedition_total: selectedCourier.details.cost[0].value
		}
		saveCourierDetails(order_detail, formData, push)
	}

	useEffect(() => {
		if (!formData.address) push("/404")

		handleFetchCouriers()
	}, [formData.address, handleFetchCouriers, push])

	return (
		<Section paddingHorizontal="0">
			<Heading
				content="Pilih kurir"
				subheader="Pilih kurir dan ongkir yang paling sesuai untuk kamu"
				marginBottom="3em"
			/>
			{loading && <Loading />}
			{couriers.map(courier => {
				const { code, costs = [], name } = courier
				const courierLogo =
					code === "jne" ? jneLogo : code === "J&T" ? jntLogo : code === "sicepat" ? sicepatLogo : ""

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
				<Button
					onClick={handleSaveCourier}
					disabled={Object.values(selectedCourier).some(
						item => item === "" || Object.keys(item).length === 0
					)}
				>
					Lanjut ke Pembayaran <Icon type="right" />
				</Button>
			</Section>
		</Section>
	)
}
