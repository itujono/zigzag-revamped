import * as types from "../types"
import { instance } from "helpers"
import { message } from "antd"

const loadingProduct = condition => ({ type: types.LOADING_PRODUCT, payload: condition })

export const fetchProductItem = id => async dispatch => {
	dispatch(loadingProduct())
	try {
		const response = await instance.get(`product/view`, { params: { product_id: id } })
		dispatch({ type: types.FETCH_PRODUCT_ITEM, payload: response.data.data.product_data })
	} catch (err) {
		return console.error(err.response)
	}
}

export const fetchProducts = (category = 0, limit = 10) => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/product/list?category=${category}&limit=${limit}`)
		.then(({ data }) => dispatch({ type: types.FETCH_PRODUCTS, payload: data.data.product_data }))
		.catch(err => console.error(err.response))
}

export const fetchRestockProducts = (category = 0, limit = 10, restock = 1) => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/product/list?category=${category}&limit=${limit}&restock=${restock}`)
		.then(({ data }) => dispatch({ type: types.FETCH_RESTOCK_PRODUCTS, payload: data.data.product_data }))
		.catch(err => console.error(err.response))
}

export const fetchProductCategories = () => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/category/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_PRODUCT_CATEGORIES, payload: data.data.category_data }))
		.catch(err => console.error(err.response))
}

export const fetchCartItems = () => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/cart/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_CART_ITEMS, payload: data.data.category_data }))
		.catch(err => console.error(err.response))
}

export const addItemToCart = item => dispatch => {
	dispatch(loadingProduct())
	instance
		.post(`/cart/save`, item)
		.then(({ data }) => dispatch({ type: types.ADD_ITEM_TO_CART, payload: data }))
		.then(() => message.success("Produk berhasil ditambahkan ke cart"))
		.then(() => dispatch({ type: types.FETCH_CART_ITEMS }))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.ADD_ITEM_TO_CART_ERROR, payload: error })
		})
}
