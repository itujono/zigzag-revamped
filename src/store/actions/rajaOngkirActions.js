import { instance } from "helpers"
import * as types from "store/types"
import Axios from "axios"

const baseUrl = `https://pro.rajaongkir.com/api`
// const rajaOngkirKey = `c03222c90f4b9b6ee35230d270d616ab`

export const fetchProvinces = () => dispatch => {
	return Axios.get(`${baseUrl}/province`, { params: { key: process.env.REACT_APP_RAJAONGKIR } })
		.then(response => {
			dispatch({ type: types.FETCH_PROVINCES, payload: response.data.rajaongkir.results })
		})
		.catch(err => console.error(err.response))
}

export const fetchCities = provinceId => dispatch => {
	return Axios.get(`${baseUrl}/city`, { params: { key: process.env.REACT_APP_RAJAONGKIR, province: provinceId } })
		.then(response => {
			dispatch({ type: types.FETCH_CITIES, payload: response.data.rajaongkir.results })
		})
		.catch(err => console.error(err.response))
}
