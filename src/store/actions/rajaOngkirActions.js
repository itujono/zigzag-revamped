/* eslint-disable no-undef */
import * as types from "store/types"
import Axios from "axios"
import { renderError, instance } from "helpers"

const baseUrl = `https://pro.rajaongkir.com/api`
const corsUrl = `https://cors-anywhere.herokuapp.com`
// const rajaOngkirKey = `c03222c90f4b9b6ee35230d270d616ab`
const tempUrl = `/order/province/list`

const loadingRajaOngkir = () => ({ type: types.LOADING_RAJAONGKIR })

export const fetchProvinces = () => (dispatch) => {
	dispatch(loadingRajaOngkir())
	return instance
		.get(`/order/province/list`, { params: { key: process.env.REACT_APP_RAJAONGKIR } })
		.then(({ data }) => dispatch({ type: types.FETCH_PROVINCES, payload: data.data.provinces.province }))
		.catch((err) => renderError(err, dispatch, types.FETCH_PROVINCES_ERROR))
}

export const fetchCities = (province_id) => (dispatch) => {
	dispatch(loadingRajaOngkir())
	return instance
		.get(`/order/city/list`, { params: { province_id } })
		.then(({ data }) => dispatch({ type: types.FETCH_CITIES, payload: data.data.cities?.city }))
		.catch((err) => renderError(err, dispatch, types.FETCH_CITIES_ERROR))
}

export const fetchSubdistricts = (city_id) => (dispatch) => {
	dispatch(loadingRajaOngkir())
	return instance
		.get(`/order/subdistrict/list`, { params: { city_id } })
		.then(({ data }) => dispatch({ type: types.FETCH_SUBDISTRICTS, payload: data.data.subdistrict?.subdistrict }))
		.catch((err) => renderError(err, dispatch, types.FETCH_SUBDISTRICTS_ERROR))
}

export const fetchCouriers = ({ origin, originType, destination, destinationType, weight }) => (dispatch) => {
	dispatch(loadingRajaOngkir())
	return instance
		.get(`/order/expedition-cost`, { params: { origin, originType, destination, destinationType, weight } })
		.then(({ data }) => dispatch({ type: types.FETCH_COURIERS, payload: data.data }))
		.catch((err) => renderError(err, dispatch, types.FETCH_COURIERS_ERROR))
}

export const fetchAirwayBill = ({ waybill, courier }) => (dispatch) => {
	dispatch(loadingRajaOngkir())
	return Axios.post(
		`${corsUrl}/${baseUrl}/waybill`,
		{ waybill, courier },
		{
			headers: { key: process.env.REACT_APP_RAJAONGKIR }
		}
	)
		.then(({ data }) => dispatch({ type: types.FETCH_AIRWAY_BILL, payload: data.rajaongkir.result }))
		.catch((err) => renderError(err, dispatch, types.FETCH_AIRWAY_BILL_ERROR))
}
