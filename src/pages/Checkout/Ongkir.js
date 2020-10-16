import React, { useEffect, useCallback, useState } from "react"
import { Section, Heading, Card, Button, Loading, Alert, Empty, Modal } from "components"
import { Row, Col, Badge, Icon, Form, Typography, message } from "antd"
import styled from "styled-components"
import { theme } from "styles"
import { useHistory, useLocation } from "react-router-dom"
import { pricer, mobile, media } from "helpers"
import { ORIGIN } from "helpers/constants"
import { useDispatch } from "react-redux"
import { Formik } from "formik"
import { TextInput, SelectInput } from "components/Fields"

const StyledCard = styled(Card)`
	&& {
		margin-bottom: 2em;
		box-shadow: ${theme.boxShadow.main};
		border: none;
		height: auto;
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

		${media.mobile`
			&& {
				margin-bottom: 4em;
				.scrolling-courier {
					padding-top: 1em;
					flex-wrap: nowrap;
					overflow-x: scroll;
					width: auto;
					-webkit-overflow-scrolling: touch;
					&::-webkit-scrollbar {
						display: none;
					}
					> .ant-col {
						height: auto;
						max-height: 240px;
					}
				}
			}
		`}
	}
`

const CourierCol = styled.div`
	padding: 2em 1.5em;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	user-select: ${({ disabled }) => disabled && "none"};
	cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
	background-color: ${({ isSelected }) => isSelected && theme.greyColor[4]};
	border: ${({ isSelected }) =>
		(isSelected && `2px solid ${theme.primaryColor}`) || `2px solid ${theme.greyColor[3]}`};
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

	${media.mobile`
		padding: 1em;
	`}
`

const CourierLogo = styled.span`
	position: absolute;
	top: -30px;
	left: 30px;
	z-index: 11;
`

const { Paragraph: Par } = Typography

