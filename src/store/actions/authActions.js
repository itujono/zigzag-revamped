import { instance } from "helpers"
import * as types from "../types"

export const authUser = ({ email, password }) => dispatch => {
	return instance
		.post(`/customer/login`, { email, password })
		.then(({ data }) => {
			console.log({ data })
			dispatch({ type: types.AUTH_USER, payload: data })
		})
		.catch(err => console.error(err.response))
}
