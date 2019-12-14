import * as types from "../types"

const initialState = {
	user: {},
	loading: false,
	error: null,
	depositList: [],
	upgradeResponse: "",
	depositError: null,
	upgradeError: null,
	changeAvatarError: null,
	depositBalance: 0
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
			return {
				...state,
				depositList: action.payload,
				depositBalance: (action.payload[0] || {}).customer,
				loading: false
			}
		case types.ADD_NEW_DEPOSIT:
			return { ...state, loading: false }
		case types.UPGRADE_ACCOUNT:
			return { ...state, upgradeResponse: action.payload, loading: false }
		case types.CHANGE_AVATAR:
			return { ...state, avatar: action.payload, loading: false }

		case types.UPDATE_USER_PROFILE_ERROR:
			return { ...state, error: action.payload, loading: false }
		case types.CHANGE_PROFILE_PASSWORD_ERROR:
			return { ...state, error: action.payload, loading: false }
		case types.FETCH_LIST_DEPOSIT_ERROR:
			return { ...state, depositError: action.payload, loading: false }
		case types.ADD_NEW_DEPOSIT_ERROR:
			return { ...state, depositError: action.payload, loading: false }
		case types.UPGRADE_ACCOUNT_ERROR:
			return { ...state, upgradeError: action.payload, loading: false }
		case types.CHANGE_AVATAR_ERROR:
			return { ...state, changeAvatarError: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