export default function Ongkir({ data, handlers, loading }) {
	const { push } = useHistory()
	const dispatch = useDispatch()
	const { state = {} } = useLocation()
	const [shopeeInfo, setShopeeInfo] = useState({ online_booking: "", expedition: "" })
	const [tokpedInfo, setTokpedInfo] = useState({ online_booking: "", expedition: "" })
	const [understandShopee, setUnderstandShopee] = useState(false)
	const [understandTokped, setUnderstandTokped] = useState(false)

	const formData = JSON.parse(localStorage.getItem("formData")) || {}

	const { couriers = [], selectedCourier } = data
	const { setSelectedCourier, fetchCouriers, saveCourierDetails } = handlers
	const { cartTotal = {}, subdistrict = {}, city = {} } = formData

	const isSurabaya = Number(city.value) === Number(ORIGIN.cityId)
	const courierOptions = couriers
		.filter((item) => item.code !== "shopeecashless" && item.code !== "gosend" && item.code !== "tokopedia")
		.map((item) => ({ value: item.name, label: item.name }))

	const courierNotSelectedYet = Object.values(selectedCourier).some(
		(item) => item === "" || Object.keys(item).length === 0
	)

	const shopeeCodeNotFilledYet =
		selectedCourier.code === "shopeecashless" && (!shopeeInfo.online_booking || !shopeeInfo.expedition)
	const tokpedNotFilledYet =
		selectedCourier.code === "tokopedia" && (!tokpedInfo.online_booking || !tokpedInfo.expedition)

	const handleSelectCourier = (courier) => {
		if (courier.code !== "shopeecashless") setUnderstandShopee(false)
		if (courier.code !== "tokopedia") setUnderstandTokped(false)
		if (courier.code === "gosend" && !isSurabaya) {
			return message.error("Kalo bukan tujuan Surabaya, kamu tidak bisa pilih GoSend")
		}
		setSelectedCourier(courier)
	}

	const handleFetchCouriers = useCallback(() => {
		const data = {
			origin: ORIGIN.cityId,
			destination: subdistrict.value,

			weight: cartTotal.roundedWeight,
			destinationType: subdistrict.value ? "subdistrict" : "city",
			originType: "city",
			courier: "jne:pos:tiki:rpx:pcp:sicepat:jnt:sap:jet:ncs:star:ninja:lion:idl"
		}

		dispatch(fetchCouriers(data))
	}, [subdistrict.value, cartTotal.roundedWeight, dispatch, fetchCouriers])

	const handleSaveCourier = () => {
		const withOnlineBooking = {
			shopeecashless: { text: "Shopee Cashless", infoKey: shopeeInfo },
			tokopedia: { text: "Tokopedia", infoKey: tokpedInfo }
		}
		const { code, details = {} } = selectedCourier
		const remarkData = `${details.service} - ${details.description}`
		const expedition_remark =
			code === "shopeecashless" || code === "tokopedia"
				? `${remarkData}; Online booking: ${withOnlineBooking?.[code]?.infoKey.online_booking}; Ekspedisi: ${withOnlineBooking?.[code]?.infoKey.expedition}`
				: remarkData
		const order_detail = {
			expedition_remark,
			expedition_code: code,
			expedition_company: code === "jne" ? "JNE" : code === "sicepat" ? "SiCepat" : code,
			expedition_total: details.cost?.[0].value,
			origin: ORIGIN.cityId,
			originType: "city",
			destination: subdistrict.value,
			destinationType: subdistrict.value ? "subdistrict" : "city",
			weight: cartTotal.roundedWeight
		}
		if (code === "shopeecashless" || code === "tokopedia") {
			return Modal.confirm({
				centered: true,
				title: `Kamu pilih ${withOnlineBooking?.[code]?.text}`,
				content: `Karena Tokopedia/Shopee Cashless hanya untuk dropshipper Tokopedia/Shopee yang memiliki Online Booking, apa kamu sudah yakin dengan Online Booking nya? Kalo Online Booking yang kamu input tidak valid, kami berhak membatalkan orderan kamu`,
				okText: "Yakin",
				cancelText: "Batal deh",
				onOk: () => dispatch(saveCourierDetails(order_detail, formData, push))
			})
		}
		dispatch(saveCourierDetails(order_detail, formData, push))
	}

	useEffect(() => {
		if (!formData.address || !state.granted) push("/404")

		handleFetchCouriers()
	}, [formData.address, handleFetchCouriers, push, dispatch, state.granted])

	return (
		<Section paddingHorizontal="0">
			<Heading content="Pilih kurir" subheader="Pilih kurir dan ongkir yang paling sesuai untuk kamu" />
			<Alert
				icon={
					<span role="img" aria-label="Airplane">
						✈️
					</span>
				}
				showIcon
				type="info"
				className="mb4em"
				message={` Semua kiriman dikirim dari ${ORIGIN.city}, ${ORIGIN.province}`}
			/>

			{loading && <Loading />}

			{couriers.length === 0 && <Empty />}

			{couriers.map((courier) => {
				const { code, costs = [], name, picture } = courier

				return (
					<StyledCard noHover key={code}>
						<Row gutter={16} type="flex" className="scrolling-courier">
							{mobile && (
								<CourierLogo>
									<img src={picture} alt={name} width="60" />
								</CourierLogo>
							)}
							{!mobile && (
								<Col lg={6}>
									<img src={picture} alt={name} width="100%" />
								</Col>
							)}
							{costs.map((item, idx) => {
								const { service, description, cost = [] } = item
								const isSelected =
									selectedCourier.code === code && selectedCourier.details.service === service

								return (
									<>
										<Col lg={6} xs={10} key={service + idx}>
											<CourierCol
												onClick={() => handleSelectCourier({ code, details: item })}
												isSelected={isSelected}
												disabled={code === "gosend" && !isSurabaya}
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
										{selectedCourier.code === "shopeecashless" && code === "shopeecashless" && (
											<Col lg={12} xs={16}>
												{understandShopee ? (
													<Formik initialValues={{ online_booking: "" }}>
														{() => (
															<Form layout="vertical">
																<TextInput
																	name="online_booking"
																	label="Nomor online booking"
																	placeholder="Nomor online booking"
																	onChange={({ target }) =>
																		setShopeeInfo((prev) => ({
																			...prev,
																			online_booking: target.value
																		}))
																	}
																/>
																<SelectInput
																	name="expedition"
																	options={courierOptions}
																	label="Ekspedisi yg dipilih"
																	placeholder="Ekspedisi yg dipilih"
																	onChange={(value) =>
																		setShopeeInfo((prev) => ({
																			...prev,
																			expedition: value
																		}))
																	}
																/>
															</Form>
														)}
													</Formik>
												) : (
													<Alert
														showIcon={!mobile}
														className="mb0__mobile h-100"
														type="warning"
														message="Ini kurir khusus"
														description={
															<div>
																<Par>
																	Shopeecashless hanya digunakan untuk dropshipper
																	Shopee
																</Par>
																<Button
																	size="small"
																	onClick={() => setUnderstandShopee(true)}
																>
																	Ya, saya mengerti
																</Button>
															</div>
														}
													/>
												)}
											</Col>
										)}
										{selectedCourier.code === "tokopedia" && code === "tokopedia" && (
											<Col lg={12} xs={16}>
												{understandTokped ? (
													<Formik initialValues={{ online_booking: "" }}>
														{() => (
															<Form layout="vertical">
																<TextInput
																	name="online_booking"
																	label="Nomor online booking"
																	placeholder="Nomor online booking"
																	onChange={({ target }) =>
																		setTokpedInfo((prev) => ({
																			...prev,
																			online_booking: target.value
																		}))
																	}
																/>
																<SelectInput
																	name="expedition"
																	options={courierOptions}
																	label="Ekspedisi yg dipilih"
																	placeholder="Ekspedisi yg dipilih"
																	onChange={(value) =>
																		setTokpedInfo((prev) => ({
																			...prev,
																			expedition: value
																		}))
																	}
																/>
															</Form>
														)}
													</Formik>
												) : (
													<Alert
														showIcon={!mobile}
														className="mb0__mobile h-100"
														type="warning"
														message="Ini kurir khusus"
														description={
															<div>
																<Par>
																	Tokopedia hanya digunakan untuk dropshipper
																	Tokopedia
																</Par>
																<Button
																	size="small"
																	onClick={() => setUnderstandTokped(true)}
																>
																	Ya, saya mengerti
																</Button>
															</div>
														}
													/>
												)}
											</Col>
										)}
									</>
								)
							})}
						</Row>
					</StyledCard>
				)
			})}

			<Section textAlign="right" paddingHorizontal="0">
				<Button
					onClick={handleSaveCourier}
					disabled={courierNotSelectedYet || shopeeCodeNotFilledYet || tokpedNotFilledYet}
				>
					Lanjut ke Pembayaran <Icon type="right" />
				</Button>
			</Section>
		</Section>
	)
}
