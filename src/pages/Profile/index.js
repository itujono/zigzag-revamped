import React, { Suspense, useEffect } from "react"
import { Section, Layout, Loading } from "components"
import { Switch, Route, useHistory } from "react-router-dom"

const Basic = React.lazy(() => import("./Basic"))
const HistoryOrder = React.lazy(() => import("./HistoryOrder"))
const Deposit = React.lazy(() => import("./Deposit"))
const Settings = React.lazy(() => import("./Settings"))
const Wishlist = React.lazy(() => import("./Wishlist"))
// const DepositConfirmation = React.lazy(() => import("./Deposit/DepositConfirmation"))

function Profile() {
	const { push } = useHistory()

	useEffect(() => {
		if (!localStorage.getItem("access_token")) push("/404")
		window.scrollTo(0, 0)
	}, [push])

	return (
		<Layout sidebar page="profile">
			<Section paddingHorizontal="0">
				<Suspense
					fallback={
						<Section centered>
							<Loading />
						</Section>
					}
				>
					<Switch>
						<Route path="/profile/basic" component={Basic} />
						<Route path="/profile/history" component={HistoryOrder} />
						<Route path="/profile/deposit" component={Deposit} />
						<Route path="/profile/settings" component={Settings} />
						<Route path="/profile/wishlist" component={Wishlist} />
					</Switch>
				</Suspense>
			</Section>
		</Layout>
	)
}

export default Profile
