import * as types from "../types"
import { instance, renderError } from "helpers"
import { message } from "antd"

const loadingOther = () => ({ type: types.LOADING_OTHER })

export const setCartDrawerFromStore = (cartDrawer) => ({
	type: types.SET_CART_DRAWER_FROM_STORE,
	payload: cartDrawer
})

export const fetchOrderCodeList = () => (dispatch) => {
	dispatch(loadingOther())
	return instance
		.get(`/order/order_code/list`)
		.then(({ data }) => {
			console.log({ orderCodeList: data })
			dispatch({ type: types.FETCH_ORDER_CODE_LIST, payload: data.data.orders })
		})
		.catch((err) => console.error(err.response))
}

export const fetchBankAccounts = () => (dispatch) => {
	dispatch(loadingOther())
	return instance
		.get(`/order/bank_accounts/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_BANK_ACCOUNTS, payload: data.data.bank_accounts_data }))
		.catch((err) => console.error(err.response))
}

export const fetchCustomerServices = () => (dispatch) => {
	dispatch(loadingOther())
	return instance
		.get(`/customer_service/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_CUSTOMER_SERVICES, payload: data.data.customer_service_data }))
		.catch((err) => console.error(err.response))
}

export const saveCourierDetails = (values, formData, push) => (dispatch) => {
	dispatch(loadingOther())
	return instance
		.post(`/order/save_expedition`, values)
		.then(({ data }) => {
			dispatch({ type: types.SAVE_COURIER_DETAILS, payload: data.data.order_id })
			localStorage.setItem("formData", JSON.stringify({ ...formData, order_detail: data.data.order_id }))
		})
		.then(() => push("/checkout/payment"))
		.catch((err) => renderError(err, dispatch, types.SAVE_COURIER_DETAILS_ERROR))
}

export const saveOrder = (values, push) => (dispatch) => {
	dispatch(loadingOther())
	return instance
		.post(`/order/save`, values)
		.then(({ data }) => dispatch({ type: types.SAVE_ORDER, payload: data.data }))
		.then(() => {
			localStorage.removeItem("formData")
			push({ pathname: "/order/order_success", state: { isSuccess: true, paymentMethod: values.payment_method } })
		})
		.catch((err) => renderError(err, dispatch, types.SAVE_ORDER_ERROR))
}

export const orderConfirmation = (values, push) => (dispatch) => {
	dispatch(loadingOther())
	const formData = new FormData()
	formData.append("order_code", values.order_code)
	formData.append("bank_sender", values.bank_sender)
	formData.append("bank_number_sender", values.bank_number_sender)
	formData.append("bank_receiver", values.bank_receiver)
	formData.append("date", values.date)
	formData.append("total_transfer", values.total_transfer)
	formData.append("evidence_file", values.evidence_file)
	return instance
		.post(`/order/confirmation_order`, formData)
		.then(({ data }) => dispatch({ type: types.ORDER_CONFIRMATION, payload: data.data }))
		.then(() => {
			localStorage.removeItem("formData")
			push({ pathname: "/order/confirmation/success", state: { isSuccess: true } })
		})
		.catch((err) => renderError(err, dispatch, types.ORDER_CONFIRMATION_ERROR))
}

export const fetchOrderHistory = () => (dispatch) => {
	dispatch(loadingOther())
	return instance
		.get(`/order/history_order/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_ORDER_HISTORY, payload: data.data.order_data }))
		.catch((err) => renderError(err, dispatch, types.FETCH_ORDER_HISTORY_ERROR))
}

export const cancelOrder = (values) => (dispatch) => {
	dispatch(loadingOther())
	return instance
		.post(`/order/cancel_order`, values)
		.then(({ data }) => dispatch({ type: types.CANCEL_ORDER, payload: data.data }))
		.then(() => dispatch(fetchOrderHistory()))
		.then(() => {
			message
				.loading("Memproses batal order...")
				.then(() =>
					message.success("Oke, orderan ini telah di-cancel. Silakan cek email untuk info pembatalannya")
				)
		})
		.catch((err) => renderError(err, dispatch, types.CANCEL_ORDER_ERROR))
}
