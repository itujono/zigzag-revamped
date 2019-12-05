import * as types from "../types"

const initialState = {
	isLoggedin: false
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.LOADING_USER:
			return { ...state, loading: true }
		case types.AUTH_USER:
			return { ...state, isLoggedin: true, loading: false }
		case types.REGISTER_USER:
			return { ...state, loading: false }
		case types.REGISTER_USER_ERROR:
			return { ...state, registerUserError: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
