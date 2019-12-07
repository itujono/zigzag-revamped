import * as types from "../types"
import { instance } from "helpers"
import { message } from "antd"

const loadingUser = () => ({ type: types.LOADING_USER })

export const fetchUser = () => dispatch => {
	dispatch(loadingUser())
	return instance
		.get(`/customer/view`)
		.then(({ data }) => {
			console.log({ profileData: data })
			dispatch({ type: types.FETCH_USER, payload: data.data.account_customer })
		})
		.catch(err => console.error(err.response))
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
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.UPDATE_USER_PROFILE_ERROR, payload: error })
		})
}
