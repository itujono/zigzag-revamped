import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { Provider } from "react-redux"
import { createAppStore } from "./store"
import { Loading } from "components"
import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
import Forgot from "pages/auth/Forgot"
import ForgotSuccess from "pages/auth/Forgot/ForgotSuccess"

const Home = React.lazy(() => import("pages/Home"))
const ProductDetail = React.lazy(() => import("pages/ProductDetail"))
const Category = React.lazy(() => import("pages/Category"))
const Profile = React.lazy(() => import("pages/Profile"))

const App = () => {
	return (
		<Provider store={createAppStore()}>
			<BrowserRouter>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Redirect exact from="/profile" to="/profile/basic" />
						<Route exact path="/" component={Home} />
						<Route path="/product/:id-:name" component={ProductDetail} />
						<Route path="/category/:id-:name" component={Category} />
						<Route path="/profile" component={Profile} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route exact path="/forgot_password" component={Forgot} />
						<Route path="/forgot_password/success" component={ForgotSuccess} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</Provider>
	)
}

export default App
