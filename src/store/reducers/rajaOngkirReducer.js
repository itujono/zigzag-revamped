import * as types from "store/types"

const initialStates = {
	provinces: [],
	cities: [],
	subdistricts: [],
	couriers: []
}

function reducer(state = initialStates, action) {
	switch (action.type) {
		case types.LOADING_RAJAONGKIR:
			return { ...state, loading: true }
		case types.FETCH_PROVINCES:
			const provinceOptions = action.payload.map(item => ({ value: item.province_id, label: item.province }))
			return { ...state, provinces: action.payload, provinceOptions, loading: false }
		case types.FETCH_CITIES:
			const cityOptions = action.payload.map(item => ({ value: item.city_id, label: item.city_name }))
			return { ...state, cities: action.payload, cityOptions, loading: false }
		case types.FETCH_SUBDISTRICTS:
			const subdistrictOptions = action.payload.map(item => ({
				value: item.subdistrict_id,
				label: item.subdistrict_name
			}))
			return { ...state, subdistricts: action.payload, subdistrictOptions, loading: false }
		case types.FETCH_COURIERS:
			return { ...state, couriers: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
