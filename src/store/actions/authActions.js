import { instance, renderError } from "helpers"
import * as types from "../types"
import { message } from "antd"

const loadingAuth = () => ({ type: types.LOADING_USER })

export const authUser = ({ email, password }, setSubmitting, previousUrl) => (dispatch) => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/login`, { email, password })
		.then(({ data }) => {
			dispatch({ type: types.AUTH_USER, payload: data.data })
			localStorage.setItem("access_token", data.data.access_token)
			localStorage.setItem("account_type", JSON.stringify(data.data.account_type))
			localStorage.setItem("user_id", data.data.customer_id)
		})
		.then(() => window.location.replace(previousUrl ? previousUrl : "/"))
		.catch((err) => renderError(err, dispatch, types.AUTH_USER_ERROR))
		.finally(() => setSubmitting(false))
}

export const unauthUser = (push = null) => (dispatch) => {
	dispatch(loadingAuth())
	return instance
		.get(`/customer/logout`)
		.then(({ data }) => dispatch({ type: types.UNAUTH_USER, payload: data }))
		.then(() => localStorage.clear())
		.then(() => {
			message
				.loading("Mohon tunggu...")
				.then(() => {
					if (!push) return window.location.replace("/logout")
					push({ pathname: "/logout", state: { success: true } })
				})
				.then(() => message.success("Kamu udah keluar. Please come back! :)"))
		})
		.catch((err) => {
			const error = (err.response.data || {}).message || ""
			if (err.response) message.error(error)
			if ((err.response || {}).status === 401) {
				localStorage.clear()
				message
					.loading("Mohon tunggu...", 1)
					.then(() => {
						if (!push) return window.location.replace("/logout")
						push({ pathname: "/logout", state: { success: true } })
					})
					.then(() => message.success("Session kamu sudah berakhir. Mohon login kembali :)"))
			}

			dispatch({ type: types.AUTH_USER_ERROR, payload: error })
		})
}

export const registerUser = (values, accountType, push) => (dispatch) => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/register`, values)
		.then((response) => {
			dispatch({ type: types.REGISTER_USER, payload: response.data })
			return response
		})
		.then(() => {
			push({ pathname: "/register/success", state: { success: true, isVip: accountType === 2 } })
		})
		.catch((err) => {
			console.error({ err })
			renderError(err, dispatch, types.REGISTER_USER_ERROR)
		})
}

export const forgotPassword = ({ email }, push) => (dispatch) => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/forgot_password`, { email })
		.then((response) => {
			dispatch({ type: types.FORGOT_PASSWORD, payload: response.data })
			return response
		})
		.then(() => {
			push({ pathname: "/forgot_password/success", state: { success: true } })
		})
		.catch((err) => renderError(err, dispatch, types.FORGOT_PASSWORD_ERROR))
}

export const changeNewPassword = (values, push) => (dispatch) => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/new_password`, values)
		.then((response) => {
			dispatch({ type: types.CHANGE_NEW_PASSWORD, payload: response.data })
			return response
		})
		.then(() => {
			push({ pathname: "/new-password/success", state: { success: true } })
		})
		.catch((err) => renderError(err, dispatch, types.CHANGE_NEW_PASSWORD_ERROR))
}
