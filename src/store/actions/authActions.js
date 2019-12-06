import { instance } from "helpers"
import * as types from "../types"
import { message } from "antd"

const loadingAuth = () => ({ type: types.LOADING_USER })

export const authUser = ({ email, password }, setSubmitting, push) => dispatch => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/login`, { email, password })
		.then(({ data }) => {
			console.log({ loginResponse: data.data })
			localStorage.setItem("access_token", data.data.access_token)
			localStorage.setItem("account_type", data.data.account_type)
			dispatch({ type: types.AUTH_USER, payload: data.data })
		})
		.then(() => push("/"))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) message.error(error)

			dispatch({ type: types.AUTH_USER_ERROR, payload: error })
		})
		.finally(() => setSubmitting(false))
}

export const unauthUser = push => dispatch => {
	dispatch(loadingAuth())
	return instance
		.get(`/customer/logout`)
		.then(({ data }) => dispatch({ type: types.UNAUTH_USER, payload: data }))
		.then(() => {
			localStorage.clear()
			message
				.loading("Mohon tunggu...")
				.then(() => push("/"))
				.then(() => message.success("Kamu udah keluar. Please come back! :)"))
		})
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.AUTH_USER_ERROR, payload: error })
		})
}

export const registerUser = (values, accountType, push) => dispatch => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/register`, values)
		.then(response => {
			console.log({ regisFromStore: response })
			dispatch({ type: types.REGISTER_USER, payload: response.data })
			return response
		})
		.then(response => {
			push({ pathname: "/register/success", state: { success: true, isVip: accountType === 2 } })
		})
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.REGISTER_USER_ERROR, payload: error })
		})
}

export const forgotPassword = ({ email }, push) => dispatch => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/forgot_password`, { email })
		.then(response => {
			dispatch({ type: types.FORGOT_PASSWORD, payload: response.data })
			return response
		})
		.then(() => {
			push({ pathname: "/forgot_password/success", state: { success: true } })
		})
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.FORGOT_PASSWORD_ERROR, payload: error })
		})
}

export const changeNewPassword = (values, push) => dispatch => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/new_password`, values)
		.then(response => {
			dispatch({ type: types.CHANGE_NEW_PASSWORD, payload: response.data })
			return response
		})
		.then(() => {
			push({ pathname: "/new-password/success", state: { success: true } })
		})
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.CHANGE_NEW_PASSWORD_ERROR, payload: error })
		})
}
