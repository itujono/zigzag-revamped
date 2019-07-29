import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { Provider } from "react-redux"
import { createAppStore } from "./store"
import { Spin } from "antd"
import { Section } from "components"

const Home = React.lazy(() => import("pages/Home"))
const ProductDetail = React.lazy(() => import("pages/ProductDetail"))
const Category = React.lazy(() => import("pages/Category"))

const fallback = (
	<Section>
		<Spin tip="Loading..." />
	</Section>
)

const App = () => {
	return (
		<Provider store={createAppStore()}>
			<BrowserRouter>
				<Suspense fallback={fallback}>
					<Switch>
						{/* <Redirect exact from="/" to="/dashboard" /> */}
						<Route exact path="/" component={Home} />
						<Route path="/product/:name" component={ProductDetail} />
						<Route path="/category/:name" component={Category} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</Provider>
	)
}

export default App
