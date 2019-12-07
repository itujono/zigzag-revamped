import * as types from "../types"

const initialState = {
	user: {},
	categories: [],
	products: [],
	restockProducts: [],
	loading: false,
	product: {},
	productPrice: 0,
	cartItems: []
}

const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
const { account_type_remark: typeRemark } = accountType

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.LOADING_PRODUCT:
			return { ...state, loading: true }
		case types.FETCH_PRODUCT_ITEM:
			const productPrice = action.payload.product_price
				.filter(({ price_type }) => price_type.toLowerCase() === typeRemark.toLowerCase())
				.map(({ price }) => price)[0]

			return { ...state, product: action.payload, productPrice, loading: false }
		case types.FETCH_PRODUCTS:
			return { ...state, products: action.payload, loading: false }
		case types.FETCH_RESTOCK_PRODUCTS:
			return { ...state, restockProducts: action.payload, loading: false }
		case types.FETCH_PRODUCT_CATEGORIES:
			return { ...state, categories: action.payload, loading: false }
		case types.FETCH_CART_ITEMS:
			return { ...state, cartItems: action.payload, loading: false }
		case types.ADD_ITEM_TO_CART:
			return { ...state, cartItems: [action.payload, ...state.cartItems], loading: false }
		default:
			return state
	}
}

export default reducer
