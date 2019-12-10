import * as types from "../types"

const initialState = {
	user: {},
	categories: [],
	products: [],
	restockProducts: [],
	loading: false,
	product: {},
	productPrice: 0,
	cartItems: [],
	cartTotal: {},
	wishlistItems: [],
	wishlistError: null,
	searchList: [],
	searchError: null,
	productError: null,
	cartError: null
}

function reducer(state = initialState, action) {
	const token = localStorage.getItem("access_token")
	const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
	const { account_type_remark: typeRemark } = accountType

	switch (action.type) {
		case types.LOADING_PRODUCT:
			return { ...state, loading: true }
		case types.FETCH_PRODUCT_ITEM:
			const productPrice = action.payload.product_price
				.filter(({ price_type }) => {
					if (!token) return price_type === "REGULER"
					return price_type.toLowerCase() === typeRemark.toLowerCase()
				})
				.map(({ price }) => price)[0]

			return { ...state, product: action.payload, productPrice, loading: false }
		case types.FETCH_PRODUCTS:
			return { ...state, products: action.payload, loading: false }
		case types.FETCH_RESTOCK_PRODUCTS:
			return { ...state, restockProducts: action.payload, loading: false }
		case types.FETCH_PRODUCT_CATEGORIES:
			return { ...state, categories: action.payload, loading: false }

		case types.FETCH_CART_ITEMS:
			const cartItems = action.payload.map(({ product_data, ...item }) => {
				const price = product_data.product_price.filter(({ price_type }) => {
					if (!token) return price_type === "REGULER"
					return price_type.toLowerCase() === typeRemark.toLowerCase()
				})[0]
				return { ...item, product_data: { ...product_data, product_price: price } }
			})
			const totalPrice = action.payload.map(item => item.total_price).reduce((acc, curr) => acc + curr, 0)
			const totalWeight = action.payload
				.map(({ weight, qty }) => weight * Number(qty))
				.reduce((acc, curr) => acc + curr, 0)
			const totalQty = action.payload.map(item => Number(item.qty)).reduce((acc, curr) => acc + curr, 0)

			return {
				...state,
				cartItems,
				cartTotal: { price: totalPrice, weight: totalWeight, qty: totalQty },
				loading: false
			}

		case types.ADD_ITEM_TO_CART:
			return { ...state, loading: false }
		case types.UPDATE_CART_ITEM:
			return { ...state, loading: false }
		case types.DELETE_CART_ITEM:
			return { ...state, loading: false }
		case types.ADD_RATING:
			return { ...state, loading: false }

		case types.FETCH_WISHLIST_ITEMS:
			const theItems = action.payload.map(item => {
				const price = item.product_price.filter(({ price_type }) => {
					if (!token) return price_type === "REGULER"
					return price_type.toLowerCase() === typeRemark.toLowerCase()
				})[0]
				return { ...item, product_price: price }
			})
			return { ...state, wishlistItems: theItems, loading: false }

		case types.ADD_ITEM_TO_WISHLIST:
			return { ...state, loading: false }

		case types.SEARCH_PRODUCT:
			const items = action.payload.map(item => {
				const price = item.product_price.filter(({ price_type }) => {
					if (!token) return price_type === "REGULER"
					return price_type.toLowerCase() === typeRemark.toLowerCase()
				})[0]
				return { ...item, product_price: price }
			})
			return { ...state, searchList: items, loading: false }

		case types.DELETE_WISHLIST_ITEM:
			return { ...state, loading: false }
		case types.DELETE_WISHLIST_ITEM_ERROR:
			return { ...state, wishlistError: action.payload, loading: false }
		case types.FETCH_WISHLIST_ITEMS_ERROR:
			return { ...state, wishlistError: action.payload, loading: false }
		case types.ADD_ITEM_TO_WISHLIST_ERROR:
			return { ...state, wishlistError: action.payload, loading: false }
		case types.SEARCH_PRODUCT_ERROR:
			return { ...state, searchError: action.payload, loading: false }
		case types.ADD_RATING_ERROR:
			return { ...state, productError: action.payload, loading: false }
		case types.FETCH_CART_ITEMS_ERROR:
			return { ...state, cartError: action.payload, loading: false }
		case types.UPDATE_CART_ITEM_ERROR:
			return { ...state, cartError: action.payload, loading: false }
		case types.DELETE_CART_ITEM_ERROR:
			return { ...state, cartError: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
