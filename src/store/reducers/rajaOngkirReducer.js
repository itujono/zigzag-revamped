import * as types from "store/types"

const initialStates = {
	provinces: []
}

function reducer(state = initialStates, action) {
	switch (action.type) {
		case types.FETCH_PROVINCES:
			return { ...state, provinces: action.payload }
		default:
			return state
	}
}

export default reducer