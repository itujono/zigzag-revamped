import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { Provider } from "react-redux"
import { createAppStore } from "./store"
import { Loading } from "components"
import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
import RegisterSuccess from "pages/auth/Register/RegisterSuccess"
import Forgot from "pages/auth/Forgot"
import ForgotSuccess from "pages/auth/Forgot/ForgotSuccess"
import Checkout from "pages/Checkout"
import CheckoutSuccess from "pages/Checkout/Success"
import Confirmation from "pages/Checkout/Confirmation"
import ConfirmationSuccess from "pages/Checkout/ConfirmationSuccess"
import NotFound from "pages/NotFound"
import AccountUpgrade from "pages/Upgrade"
import AccountActive from "pages/auth/AccountActive"
import NewPassword from "pages/auth/NewPassword"
import NewPasswordSuccess from "pages/auth/NewPassword/NewPasswordSuccess"

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
						<Route exact path="/account/active" component={AccountActive} />
						<Route path="/login" component={Login} />
						<Route exact path="/new-password" component={NewPassword} />
						<Route path="/new-password/success" component={NewPasswordSuccess} />
						<Route exact path="/register" component={Register} />
						<Route path="/register/success" component={RegisterSuccess} />
						<Route path="/checkout" component={Checkout} />
						<Route path="/order/order_success" component={CheckoutSuccess} />
						<Route exact path="/order/confirmation" component={Confirmation} />
						<Route path="/order/confirmation/success" component={ConfirmationSuccess} />
						<Route exact path="/forgot_password" component={Forgot} />
						<Route path="/forgot_password/success" component={ForgotSuccess} />
						<Route path="/upgrade" component={AccountUpgrade} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</Provider>
	)
}

export default App
