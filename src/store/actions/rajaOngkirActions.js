import * as types from "store/types"
import Axios from "axios"

const baseUrl = `https://pro.rajaongkir.com/api`
const corsUrl = `https://cors-anywhere.herokuapp.com`
// const rajaOngkirKey = `c03222c90f4b9b6ee35230d270d616ab`

const loadingRajaOngkir = () => ({ type: types.LOADING_RAJAONGKIR })

export const fetchProvinces = () => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.get(`${baseUrl}/province`, { params: { key: process.env.REACT_APP_RAJAONGKIR } })
		.then(({ data }) => dispatch({ type: types.FETCH_PROVINCES, payload: data.rajaongkir.results }))
		.catch(err => console.error(err.response))
}

export const fetchCities = (cityId, provinceId) => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.get(`${baseUrl}/city?id=${cityId}&province=${provinceId}`, {
		params: { key: process.env.REACT_APP_RAJAONGKIR }
	})
		.then(({ data }) => dispatch({ type: types.FETCH_CITIES, payload: data.rajaongkir.results }))
		.catch(err => console.error(err.response))
}

export const fetchSubdistricts = cityId => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.get(`${baseUrl}/subdistrict?city=${cityId}`, { params: { key: process.env.REACT_APP_RAJAONGKIR } })
		.then(({ data }) => dispatch({ type: types.FETCH_SUBDISTRICTS, payload: data.rajaongkir.results }))
		.catch(err => console.error(err.response))
}

export const fetchCouriers = data => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.post(`${corsUrl}/${baseUrl}/cost`, data, {
		headers: { key: process.env.REACT_APP_RAJAONGKIR }
	})
		.then(({ data }) => dispatch({ type: types.FETCH_COURIERS, payload: data.rajaongkir.results }))
		.catch(err => console.error(err.response))
}
