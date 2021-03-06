import * as types from "../types"

const initialState = {
	isLoggedin: false,
	registerUserError: null,
	authUserError: null,
	forgotError: null,
	newPasswordError: null
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.LOADING_USER:
			return { ...state, loading: true }
		case types.AUTH_USER:
			return { ...state, isLoggedin: true, loading: false }
		case types.REGISTER_USER:
			return { ...state, loading: false }
		case types.UNAUTH_USER:
			return { ...state, loading: false }
		case types.CHANGE_NEW_PASSWORD:
			return { ...state, loading: false }
		case types.REGISTER_USER_ERROR:
			return { ...state, registerUserError: action.payload, loading: false }
		case types.AUTH_USER_ERROR:
			return { ...state, authUserError: action.payload, loading: false }
		case types.FORGOT_PASSWORD_ERROR:
			return { ...state, forgotError: action.payload, loading: false }
		case types.CHANGE_NEW_PASSWORD_ERROR:
			return { ...state, newPasswordError: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
