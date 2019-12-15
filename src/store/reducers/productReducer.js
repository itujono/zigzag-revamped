import * as types from "../types"
import { akunKoko } from "helpers"

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

const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
const { account_type_remark: typeRemark } = accountType
const token = localStorage.getItem("access_token")
const userId = Number(localStorage.getItem("user_id"))
// const formData = JSON.parse(localStorage.getItem("formData")) || {}

const renderPrice = productPrice => {
	const price = productPrice.filter(({ price_type }) => {
		if (!token || userId === akunKoko) return price_type === "REGULER"
		return price_type.toLowerCase() === typeRemark.toLowerCase()
	})[0]
	return { product_price: price }
}

const roundupWeight = number => {
	let prefix = number.slice(0, number.length - 3)
	let suffix = number.slice(-3)
	if (Number(suffix[0]) > 3) {
		prefix = Number(prefix) + 1
		suffix = "000"
	}
	const result = prefix + suffix
	return Number(result)
}

const getDiscount = (cartItems = [], qty) => {
	let discount = 0

	if (typeRemark.toLowerCase() === "reguler") {
		if (qty > 2) {
			const itemsNotPromo = cartItems.filter(item => item.promo === 0)
			discount = 10000 * itemsNotPromo.length
		}
	}

	return discount
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.LOADING_PRODUCT:
			return { ...state, loading: true }
		case types.FETCH_PRODUCT_ITEM:
			const productPrice = action.payload.product_price
				.filter(({ price_type }) => {
					if (!token || userId === akunKoko) return price_type === "REGULER"
					return price_type.toLowerCase() === typeRemark.toLowerCase()
				})
				.map(({ price }) => price)[0]

			return { ...state, product: action.payload, productPrice, loading: false }

		case types.FETCH_PRODUCTS:
			const products = action.payload.map(item => {
				const { product_price } = renderPrice(item.product_price)
				return { ...item, product_price }
			})

			return { ...state, products, loading: false }

		case types.FETCH_RESTOCK_PRODUCTS:
			return { ...state, restockProducts: action.payload, loading: false }
		case types.FETCH_PRODUCT_CATEGORIES:
			return { ...state, categories: action.payload, loading: false }

		case types.FETCH_CART_ITEMS:
			const cartItems = action.payload.map(({ product_data, ...item }) => {
				const { product_price } = renderPrice(product_data.product_price)
				return {
					...item,
					weight_per_pcs: (product_data.products || {}).weight_per_pcs,
					product_id: (product_data.products || {}).id,
					product_data: { ...product_data, product_price }
				}
			})
			const totalPrice = action.payload.map(item => item.total_price).reduce((acc, curr) => acc + curr, 0)
			const totalWeight = action.payload
				.map(({ qty, product_data }) => {
					const weight_per_pcs = (product_data.products || {}).weight_per_pcs
					return weight_per_pcs * Number(qty)
				})
				.reduce((acc, curr) => acc + curr, 0)
			const totalQty = action.payload.map(item => Number(item.qty)).reduce((acc, curr) => acc + curr, 0)
			const roundedWeight = roundupWeight(String(totalWeight))
			const discount = getDiscount(cartItems, totalQty)

			return {
				...state,
				cartItems,
				cartTotal: { price: totalPrice, weight: totalWeight, discount, qty: totalQty, roundedWeight },
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
				const { product_price } = renderPrice(item.product_price)
				return { ...item, product_price }
			})
			return { ...state, wishlistItems: theItems, loading: false }

		case types.ADD_ITEM_TO_WISHLIST:
			return { ...state, loading: false }

		case types.SEARCH_PRODUCT:
			const items = action.payload.map(item => {
				const { product_price } = renderPrice(item.product_price)
				return { ...item, product_price }
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
