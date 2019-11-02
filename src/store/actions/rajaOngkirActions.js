import { instance } from "helpers"
import * as types from "store/types"
import Axios from "axios"

const baseUrl = `https://api.rajaongkir.com/starter`
const rajaOngkirKey = `c03222c90f4b9b6ee35230d270d616ab`

export const fetchProvinces = () => dispatch => {
	return Axios.get(`${baseUrl}/province`, { headers: { key: rajaOngkirKey, "Access-Control-Allow-Origin": "*" } })
		.then(response => {
			dispatch({ type: types.FETCH_PROVINCES, payload: response.data })
			console.log({ response: response.data })
		})
		.catch(err => console.error(err.response))
}
