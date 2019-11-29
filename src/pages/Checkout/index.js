import React from "react"
import { Section, Layout, Heading } from "components"
import { Switch, Route, Redirect } from "react-router-dom"
import Address from "./Address"
import Ongkir from "./Ongkir"
import Payment from "./Payment"
import Summary from "./Summary"
import { Row, Col } from "antd"
import styled from "styled-components/macro"

const Sidebar = styled.div`
	padding: 2em 3em;
	height: 100vh;
	background-color: #f9f9f9;
`

export default function Checkout() {
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
							<Route path="/checkout/address" component={Address} />
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
