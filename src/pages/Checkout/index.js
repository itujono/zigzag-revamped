import React, { useEffect, useState, useCallback } from "react"
import { Section, Layout, Heading, ButtonLink, Empty, Button, Loading } from "components"
import { Switch, Route, Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Row, Col, Divider, List, Avatar, Collapse } from "antd"
import styled from "styled-components/macro"

import { fetchProvinces, fetchCities, fetchSubdistricts, fetchCouriers } from "store/actions/rajaOngkirActions"
import { setCartDrawerFromStore, saveCourierDetails, saveOrder } from "store/actions/otherActions"
import { fetchUser } from "store/actions/userActions"
import { fetchCartItems } from "store/actions/productActions"
import Address from "./Address"
import Ongkir from "./Ongkir"
import Payment from "./Payment"
import Summary from "./Summary"
import { pricer } from "helpers"

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

function Checkout({
	provinceOptions,
	cityOptions,
	subdistrictOptions,
	dataOnSidebar,
	user,
	loading,
	cartItems,
	cartTotal,
	courierDetails,
	couriers,
	...props
}) {
	const [formValues, setFormValues] = useState({})
	const [initialLoading, setInitialLoading] = useState(true)
	const [selectedCourier, setSelectedCourier] = useState({ code: "", details: {} })
	const [selectedPayment, setSelectedPayment] = useState({ value: "transfer", label: "ATM/Transfer bank" })
	const [selectedProvince, setSelectedProvince] = useState({})
	const [selectedCity, setSelectedCity] = useState({})
	const [selectedSubdistrict, setSelectedSubdistrict] = useState({})
	// prettier-ignore
	const { fetchCities, fetchSubdistricts, saveCourierDetails, saveOrder, fetchProvinces, fetchCartItems, fetchUser } = props

	const formData = JSON.parse(localStorage.getItem("formData")) || {}

	const { province } = dataOnSidebar.provinceOnSidebar(formValues.province)
	const { city_name: city } = dataOnSidebar.cityOnSidebar(formValues.city)
	const { subdistrict_name: subdistrict } = dataOnSidebar.subdistrictOnSidebar(formValues.subdistrict)
	const courierData = (selectedCourier.details || {}).cost || []
	const courierOnSidebar = formData.order_detail
		? `${formData.order_detail.ekspedition_company || ""} (${formData.order_detail.ekspedition_remark || ""})`
		: Object.keys(selectedCourier).length === 0
		? "-"
		: `${selectedCourier.details.service || ""} (${selectedCourier.details.description || ""})`

	const renderFormValues = prop => {
		const values = Object.keys(formValues).length === 0 ? formData : formValues
		if (prop === "province" || prop === "city" || prop === "subdistrict") return values[`${prop}_name`]
		return values[prop] === "" ? "-" : values[prop] ? values[prop] : user[prop]
	}

	useEffect(() => {
		const handleUpdateCartTotal = () => {
			localStorage.setItem("formData", JSON.stringify({ ...formData, cartTotal }))
		}
		fetchProvinces()
		fetchCartItems().then(() => handleUpdateCartTotal())
		fetchUser().then(() => setInitialLoading(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		fetchProvinces,
		fetchCartItems,
		fetchUser,
		fetchCities,
		fetchSubdistricts,
		cartTotal.price,
		cartTotal.qty,
		cartTotal.weight,
		cartTotal.roundedWeight
	])

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
					<Col lg={16} xs={24}>
						<Switch>
							<Redirect exact from="/checkout" to="/checkout/address" />
							<Route
								path="/checkout/address"
								render={() => (
									<Address
										loading={loading}
										initialLoading={initialLoading}
										data={{
											provinceOptions,
											cityOptions,
											subdistrictOptions,
											formValues,
											user,
											cartTotal,
											cartItems,
											selectedCity,
											selectedProvince,
											selectedSubdistrict
										}}
										handlers={{
											fetchCities,
											fetchSubdistricts,
											setFormValues,
											setSelectedCity,
											setSelectedProvince,
											setSelectedSubdistrict
										}}
									/>
								)}
							/>
							<Route
								path="/checkout/ongkir"
								render={() => (
									<Ongkir
										loading={loading}
										data={{ couriers, formValues, selectedCourier, cartTotal, courierDetails }}
										handlers={{
											setSelectedCourier,
											fetchCouriers: props.fetchCouriers,
											saveCourierDetails
										}}
									/>
								)}
							/>
							<Route
								path="/checkout/payment"
								render={() => (
									<Payment
										data={{ selectedPayment, user, cartTotal }}
										handlers={{ setSelectedPayment }}
									/>
								)}
							/>
							<Route path="/checkout/summary" render={() => <Summary handlers={{ saveOrder }} />} />
						</Switch>
					</Col>

					<Col lg={8} xs={24}>
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
										locale={{
											emptyText: (
												<Empty
													isEmptyItems
													description="Masih belum ada apa-apa di cart kamu nih"
												/>
											)
										}}
										renderItem={({ product_data, product_total_price, ...item }) => {
											const quantity = Number(item.product_qty)
											const price = (item.product_price || {}).price
											const photo = (product_data.product_image || [])[0] || {}
											const name = item.product_name || "-"

											return (
												<CartItem>
													<List.Item.Meta
														avatar={
															<Avatar
																src={photo.picture}
																shape="square"
																className="product-photo"
															/>
														}
														title={
															<p style={{ marginBottom: 0 }}>
																<a href="https://ant.design">{name}</a> &middot;{" "}
																<span>
																	{quantity} x Rp {pricer(price)}/pcs
																</span>
															</p>
														}
														description={
															<Row>
																<Col lg={24}>
																	<p className="price-weight">
																		Rp {pricer(quantity * price)} &middot;{" "}
																		<span>
																			{item.weight_per_pcs * quantity} gram
																		</span>
																	</p>
																	<ButtonLink
																		onClick={() =>
																			props.setCartDrawerFromStore(true)
																		}
																	>
																		Ubah
																	</ButtonLink>
																</Col>
															</Row>
														}
													/>
												</CartItem>
											)
										}}
									/>
								</Collapse.Panel>

								<Collapse.Panel key="shipping" header="Detail pengiriman">
									<Row gutter={16}>
										<Col lg={12}>
											<Heading reverse content="Nama" subheader={renderFormValues("name")} />
										</Col>
										<Col lg={12}>
											<Heading reverse content="Email" subheader={renderFormValues("email")} />
										</Col>
										<Col lg={12}>
											<Heading reverse content="Nomor HP" subheader={renderFormValues("tele")} />
										</Col>
									</Row>
									<Divider />
									<Row gutter={16}>
										<Col lg={12}>
											<Heading
												reverse
												content="Provinsi"
												subheader={province || formData.province_name || user.province_name}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="Kota/Kabupaten"
												subheader={city || formData.city_name || user.city_name}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="Kecamatan"
												subheader={
													subdistrict || formData.subdistrict_name || user.subdistrict_name
												}
											/>
										</Col>
										<Col lg={12}>
											<Heading reverse content="Kode pos" subheader={renderFormValues("zip")} />
										</Col>
										<Col lg={24}>
											<Heading reverse content="Alamat" subheader={renderFormValues("address")} />
										</Col>
									</Row>
									<Divider />

									<Row gutter={16}>
										<Col lg={12}>
											<Heading
												reverse
												content="Kurir yang dipilih"
												subheader={courierOnSidebar}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="Ongkir"
												subheader={`Rp ${pricer((courierData[0] || {}).value || "")}` || "Rp 0"}
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

									<Divider />

									<Row gutter={16}>
										<Col lg={12}>
											<Heading
												reverse
												content="Nama dropshipper"
												subheader={renderFormValues("dropshipper_name")}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="Nomor HP dropshipper"
												subheader={renderFormValues("dropshipper_tele")}
											/>
										</Col>
									</Row>
									<Row gutter={16}>
										<Col lg={12}>
											<Heading
												reverse
												content="JNE Online Booking"
												subheader={renderFormValues("jne_online_booking")}
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

const mapState = ({ rajaOngkir, user, product, other }) => {
	const provinceOnSidebar = province => rajaOngkir.provinces.find(item => item.province_id === province) || {}
	const cityOnSidebar = city => rajaOngkir.cities.find(item => item.city_id === city) || {}
	const subdistrictOnSidebar = subdistrict => {
		return rajaOngkir.subdistricts.find(item => item.subdistrict_id === subdistrict) || {}
	}
	const userDetails = {
		name: user.user.name,
		email: user.user.email,
		tele: user.user.tele,
		province: user.user.province,
		province_name: user.user.province_name,
		city: user.user.city,
		city_name: user.user.city_name,
		subdistrict: user.user.subdistrict,
		subdistrict_name: user.user.subdistrict_name,
		zip: user.user.zip,
		address: user.user.address,
		deposit: user.user.deposit
	}

	return {
		user: userDetails,
		couriers: rajaOngkir.couriers,
		courierDetails: other.courierDetails,
		cartItems: product.cartItems,
		cartTotal: product.cartTotal,
		loading: rajaOngkir.loading || user.loading,
		dataOnSidebar: { provinceOnSidebar, cityOnSidebar, subdistrictOnSidebar },
		cityOptions: rajaOngkir.cities.map(item => ({ value: item.city_id, label: item.city_name })),
		provinceOptions: rajaOngkir.provinces.map(item => ({ value: item.province_id, label: item.province })),
		subdistrictOptions: rajaOngkir.subdistricts.map(item => ({
			value: item.subdistrict_id,
			label: item.subdistrict_name
		}))
	}
}

const actions = {
	fetchCities,
	fetchProvinces,
	fetchSubdistricts,
	fetchCouriers,
	setCartDrawerFromStore,
	fetchUser,
	fetchCartItems,
	saveCourierDetails,
	saveOrder
}

// prettier-ignore
export default connect(mapState, actions)(Checkout)
