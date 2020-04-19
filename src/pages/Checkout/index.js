import React, { useEffect, useState, useCallback, Suspense } from "react"
import { Section, Layout, Heading, ButtonLink, Empty, Button, Loading } from "components"
import { Switch, Route, Redirect, Link } from "react-router-dom"
import { connect, useDispatch, useSelector, shallowEqual } from "react-redux"
import { Row, Col, Divider, List, Avatar, Collapse } from "antd"
import styled from "styled-components/macro"

import { fetchProvinces, fetchCities, fetchSubdistricts, fetchCouriers } from "store/actions/rajaOngkirActions"
import { setCartDrawerFromStore, saveCourierDetails, saveOrder } from "store/actions/otherActions"
import { fetchUser } from "store/actions/userActions"
import { fetchCartItems } from "store/actions/productActions"
import { pricer } from "helpers"

const Address = React.lazy(() => import("./Address"))
const Ongkir = React.lazy(() => import("./Ongkir"))
const Payment = React.lazy(() => import("./Payment"))
const Summary = React.lazy(() => import("./Summary"))

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

function Checkout(props) {
	const [formValues, setFormValues] = useState({})
	const [initialLoading, setInitialLoading] = useState(true)
	const [selectedCourier, setSelectedCourier] = useState({ code: "", details: {} })
	const [selectedPayment, setSelectedPayment] = useState({ value: "transfer", label: "ATM/Transfer bank" })
	const [selectedProvince, setSelectedProvince] = useState({})
	const [selectedCity, setSelectedCity] = useState({})
	const [selectedSubdistrict, setSelectedSubdistrict] = useState({})

	const user = useSelector(({ user }) => user.user)
	const dispatch = useDispatch()
	const couriers = useSelector(({ rajaOngkir }) => rajaOngkir.couriers)
	const courierDetails = useSelector(({ other }) => other.courierDetails)
	const rajaOngkirLoading = useSelector(({ rajaOngkir }) => rajaOngkir.loading)
	const userLoading = useSelector(({ user }) => user.loading)
	const cartItems = useSelector(({ product }) => product.cartItems)
	const cartTotal = useSelector(({ product }) => product.cartTotal)
	const { provinceOnSidebar, cityOnSidebar, subdistrictOnSidebar } = useSelector(
		({ rajaOngkir }) => ({
			provinceOnSidebar: rajaOngkir.provinceOnSidebar,
			cityOnSidebar: rajaOngkir.cityOnSidebar,
			subdistrictOnSidebar: rajaOngkir.subdistrictOnSidebar
		}),
		shallowEqual
	)

	const loading = rajaOngkirLoading || userLoading

	const formData = JSON.parse(localStorage.getItem("formData")) || {}
	const initialStates = Object.keys(formData).length ? formData : user

	const { province = {}, city = {}, subdistrict = {} } = initialStates

	const courierData = (selectedCourier.details || {}).cost || []
	const courierOnSidebar = formData.order_detail
		? `${formData.order_detail.ekspedition_company || ""} (${formData.order_detail.ekspedition_remark || ""})`
		: Object.keys(selectedCourier).length === 0
		? "-"
		: `${selectedCourier.details.service || ""} (${selectedCourier.details.description || ""})`

	const renderFormValues = (prop) => {
		const values = Object.keys(formValues).length === 0 ? formData : formValues
		if (prop === "province" || prop === "city" || prop === "subdistrict") return values[`${prop}_name`]
		return values[prop] === "" ? "-" : values[prop] ? values[prop] : user[prop]
	}

	const updatedCartTotal = JSON.stringify({ ...formData, cartTotal })

	useEffect(() => {
		const handleUpdateCartTotal = () => localStorage.setItem("formData", updatedCartTotal)

		setSelectedProvince({ value: province.value, text: province.text })
		setSelectedCity({ value: city.value, text: city.text })
		setSelectedSubdistrict({ value: subdistrict.value, text: subdistrict.text })

		dispatch(fetchProvinces())
		dispatch(fetchCartItems()).then(() => handleUpdateCartTotal())
		dispatch(fetchUser()).then(() => setInitialLoading(false))
	}, [dispatch, updatedCartTotal])

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
						<Suspense fallback={<Loading />}>
							<Switch>
								<Redirect exact from="/checkout" to="/checkout/address" />
								<Route
									path="/checkout/address"
									render={() => (
										<Address
											loading={loading}
											initialLoading={initialLoading}
											data={{
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
												fetchCouriers,
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
								<Route
									path="/checkout/summary"
									render={() => <Summary data={{ user }} handlers={{ saveOrder }} />}
								/>
							</Switch>
						</Suspense>
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
																		onClick={() => setCartDrawerFromStore(true)}
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
												subheader={
													selectedProvince.text ||
													formData.province_name ||
													user.province_name
												}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="Kota/Kabupaten"
												subheader={selectedCity.text || formData.city_name || user.city_name}
											/>
										</Col>
										<Col lg={12}>
											<Heading
												reverse
												content="Kecamatan"
												subheader={
													selectedSubdistrict.text ||
													formData.subdistrict_name ||
													user.subdistrict_name
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

export default Checkout
