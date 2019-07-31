import React, { Suspense } from "react"
import { Section, Loading, Layout } from "components"
import { Switch, Route } from "react-router-dom"

const TutorSMS = React.lazy(() => import("./TutorSMS"))
const CudyMarketplace = React.lazy(() => import("./CudyMarketplace"))
const Mooc = React.lazy(() => import("./Mooc"))
const CudyPass = React.lazy(() => import("./CudyPass"))
const CudyLMS = React.lazy(() => import("./CudyLMS"))

export default function Products() {
	return (
		<Layout sidebar>
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route path="/product/tutorsms" component={TutorSMS} />
					<Route path="/product/marketplace" component={CudyMarketplace} />
					<Route path="/product/cudymooc" component={Mooc} />
					<Route path="/product/cudypass" component={CudyPass} />
					<Route path="/product/cudylms" component={CudyLMS} />
				</Switch>
			</Suspense>
		</Layout>
	)
}
