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
			return { ...state, laoding: true }
		case types.FETCH_PROVINCES:
			return { ...state, provinces: action.payload, loading: false }
		case types.FETCH_CITIES:
			return { ...state, cities: action.payload, loading: false }
		case types.FETCH_SUBDISTRICTS:
			return { ...state, subdistricts: action.payload, loading: false }
		case types.FETCH_COURIERS:
			return { ...state, couriers: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
