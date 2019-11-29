import React, { useEffect, useState } from "react"
import { Section, Layout, Heading } from "components"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { Row, Col, Divider } from "antd"
import styled from "styled-components/macro"

import { fetchProvinces, fetchCities, fetchSubdistricts } from "store/actions/rajaOngkirActions"
import Address from "./Address"
import Ongkir from "./Ongkir"
import Payment from "./Payment"
import Summary from "./Summary"

const Sidebar = styled.div`
	padding: 2em 3em;
	height: 100%;
	background-color: #f9f9f9;
`

function Checkout({ provinceOptions, cityOptions, subdistrictOptions, ...props }) {
	const [formValues, setFormValues] = useState({})

	const { fetchCities, fetchSubdistricts } = props

	useEffect(() => {
		props.fetchProvinces()
	}, [])

	return (
		<Layout sidebar page="checkout">
			<Section
				noPadding
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
							<Route path="/checkout/ongkir" component={Ongkir} />
							<Route path="/checkout/payment" component={Payment} />
							<Route path="/checkout/summary" component={Summary} />
						</Switch>
					</Col>
					<Col lg={8}>
						<Sidebar>
							<Heading content="Orderan kamu" subheader="Ringkasan orderan kamu ter-update di sini" />
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
									<Heading reverse content="Provinsi" subheader={formValues.province || "-"} />
								</Col>
								<Col lg={12}>
									<Heading reverse content="Kota" subheader={formValues.city || "-"} />
								</Col>
								<Col lg={12}>
									<Heading reverse content="Kabupaten" subheader={formValues.subdistrict || "-"} />
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
						</Sidebar>
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

const mapState = ({ rajaOngkir }) => ({
	cityOptions: rajaOngkir.cities.map(item => ({ value: item.city_id, label: item.city_name })),
	provinceOptions: rajaOngkir.provinces.map(item => ({ value: item.province_id, label: item.province })),
	subdistrictOptions: rajaOngkir.subdistricts.map(item => ({
		value: item.subdistrict_id,
		label: item.subdistrict_name
	}))
})

// prettier-ignore
export default connect(mapState, { fetchCities, fetchProvinces, fetchSubdistricts })(Checkout)
