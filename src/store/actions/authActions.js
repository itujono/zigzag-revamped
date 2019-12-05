import { instance } from "helpers"
import * as types from "../types"
import { message } from "antd"

const loadingAuth = () => ({ type: types.LOADING_USER })

export const authUser = ({ email, password }) => dispatch => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/login`, { email, password })
		.then(({ data }) => {
			console.log({ data })
			dispatch({ type: types.AUTH_USER, payload: data })
		})
		.catch(err => console.error(err.response))
}

export const registerUser = values => dispatch => {
	dispatch(loadingAuth())
	return instance
		.post(`/customer/register`, values)
		.then(response => {
			console.log({ regis: response })
			dispatch({ type: types.REGISTER_USER, payload: response.data })
			return response
		})
		.catch(err => {
			console.error(err.response)
			if (err.response) {
				message.error(err.response.message || "")
			}
			dispatch({ type: types.REGISTER_USER_ERROR, payload: (err.response || {}).message || "" })
		})
}
