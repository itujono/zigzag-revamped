import * as types from "../types"

const initialState = {
	isLoggedin: false
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_USER:
			return { ...state, isLoggedin: true }
		default:
			return state
	}
}

export default reducer
