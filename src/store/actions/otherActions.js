import * as types from "../types"

export const setCartDrawerFromStore = cartDrawer => ({
	type: types.SET_CART_DRAWER_FROM_STORE,
	payload: cartDrawer
})
