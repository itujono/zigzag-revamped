import React from "react"
import { Layout, Section, Card, Heading } from "components"
import { Row, Col } from "antd"
import { Switch, Route } from "react-router-dom"
import UpgradePropose from "./UpgradePropose"
import UpgradeSent from "./UpgradeSent"
import UpgradeConfirmation from "./UpgradeConfirmation"

export default function AccountUpgrade() {
	return (
		<Layout>
			<Section centered width="75%">
				<Card noHover padding="0">
					<Switch>
						<Route exact path="/upgrade" component={UpgradePropose} />
						<Route path="/upgrade/sent" component={UpgradeSent} />
						<Route path="/upgrade/confirmation" component={UpgradeConfirmation} />
					</Switch>
				</Card>
			</Section>
		</Layout>
	)
}
