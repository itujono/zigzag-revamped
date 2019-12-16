/* eslint-disable no-undef */
import * as types from "store/types"
import Axios from "axios"
import { useRenderError } from "helpers"

const baseUrl = `https://pro.rajaongkir.com/api`
const corsUrl = `https://cors-anywhere.herokuapp.com`
// const rajaOngkirKey = `c03222c90f4b9b6ee35230d270d616ab`

const loadingRajaOngkir = () => ({ type: types.LOADING_RAJAONGKIR })

export const fetchProvinces = () => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.get(`${corsUrl}/${baseUrl}/province`, { params: { key: process.env.REACT_APP_RAJAONGKIR } })
		.then(({ data }) => dispatch({ type: types.FETCH_PROVINCES, payload: data.rajaongkir.results }))
		.catch(err => useRenderError(err, dispatch, types.FETCH_PROVINCES_ERROR))
}

export const fetchCities = (cityId, provinceId) => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.get(`${corsUrl}/${baseUrl}/city?id=${cityId}&province=${provinceId}`, {
		params: { key: process.env.REACT_APP_RAJAONGKIR }
	})
		.then(({ data }) => dispatch({ type: types.FETCH_CITIES, payload: data.rajaongkir.results }))
		.catch(err => useRenderError(err, dispatch, types.FETCH_CITIES_ERROR))
}

export const fetchSubdistricts = cityId => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.get(`${corsUrl}/${baseUrl}/subdistrict?city=${cityId}`, {
		params: { key: process.env.REACT_APP_RAJAONGKIR }
	})
		.then(({ data }) => dispatch({ type: types.FETCH_SUBDISTRICTS, payload: data.rajaongkir.results }))
		.catch(err => useRenderError(err, dispatch, types.FETCH_SUBDISTRICTS_ERROR))
}

export const fetchCouriers = data => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.post(`${corsUrl}/${baseUrl}/cost`, data, {
		headers: { key: process.env.REACT_APP_RAJAONGKIR }
	})
		.then(({ data }) => dispatch({ type: types.FETCH_COURIERS, payload: data.rajaongkir.results }))
		.catch(err => useRenderError(err, dispatch, types.FETCH_COURIERS_ERROR))
}

export const fetchAirwayBill = ({ waybill, courier }) => dispatch => {
	dispatch(loadingRajaOngkir())
	return Axios.post(
		`${corsUrl}/${baseUrl}/waybill`,
		{ waybill, courier },
		{
			headers: { key: process.env.REACT_APP_RAJAONGKIR }
		}
	)
		.then(({ data }) => dispatch({ type: types.FETCH_AIRWAY_BILL, payload: data.rajaongkir.result }))
		.catch(err => useRenderError(err, dispatch, types.FETCH_AIRWAY_BILL_ERROR))
}
