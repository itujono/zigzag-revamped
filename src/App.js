import React, { Suspense, useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { createAppStore } from "./store"
import { Loading } from "components"

const Home = React.lazy(() => import("pages/Home"))
const Products = React.lazy(() => import("pages/Products"))

const App = () => {
	return (
		<Provider store={createAppStore()}>
			<BrowserRouter>
				<Suspense fallback={<Loading />}>
					<ThemeProvider theme={{ mode, toggle: handleToggle }}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/product" component={Products} />
						</Switch>
					</ThemeProvider>
				</Suspense>
			</BrowserRouter>
		</Provider>
	)
}

export default App
