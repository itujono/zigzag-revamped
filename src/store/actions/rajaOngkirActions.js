/* eslint-disable no-undef */
import * as types from "store/types"
import Axios from "axios"
import { renderError, instance } from "helpers"
import { COURIER_LIST } from "helpers/constants"

// const baseUrl = `https://pro.rajaongkir.com/api`
// const corsUrl = `https://cors-anywhere.herokuapp.com`
// const rajaOngkirKey = `c03222c90f4b9b6ee35230d270d616ab`
// const tempUrl = `/order/province/list`

const loadingRajaOngkir = () => ({ type: types.LOADING_RAJAONGKIR })

const getProvince = () => {
	return instance.get(`/order/province/list`)
}
const getCity = () => {
	return instance.get(`/order/city/list`)
}
const getSubdis = () => {
	return instance.get(`/order/subdistrict/list`)
}

export const fetchAllRegions = () => (dispatch) => {
	return Promise.all([getProvince(), getCity(), getSubdis()]).then((result) => {
		console.log({ result })
		dispatch({
			type: types.FETCH_ALL_REGIONS,
			payload: {
				provinces: result[0].data?.data?.provinces?.province,
				cities: result[1].data?.data?.cities?.city,
				subdistricts: result[2].data?.data?.subdistrict?.subdistrict
			}
		})
	})
}

export const fetchProvinces = () => (dispatch) => {
	dispatch(loadingRajaOngkir())
	return instance
		.get(`/order/province/list`)
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

export const fetchCouriers =
	({ origin, originType, destination, destinationType, weight }) =>
	(dispatch) => {
		dispatch(loadingRajaOngkir())
		const courier = COURIER_LIST
		return instance
			.get(`/order/expedition-cost`, {
				params: { origin, originType, destination, destinationType, weight, courier }
			})
			.then(({ data }) => dispatch({ type: types.FETCH_COURIERS, payload: data.data.pushData }))
			.catch((err) => renderError(err, dispatch, types.FETCH_COURIERS_ERROR))
	}

export const fetchCouriersBackend = () => (dispatch) => {
	dispatch(loadingRajaOngkir())
	return instance
		.get(`/backend/expedition/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_COURIERS_BACKEND, payload: data.data.ekspedition_data }))
		.catch((err) => renderError(err, dispatch, types.FETCH_COURIERS_BACKEND_ERROR))
}

export const fetchAirwayBill =
	({ waybill, courier }) =>
	(dispatch) => {
		dispatch(loadingRajaOngkir())
		return instance(`/order/airwaybill`, { waybill, courier })
			.then(({ data }) => dispatch({ type: types.FETCH_AIRWAY_BILL, payload: data.data.airwayBill }))
			.catch((err) => renderError(err, dispatch, types.FETCH_AIRWAY_BILL_ERROR))
	}
