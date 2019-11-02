import * as types from "../types"

const initialState = {
	user: {}
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_PRODUCT_ITEM:
			return { ...state, product: action.payload }
		case types.FETCH_PRODUCTS:
			return { ...state, products: action.payload }
		default:
			return state
	}
}

export default reducer
