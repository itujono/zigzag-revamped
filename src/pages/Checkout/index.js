import React, { useEffect, useState } from "react"
import { Section, Layout, Heading, ButtonLink } from "components"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { Row, Col, Divider, List, Avatar, Tooltip, Icon, Form, Collapse } from "antd"
import styled from "styled-components/macro"

import { fetchProvinces, fetchCities, fetchSubdistricts, fetchCouriers } from "store/actions/rajaOngkirActions"
import { setCartDrawerFromStore } from "store/actions/otherActions"
import Address from "./Address"
import Ongkir from "./Ongkir"
import Payment from "./Payment"
import Summary from "./Summary"
import { pricer } from "helpers"
import { cartItems } from "helpers/dummy"
import { Formik } from "formik"
import { TextInput } from "components/Fields"
import { SubmitButton } from "formik-antd"

const Sidebar = styled.div`
	padding: 2em;
	height: 100vh;
	overflow-y: auto;
	background-color: #f9f9f9;
`

const CartItem = styled(List.Item)`
	.ant-list-item-meta-avatar {
		margin-right: 24px;
		.product-photo {
			width: 60px;
			height: 80px;
		}
	}
	.ant-list-item-meta-title {
		.delete {
			cursor: pointer;
		}
	}
	.price-weight {
		font-weight: bold;
		span {
			font-weight: normal;
		}
	}
`

const dummyData = {
	origin: "48",
	destination: "574",
	weight: 5,
	courier: "jne",
	originType: "city",
	destinationType: "subdistrict"
}

