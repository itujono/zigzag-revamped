import React, { useEffect } from "react"
import { Section, Layout, Heading } from "components"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { Row, Col } from "antd"
import styled from "styled-components/macro"

import { fetchProvinces, fetchCities, fetchSubdistricts } from "store/actions/rajaOngkirActions"
import Address from "./Address"
import Ongkir from "./Ongkir"
import Payment from "./Payment"
import Summary from "./Summary"

const Sidebar = styled.div`
	padding: 2em 3em;
	height: 100vh;
	background-color: #f9f9f9;
`

function Checkout({ provinceOptions, cityOptions, subdistrictOptions, ...props }) {
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
										data={{ provinceOptions, cityOptions, subdistrictOptions }}
										handlers={{ fetchCities, fetchSubdistricts }}
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
