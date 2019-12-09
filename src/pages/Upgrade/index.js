import React from "react"
import { Layout, Section, Card } from "components"
import { Switch, Route, useHistory } from "react-router-dom"
import UpgradePropose from "./UpgradePropose"
import UpgradeSent from "./UpgradeSent"
import UpgradeConfirmation from "./UpgradeConfirmation"
import ConfirmationSuccess from "./ConfirmationSuccess"

export default function AccountUpgrade() {
	const { push } = useHistory()
	const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
	const token = localStorage.getItem("access_token")

	if (accountType.account_type_id !== 1 || !token) push("/404")

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
