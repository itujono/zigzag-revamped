import * as types from "../types"

const initialState = {
	user: {},
	loading: false
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.LOADING_USER:
			return { ...state, loading: true }
		case types.FETCH_USER:
			return { ...state, user: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
