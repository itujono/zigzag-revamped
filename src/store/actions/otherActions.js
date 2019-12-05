import * as types from "../types"
import { instance } from "helpers"

const loadingOther = () => ({ type: types.LOADING_OTHER })

export const setCartDrawerFromStore = cartDrawer => ({
	type: types.SET_CART_DRAWER_FROM_STORE,
	payload: cartDrawer
})

export const fetchOrderCodeList = () => dispatch => {
	dispatch(loadingOther())
	return instance
		.get(`/order/order_code/list`)
		.then(({ data }) => {
			console.log({ orderCodeList: data })
			dispatch({ type: types.FETCH_ORDER_CODE_LIST, payload: data.result })
		})
		.catch(err => console.error(err.response))
}

export const fetchBankAccounts = () => dispatch => {
	dispatch(loadingOther())
	return instance
		.get(`/order/bank_accounts/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_BANK_ACCOUNTS, payload: data.data.bank_accounts_data }))
		.catch(err => console.error(err.response))
}

export const fetchCustomerServices = () => dispatch => {
	dispatch(loadingOther())
	return instance
		.get(`/customer_service/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_CUSTOMER_SERVICES, payload: data.data.customer_service_data }))
		.catch(err => console.error(err.response))
}
