import * as types from "../types"

const initialState = {
	user: {},
	loading: false,
	error: null,
	depositList: [],
	depositError: null
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
		case types.FETCH_LIST_DEPOSIT:
			return { ...state, depositList: action.payload, loading: false }
		case types.ADD_NEW_DEPOSIT:
			return { ...state, loading: false }

		case types.UPDATE_USER_PROFILE_ERROR:
			return { ...state, error: action.payload, loading: false }
		case types.CHANGE_PROFILE_PASSWORD_ERROR:
			return { ...state, error: action.payload, loading: false }
		case types.FETCH_LIST_DEPOSIT_ERROR:
			return { ...state, depositError: action.payload, loading: false }
		case types.ADD_NEW_DEPOSIT_ERROR:
			return { ...state, depositError: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
