import * as types from "../types"

const initialState = {
	user: {}
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_USER:
			return { ...state, user: action.payload }
		default:
			return state
	}
}

export default reducer
