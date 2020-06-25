import * as types from "../types"
import { ID_AKUN_KOKO, TEXT_FEATURED, Discount } from "helpers/constants"

const initialState = {
	user: {},
	categories: [],
	categoryOptions: [],
	products: [],
	restockProducts: [],
	loading: false,
	loadingCart: false,
	product: {},
	productPrice: 0,
	cartItems: [],
	cartTotal: {},
	cartTotalKoko: {},
	wishlistItems: [],
	searchList: [],
	promoProducts: [],

	productsError: null,
	wishlistError: null,
	searchError: null,
	productError: null,
	cartError: null,
	promoProductsError: null,
	productCategoriesError: null
}

const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
const { account_type_remark: typeRemark } = accountType
const token = localStorage.getItem("access_token")
const userId = Number(localStorage.getItem("user_id"))

const renderPrice = (productPrice) => {
	const price = productPrice.filter(({ price_type }) => {
		if (!token || userId === ID_AKUN_KOKO) return price_type === "REGULER"
		return price_type.toLowerCase() === typeRemark.toLowerCase()
	})[0]
	return { product_price: price }
}

const roundupWeight = (number) => {
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
		const itemsNotPromo = cartItems.filter(({ product_data }) => product_data.is_promo === 0)
		const discountAmount = qty > 19 ? Discount.MORE_THAN_19 : qty > 2 && qty < 20 ? Discount.NORMAL : 0
		discount = discountAmount * itemsNotPromo.reduce((acc, curr) => acc + Number(curr.product_qty), 0)
	}

	return discount
}

const sortImages = (product_image = []) =>
	product_image.sort((a, b) => {
		const FEATURED = TEXT_FEATURED.toLowerCase()
		const aCaption = a.caption.toLowerCase()
		const bCaption = b.caption.toLowerCase()
		return aCaption.includes(FEATURED) ? -1 : bCaption.includes(FEATURED) ? 1 : 0
	})

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.LOADING_PRODUCT:
			return { ...state, loading: true }
		case types.LOADING_CART:
			return { ...state, loadingCart: true }

		case types.FETCH_PRODUCT_ITEM:
			const productPrice = action.payload.product_price
				.filter(({ price_type }) => {
					if (!token || userId === ID_AKUN_KOKO) return price_type === "REGULER"
					return price_type.toLowerCase() === typeRemark.toLowerCase()
				})
				.map(({ price }) => price)[0]

			const imagesSorted = sortImages(action.payload.product_image)

			return {
				...state,
				product: { ...action.payload, product_image: imagesSorted },
				productPrice,
				loading: false
			}

		case types.FETCH_PRODUCTS:
			const products = action.payload.map((item) => {
				const { product_price } = renderPrice(item.product_price)
				const product_image = sortImages(item.product_image)
				return { ...item, product_price, product_image }
			})
			return { ...state, products, loading: false }

		case types.FETCH_RESTOCK_PRODUCTS:
			const restockProducts = action.payload.map((item) => {
				const { product_price } = renderPrice(item.product_price)
				return { ...item, product_price }
			})
			return { ...state, restockProducts, loading: false }

		case types.FETCH_PROMO_PRODUCTS:
			const promoProducts = action.payload.map((item) => {
				const { product_price } = renderPrice(item.product_price)
				return { ...item, product_price }
			})
			return { ...state, promoProducts, loading: false }

		case types.FETCH_PRODUCT_CATEGORIES:
			const categoryOptions = action.payload.map(({ id, name }) => ({ value: id, label: name }))
			return { ...state, categories: action.payload, categoryOptions, loading: false }

		case types.FETCH_CART_ITEMS:
			const cartItems = action.payload.map(({ product_data, product_id, ...item }) => {
				const { product_price } = renderPrice(item.product_price)
				return {
					...item,
					product_id,
					product_data,
					product_price,
					product_price_pokok: item.product_price.find((item) => item.price_type === "POKOK") || {},
					weight_per_pcs: product_data.weight_per_pcs
				}
			})
			const totalPrice = action.payload.reduce((acc, curr) => acc + curr.product_total_price, 0)
			const totalWeight = action.payload
				.map(({ product_qty, product_data }) => {
					const weight_per_pcs = product_data.weight_per_pcs
					return weight_per_pcs * Number(product_qty)
				})
				.reduce((acc, curr) => acc + curr, 0)
			const totalQty = action.payload.reduce((acc, curr) => acc + curr.product_qty, 0)
			const discount = getDiscount(cartItems, totalQty)
			const roundedWeight = roundupWeight(String(totalWeight))
			const cartTotal = { price: totalPrice, weight: totalWeight, discount, qty: totalQty, roundedWeight }
			const priceForKoko = action.payload
				.map((item) => {
					const product_price = item.product_price.find((price) => price.price_type === "POKOK")
					return product_price.price * item.product_qty
				})
				.reduce((acc, curr) => acc + curr, 0)

			return {
				...state,
				cartItems,
				cartTotal,
				cartTotalKoko: { ...cartTotal, price: priceForKoko },
				loadingCart: false
			}

		case types.ADD_ITEM_TO_CART:
			return { ...state, loadingCart: false }
		case types.UPDATE_CART_ITEM:
			return { ...state, loadingCart: false }
		case types.DELETE_CART_ITEM:
			return { ...state, loadingCart: false }
		case types.ADD_RATING:
			return { ...state, loading: false }

		case types.FETCH_WISHLIST_ITEMS:
			const theItems = action.payload.map((item) => {
				const { product_price } = renderPrice(item.product_price)
				return { ...item, product_price }
			})
			return { ...state, wishlistItems: theItems, loading: false }

		case types.ADD_ITEM_TO_WISHLIST:
			return { ...state, loading: false }

		case types.SEARCH_PRODUCT:
			const items = action.payload.map((item) => {
				const { product_price } = renderPrice(item.product_price)
				return { ...item, product_price }
			})
			return { ...state, searchList: items, loading: false }

		case types.DELETE_WISHLIST_ITEM:
			return { ...state, loading: false }

		case types.DELETE_WISHLIST_ITEM_ERROR:
			return { ...state, wishlistError: action.payload, loading: false }
		case types.FETCH_PRODUCTS_ERROR:
			console.log({ productsError: action.payload })
			return { ...state, productsError: action.payload, loading: false }
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
		case types.FETCH_PROMO_PRODUCTS_ERROR:
			return { ...state, promoProductsError: action.payload, loading: false }
		case types.FETCH_PRODUCT_CATEGORIES_ERROR:
			return { ...state, productCategoriesError: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
