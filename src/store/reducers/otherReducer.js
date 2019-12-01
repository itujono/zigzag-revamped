import * as types from "../types"

const initial = { cartDrawer: false }

function reducer(state = initial, action) {
	switch (action.type) {
		case types.SET_CART_DRAWER_FROM_STORE:
			return { ...state, cartDrawer: action.payload ? true : false }
		default:
			return state
	}
}

export default reducer
