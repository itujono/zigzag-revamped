import React from "react"
import { Section, Layout } from "components"
import { Switch, Route, Redirect } from "react-router-dom"
import Address from "./Address"
import Ongkir from "./Ongkir"
import Payment from "./Payment"
import Summary from "./Summary"

export default function Checkout() {
	return (
		<Layout sidebar page="checkout">
			<Section paddingHorizontal={0}>
				<Switch>
					<Redirect exact from="/checkout" to="/checkout/address" />
					<Route path="/checkout/address" component={Address} />
					<Route path="/checkout/ongkir" component={Ongkir} />
					<Route path="/checkout/payment" component={Payment} />
					<Route path="/checkout/summary" component={Summary} />
				</Switch>
			</Section>
		</Layout>
	)
}
