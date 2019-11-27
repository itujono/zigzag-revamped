import { instance } from "helpers"

export const authUser = ({ email, password }) => dispatch => {
	return instance
		.post(``, { email, password })
		.then(({ data }) => {
			console.log({ data: data.response })
		})
		.catch(err => console.error(err.response))
}
