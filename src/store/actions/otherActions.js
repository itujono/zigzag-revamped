import * as types from "../types"
import { instance, useRenderError } from "helpers"

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

export const saveCourierDetails = (values, formData, push) => dispatch => {
	dispatch(loadingOther())
	return instance
		.post(`/order/save_expedition`, values)
		.then(({ data }) => {
			dispatch({ type: types.SAVE_COURIER_DETAILS, payload: data.data.order_id })
			localStorage.setItem("formData", JSON.stringify({ ...formData, order_detail: data.data.order_id }))
		})
		.then(() => push("/checkout/payment"))
		.catch(err => useRenderError(err, dispatch, types.SAVE_COURIER_DETAILS_ERROR))
}

export const saveOrder = (values, push) => dispatch => {
	dispatch(loadingOther())
	return instance
		.post(`/order/save`, values)
		.then(({ data }) => {
			console.log({ saveOrder: data })
			dispatch({ type: types.SAVE_ORDER, payload: data.data })
		})
		.then(() => push({ pathname: "/order/order_success", state: { isSuccess: true } }))
		.catch(err => useRenderError(err, dispatch, types.SAVE_ORDER_ERROR))
}

export const fetchOrderHistory = () => dispatch => {
	dispatch(loadingOther())
	return instance
		.get(`/order/history_order/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_ORDER_HISTORY, payload: data.data.order_data }))
		.catch(err => useRenderError(err, dispatch, types.FETCH_ORDER_HISTORY_ERROR))
}
