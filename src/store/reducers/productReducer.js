import * as types from "../types"

const initialState = {
	user: {},
	categories: []
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.LOADING_PRODUCT:
			return { ...state, loading: true }
		case types.FETCH_PRODUCT_ITEM:
			return { ...state, product: action.payload, loading: false }
		case types.FETCH_PRODUCTS:
			return { ...state, products: action.payload, loading: false }
		case types.FETCH_PRODUCT_CATEGORIES:
			return { ...state, categories: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
