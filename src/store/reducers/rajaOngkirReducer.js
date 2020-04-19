import * as types from "store/types"

const initialStates = {
	provinces: [],
	cities: [],
	subdistricts: [],
	couriers: [],
	airwayBill: {},
	provinceOptions: [],
	cityOptions: [],
	subdistrictOptions: [],
	provinceOnSidebar: () => null,
	cityOnSidebar: () => null,
	subdistrictOnSidebar: () => null,

	airwayBillError: null,
	couriersError: null,
	provincesError: null,
	citiesError: null,
	subdistrictsError: null
}

function reducer(state = initialStates, action) {
	switch (action.type) {
		case types.LOADING_RAJAONGKIR:
			return { ...state, loading: true }
		case types.FETCH_PROVINCES:
			const provinceOptions = action.payload.map((item) => ({ value: item.province_id, label: item.province }))
			const provinceOptionsAuto = action.payload.map((item) => ({
				value: Number(item.province_id),
				text: item.province
			}))
			const provinceOnSidebar = (province) => action.payload.find((item) => item.province_id === province) || {}
			return {
				...state,
				provinces: action.payload,
				provinceOptions,
				provinceOnSidebar,
				provinceOptionsAuto,
				loading: false
			}

		case types.FETCH_CITIES:
			const cityOptions = action.payload.map((item) => ({ value: item.city_id, label: item.city_name }))
			const cityOnSidebar = (city) => action.payload.find((item) => item.city_id === city) || {}
			const cityOptionsAuto = action.payload.map((item) => ({
				value: Number(item.city_id),
				text: item.city_name
			}))
			return { ...state, cities: action.payload, cityOptions, cityOnSidebar, cityOptionsAuto, loading: false }

		case types.FETCH_SUBDISTRICTS:
			const subdistrictOptions = action.payload.map((item) => ({
				value: item.subdistrict_id,
				label: item.subdistrict_name
			}))
			const subdistrictOptionsAuto = action.payload.map((item) => ({
				value: Number(item.subdistrict_id),
				text: item.subdistrict_name
			}))
			const subdistrictOnSidebar = (subdistrict) => {
				return action.payload.find((item) => item.subdistrict_id === subdistrict) || {}
			}
			return {
				...state,
				subdistricts: action.payload,
				subdistrictOptions,
				subdistrictOnSidebar,
				subdistrictOptionsAuto,
				loading: false
			}
		case types.FETCH_COURIERS:
			return { ...state, couriers: action.payload, loading: false }

		case types.FETCH_COURIERS_ERROR:
			return { ...state, couriersError: action.payload, loading: false }
		case types.FETCH_PROVINCES_ERROR:
			return { ...state, provincesError: action.payload, loading: false }
		case types.FETCH_CITIES_ERROR:
			return { ...state, citiesError: action.payload, loading: false }
		case types.FETCH_SUBDISTRICTS_ERROR:
			return { ...state, subdistrictsError: action.payload, loading: false }
		case types.FETCH_AIRWAY_BILL:
			return { ...state, airwayBill: action.payload, loading: false }
		case types.FETCH_AIRWAY_BILL_ERROR:
			return { ...state, airwayBillError: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
