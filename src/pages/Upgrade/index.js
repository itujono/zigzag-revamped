import React from "react"
import { Layout, Section, Card } from "components"
import { Switch, Route, useHistory } from "react-router-dom"
import UpgradePropose from "./UpgradePropose"
import UpgradeSent from "./UpgradeSent"
import UpgradeConfirmation from "./UpgradeConfirmation"
import ConfirmationSuccess from "./ConfirmationSuccess"

const accountType = JSON.parse(localStorage.getItem("account_type")) || {}

export default function AccountUpgrade() {
	const { push } = useHistory()

	if (accountType.account_type_id !== 1) push("/404")

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
