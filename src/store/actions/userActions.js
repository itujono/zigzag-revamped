import * as types from "../types"
import { instance, useRenderError } from "helpers"
import { message } from "antd"

const loadingUser = () => ({ type: types.LOADING_USER })

const token = localStorage.getItem("access_token")

export const fetchUser = () => dispatch => {
	dispatch(loadingUser())
	return instance
		.get(`/customer/view`)
		.then(({ data }) => {
			console.log({ profileData: data })
			dispatch({ type: types.FETCH_USER, payload: data.data.account_customer })
		})
		.catch(err => useRenderError(err, dispatch, types.FETCH_USER, true))
}

export const updateUserProfile = values => dispatch => {
	dispatch(loadingUser())
	return instance
		.put(`/customer/update_profile`, values)
		.then(({ data }) => {
			console.log({ profileData: data })
			dispatch({ type: types.UPDATE_USER_PROFILE, payload: data.data })
		})
		.then(() => dispatch(fetchUser()))
		.then(() => message.success("Profil kamu berhasil di-update"))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) message.error(error)
			dispatch({ type: types.UPDATE_USER_PROFILE_ERROR, payload: error })
		})
}

export const changeProfilePassword = values => dispatch => {
	dispatch(loadingUser())
	return instance
		.post(`/customer/change_password`, values)
		.then(({ data }) => {
			dispatch({ type: types.CHANGE_PROFILE_PASSWORD, payload: data })
		})
		.then(() => {
			message.loading("Mohon tunggu...").then(() => message.success("Password kamu sudah berhasil terganti"))
		})
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) message.error(error)
			dispatch({ type: types.CHANGE_PROFILE_PASSWORD_ERROR, payload: error })
		})
}

export const fetchListDeposit = () => dispatch => {
	dispatch(loadingUser())
	return instance
		.get(`/customer/list_deposit`)
		.then(({ data }) => {
			console.log({ deposit: data.data })
			dispatch({ type: types.FETCH_LIST_DEPOSIT, payload: data.data.deposit_data })
		})
		.catch(err => {
			useRenderError(err, dispatch, types.FETCH_LIST_DEPOSIT_ERROR)
		})
}

export const addNewDeposit = amount => dispatch => {
	dispatch(loadingUser())
	return instance
		.post(`/customer/deposit`, amount)
		.then(({ data }) => {
			dispatch({ type: types.ADD_NEW_DEPOSIT, payload: data })
		})
		.then(() => {
			message.loading("Mohon tunggu...", 1).then(() => dispatch(fetchListDeposit()))
		})
		.then(() => message.success("Kamu sudah berhasil melakukan permintaan deposit"))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) message.error(error)
			dispatch({ type: types.ADD_NEW_DEPOSIT_ERROR, payload: error })
		})
}

export const upgradeConfirmation = (values, push) => dispatch => {
	dispatch(loadingUser())
	return instance
		.post(`/customer/confirmation_upgrade_account`, values)
		.then(({ data }) => {
			dispatch({ type: types.UPGRADE_CONFIRMATION, payload: data })
		})
		.then(() => {
			message
				.loading("Memverifikasi data...", 1)
				.then(() => push({ pathname: "/upgrade/sent", state: { isSuccess: true } }))
		})
		.catch(err => {
			useRenderError(err, dispatch, types.UPGRADE_CONFIRMATION_ERROR)
		})
}

export const upgradeAccount = push => dispatch => {
	dispatch(loadingUser())
	return instance
		.get(`/customer/upgrade`)
		.then(({ data }) => {
			console.log({ upgrade: data.data })
			dispatch({ type: types.UPGRADE_ACCOUNT, payload: data.data })
		})
		.then(() => push({ pathname: "/upgrade/sent", state: { isSuccess: true } }))
		.catch(err => {
			useRenderError(err, dispatch, types.UPGRADE_ACCOUNT_ERROR)
		})
}
