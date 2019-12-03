import React, { Suspense } from "react"
import { Section, Layout, Loading } from "components"
import { Switch, Route } from "react-router-dom"

const Basic = React.lazy(() => import("./Basic"))
const HistoryOrder = React.lazy(() => import("./HistoryOrder"))
const Deposit = React.lazy(() => import("./Deposit"))
const Settings = React.lazy(() => import("./Settings"))
const Wishlist = React.lazy(() => import("./Wishlist"))

function Profile() {
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
