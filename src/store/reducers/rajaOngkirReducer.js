import * as types from "store/types"

const initialStates = {
	provinces: [],
	cities: []
}

function reducer(state = initialStates, action) {
	switch (action.type) {
		case types.FETCH_PROVINCES:
			return { ...state, provinces: action.payload }
		case types.FETCH_CITIES:
			return { ...state, cities: action.payload }
		default:
			return state
	}
}

export default reducer
