import * as types from "../types"

const initialState = {
	user: {},
	loading: false,
	error: null
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.LOADING_USER:
			return { ...state, loading: true }
		case types.FETCH_USER:
			return { ...state, user: action.payload, loading: false }
		case types.UPDATE_USER_PROFILE:
			return { ...state, loading: false }
		case types.CHANGE_PROFILE_PASSWORD:
			return { ...state, loading: false }

		case types.UPDATE_USER_PROFILE_ERROR:
			return { ...state, error: action.payload, loading: false }
		case types.CHANGE_PROFILE_PASSWORD_ERROR:
			return { ...state, error: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
