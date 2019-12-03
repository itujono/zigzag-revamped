import React from "react"
import { Layout, Section, Card, Heading } from "components"
import { Switch, Route } from "react-router-dom"
import UpgradePropose from "./UpgradePropose"
import UpgradeSent from "./UpgradeSent"
import UpgradeConfirmation from "./UpgradeConfirmation"
import ConfirmationSuccess from "./ConfirmationSuccess"

export default function AccountUpgrade() {
	return (
		<Layout>
			<Section centered width="75%">
				<Card noHover padding="0">
					<Switch>
						<Route exact path="/upgrade" component={UpgradePropose} />
						<Route path="/upgrade/sent" component={UpgradeSent} />
						<Route path="/upgrade/confirmation" component={UpgradeConfirmation} />
						<Route path="/upgrade/confirmation_success" component={ConfirmationSuccess} />
					</Switch>
				</Card>
			</Section>
		</Layout>
	)
}
