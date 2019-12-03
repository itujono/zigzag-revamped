import * as types from "../types"

const initial = { cartDrawer: false, orderCodeList: [], bankAccounts: [] }

function reducer(state = initial, action) {
	switch (action.type) {
		case types.LOADING_OTHER:
			return { ...state, loading: true }
		case types.SET_CART_DRAWER_FROM_STORE:
			return { ...state, cartDrawer: action.payload, loading: false }
		case types.FETCH_ORDER_CODE_LIST:
			return { ...state, orderCodeList: action.payload, loading: false }
		case types.FETCH_BANK_ACCOUNTS:
			return { ...state, bankAccounts: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
