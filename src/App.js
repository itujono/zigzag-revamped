import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { Provider } from "react-redux"
import { createAppStore } from "./store"
import Home from "./pages/Home"

// const fallback = (
// 	<Section>
// 		<Heading content="Loading..." />
// 	</Section>
// )

const App = () => {
	return (
		<Provider store={createAppStore()}>
			<BrowserRouter>
				{/* <Suspense fallback={fallback}> */}
				<Switch>
					{/* <Redirect exact from="/" to="/dashboard" /> */}
					<Route path="/" component={Home} />
				</Switch>
				{/* </Suspense> */}
			</BrowserRouter>
		</Provider>
	)
}

export default App
