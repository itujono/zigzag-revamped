import * as types from "../types"
import { instance } from "helpers"

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
