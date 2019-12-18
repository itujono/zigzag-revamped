import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { Provider } from "react-redux"
import { createAppStore } from "./store"
import { Loading, Modal, Heading, Button } from "components"
import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
import RegisterSuccess from "pages/auth/Register/RegisterSuccess"
import Forgot from "pages/auth/Forgot"
import ForgotSuccess from "pages/auth/Forgot/ForgotSuccess"
import MiscPage from "pages/Category/MiscPage"
import Checkout from "pages/Checkout"
import CheckoutSuccess from "pages/Checkout/Success"
import Confirmation from "pages/Checkout/Confirmation"
import ConfirmationSuccess from "pages/Checkout/ConfirmationSuccess"
import NotFound from "pages/NotFound"
import AccountUpgrade from "pages/Upgrade"
import AccountActive from "pages/auth/AccountActive"
import NewPassword from "pages/auth/NewPassword"
import NewPasswordSuccess from "pages/auth/NewPassword/NewPasswordSuccess"
import Logout from "pages/auth/Logout"
import SearchResult from "pages/Home/SearchResult"
import DepositConfirmation from "pages/Profile/Deposit/DepositConfirmation"
import DepositSuccess from "pages/Profile/Deposit/DepositSuccess"
import { useIdle } from "helpers"

const Home = React.lazy(() => import("pages/Home"))
const ProductDetail = React.lazy(() => import("pages/ProductDetail"))
const Category = React.lazy(() => import("pages/Category"))
const Profile = React.lazy(() => import("pages/Profile"))

const App = () => {
	const isIdle = useIdle({ timeToIdle: 60 * 1000 * 10, inactivityEvents: [] })

	return (
		<Provider store={createAppStore()}>
			<BrowserRouter>
				<Modal visible={isIdle} closable={false}>
					<Heading
						content="Sesi kamu tidak aktif"
						subheader="Kamu tidak melakukan aktifitas apa-apa selama beberapa waktu. Harap refresh halaman ini untuk me-restore sesi kamu."
						marginBottom="3em"
					/>
					<Button icon="reload" onClick={() => window.location.reload(true)}>
						Refresh halaman
					</Button>
				</Modal>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Redirect exact from="/profile" to="/profile/basic" />
						<Route exact path="/" component={Home} />
						<Route path="/product/:id-:name" component={ProductDetail} />
						<Route path="/category/:id-:name" component={Category} />
						<Route path="/products/:name" component={MiscPage} />
						<Route path="/profile" component={Profile} />
						<Route exact path="/account/active" component={AccountActive} />
						<Route path="/login" component={Login} />
						<Route path="/logout" component={Logout} />
						<Route exact path="/new-password" component={NewPassword} />
						<Route path="/new-password/success" component={NewPasswordSuccess} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/register/p/partner" render={() => <Register isPartner={true} />} />
						<Route path="/register/success" component={RegisterSuccess} />
						<Route path="/search" component={SearchResult} />
						<Route path="/checkout" component={Checkout} />
						<Route path="/order/order_success" component={CheckoutSuccess} />
						<Route exact path="/order/confirmation" component={Confirmation} />
						<Route path="/order/confirmation/success" component={ConfirmationSuccess} />
						<Route exact path="/forgot_password" component={Forgot} />
						<Route path="/forgot_password/success" component={ForgotSuccess} />
						<Route path="/upgrade" component={AccountUpgrade} />
						<Route exact path="/deposit/confirmation" component={DepositConfirmation} />
						<Route exact path="/deposit/confirmation_success" component={DepositSuccess} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</Provider>
	)
}

export default App