function Checkout({ provinceOptions, cityOptions, subdistrictOptions, dataOnSidebar, ...props }) {
	const [formValues, setFormValues] = useState({})
	const [selectedCourier, setSelectedCourier] = useState({ code: "", details: {} })
	const [selectedPayment, setSelectedPayment] = useState({ value: "transfer", label: "ATM/Transfer bank" })

	const { fetchCities, fetchSubdistricts, couriers } = props
	const { province } = dataOnSidebar.provinceOnSidebar(formValues.province)
	const { city_name: city } = dataOnSidebar.cityOnSidebar(formValues.city)
	const { subdistrict_name: subdistrict } = dataOnSidebar.subdistrictOnSidebar(formValues.subdistrict)
	const courierDetails = (selectedCourier.details || {}).cost || []

	useEffect(() => {
		props.fetchProvinces()
		props.fetchCouriers(dummyData)
	}, [])

	return (
		<Layout sidebar page="checkout">
			<Section
				noPadding
				marginBottom="0"
				css={`
					&& {
						padding-left: 2em;
					}
				`}
			>
				<Row gutter={32} type="flex">
					<Col lg={16}>
						<Switch>
							<Redirect exact from="/checkout" to="/checkout/address" />
							<Route
								path="/checkout/address"
								render={() => (
									<Address
										data={{ provinceOptions, cityOptions, subdistrictOptions, formValues }}
										handlers={{ fetchCities, fetchSubdistricts, setFormValues }}
									/>
								)}
							/>
							<Route
								path="/checkout/ongkir"
								render={() => (
									<Ongkir
										data={{ couriers, formValues, selectedCourier }}
										handlers={{ setSelectedCourier }}
									/>
								)}
							/>
							<Route
								path="/checkout/payment"
								render={() => <Payment data={{ selectedPayment }} handlers={{ setSelectedPayment }} />}
							/>
							<Route path="/checkout/summary" component={Summary} />
						</Switch>
					</Col>
					<Col lg={8}>
						<Sidebar>
							<Heading
								content="Orderan kamu"
								subheader="Ringkasan orderan kamu ter-update di sini"
								marginBottom="3em"
							/>

							<Collapse bordered={false} defaultActiveKey={["shipping"]}>
								<Collapse.Panel key="cartItems" header="Cart kamu">
									<List
										itemLayout="horizontal"
										dataSource={cartItems}
										renderItem={item => (
											<CartItem>
												<List.Item.Meta
													avatar={
														<Avatar
															src={item.photo}
															shape="square"
															className="product-photo"
														/>
													}
													title={
														<p style={{ marginBottom: 0 }}>
															<a href="https://ant.design">{item.name}</a> &middot;{" "}
															<span>
																{item.quantity} x Rp {pricer(item.price)}/pcs
															</span>
														</p>
													}
													description={
														<Row>
															<Col lg={24}>
																<p className="price-weight">
																	Rp {pricer(item.quantity * item.price)} &middot;{" "}
																	<span>{item.weight * item.quantity} gram</span>
																</p>
																<ButtonLink
																	onClick={() => props.setCartDrawerFromStore(true)}
																>
																	Ubah
																</ButtonLink>
															</Col>
														</Row>
													}
												/>
											</CartItem>
										)}
									/>
								</Collapse.Panel>
								<Collapse.Panel key="shipping" header="Detail pengiriman">
									<Row gutter={16}>
										<Col lg={12}>
											<Heading reverse content="Nama" subheader={formValues.name || "-"} />
										</Col>
										<Col lg={12}>
											<Heading reverse content="Email" subheader={formValues.email || "-"} />
										</Col>
										<Col lg={12}>
											<Heading reverse content="Nomor HP" subheader={formValues.tele || "-"} />
										</Col>
									</Row>
									<Divider />
									<Row gutter={16}>
										<Col lg={12}>
											<Heading reverse content="Provinsi" subheader={province || "-"} />
										</Col>
										<Col lg={12}>
											<Heading reverse content="Kota" subheader={city || "-"} />
										</Col>
										<Col lg={12}>
											<Heading reverse content="Kabupaten" subheader={subdistrict || "-"} />
										</Col>
										<Col lg={12}>
											<Heading reverse content="Kode pos" subheader={formValues.zip || "-"} />
										</Col>
										<Col lg={24}>
											<Heading reverse content="Alamat" subheader={formValues.address || "-"} />
										</Col>
									</Row>
									<Divider />
									<Row gutter={16}>
										<Col lg={12}>
											<Heading
												reverse
												content="Nama dropshipper"
												subheader={formValues.dropshipper_name || "-"}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="Nomor HP dropshipper"
												subheader={formValues.dropshipper_tele || "-"}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="JNE Online Booking"
												subheader={formValues.jne_online_booking || "-"}
											/>
										</Col>
									</Row>
									<Divider />
									<Row gutter={16}>
										<Col lg={12}>
											<Heading
												reverse
												content="Kurir yang dipilih"
												subheader={
													`${selectedCourier.details.service || ""} (${selectedCourier.details
														.description || ""})` || "-"
												}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="Ongkir"
												subheader={
													`Rp ${pricer((courierDetails[0] || {}).value || "")}` || "Rp 0"
												}
											/>
										</Col>
									</Row>
									<Row gutter={16}>
										<Col lg={24}>
											<Heading
												reverse
												content="Metode pembayaran"
												subheader={selectedPayment.label || "-"}
											/>
										</Col>
									</Row>
								</Collapse.Panel>
							</Collapse>
						</Sidebar>
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

const mapState = ({ rajaOngkir }) => {
	const provinceOnSidebar = province => rajaOngkir.provinces.find(item => item.province_id === province) || {}
	const cityOnSidebar = city => rajaOngkir.cities.find(item => item.city_id === city) || {}
	const subdistrictOnSidebar = subdistrict =>
		rajaOngkir.subdistricts.find(item => item.subdistrict_id === subdistrict) || {}

	return {
		couriers: rajaOngkir.couriers,
		dataOnSidebar: { provinceOnSidebar, cityOnSidebar, subdistrictOnSidebar },
		cityOptions: rajaOngkir.cities.map(item => ({ value: item.city_id, label: item.city_name })),
		provinceOptions: rajaOngkir.provinces.map(item => ({ value: item.province_id, label: item.province })),
		subdistrictOptions: rajaOngkir.subdistricts.map(item => ({
			value: item.subdistrict_id,
			label: item.subdistrict_name
		}))
	}
}

const actions = { fetchCities, fetchProvinces, fetchSubdistricts, fetchCouriers, setCartDrawerFromStore }

// prettier-ignore
export default connect(mapState, actions)(Checkout)
