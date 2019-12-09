import * as types from "../types"
import { instance, useRenderError } from "helpers"
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
		.then(({ data }) => {
			dispatch({ type: types.FETCH_CART_ITEMS, payload: data.data.cart_data })
		})
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.ADD_ITEM_TO_CART_ERROR, payload: error })
		})
}

export const addItemToCart = item => dispatch => {
	dispatch(loadingProduct())
	instance
		.post(`/cart/save`, item)
		.then(({ data }) => dispatch({ type: types.ADD_ITEM_TO_CART, payload: data }))
		.then(() => dispatch(fetchCartItems()))
		.then(() => message.success("Produk berhasil ditambahkan ke cart"))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.ADD_ITEM_TO_CART_ERROR, payload: error })
		})
}

export const updateCartItem = ({ cart_id, qty, weight, total_price }) => dispatch => {
	dispatch(loadingProduct())
	instance
		.put(`/cart/update?cart_id=${cart_id}&qty=${qty}&weight=${weight}&total_price=${total_price}`)
		.then(({ data }) => dispatch({ type: types.UPDATE_CART_ITEM, payload: data }))
		.then(() => dispatch(fetchCartItems()))
		.then(() => message.success("Produk berhasil diupdate"))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.UPDATE_CART_ITEM_ERROR, payload: error })
		})
}

export const addItemToWishlist = item => dispatch => {
	dispatch(loadingProduct())
	instance
		.post(`/customer/save_wishlist`, item)
		.then(({ data }) => {
			console.log({ wishlistData: data })
			dispatch({ type: types.ADD_ITEM_TO_WISHLIST, payload: data.data })
		})
		.then(() => message.success("Produk ini sudah ditambahkan ke wishlist kamu"))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.ADD_ITEM_TO_WISHLIST_ERROR, payload: error })
		})
}

export const fetchWishlistItems = () => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/customer/wishlist`)
		.then(({ data }) => {
			console.log({ wishlistData: data })
			dispatch({ type: types.FETCH_WISHLIST_ITEMS, payload: data.data.wishlist_data })
		})
		.catch(err => {
			useRenderError(err, dispatch, types.FETCH_WISHLIST_ITEMS_ERROR)
		})
}

export const deleteWishlistItem = id => dispatch => {
	dispatch(loadingProduct())
	instance
		.delete(`/customer/delete_wishlist?wishlist_id=${id}`)
		.then(({ data }) => {
			console.log({ wishlistDeleted: data })
			dispatch({ type: types.DELETE_WISHLIST_ITEM, payload: data.data })
		})
		.then(() => dispatch(fetchWishlistItems()))
		.then(() => message.success("Produk ini berhasil dihapus dari Wishlist"))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.DELETE_WISHLIST_ITEM_ERROR, payload: error })
		})
}

export const searchProduct = query => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/product/search?find=${query}`)
		.then(({ data }) => {
			console.log({ searchData: data })
			dispatch({ type: types.SEARCH_PRODUCT, payload: data.data.product_search.rows })
		})
		.catch(err => useRenderError(err, dispatch, types.SEARCH_PRODUCT_ERROR))
}

export const addRating = (id, rate) => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/product/save_rating?product_id=${id}&rating=${rate}`)
		.then(({ data }) => {
			console.log({ rateData: data })
			dispatch({ type: types.ADD_RATING, payload: data.data })
		})
		.then(() => dispatch(fetchProductItem(id)))
		.then(() => message.success("Kamu sudah berhasil kasih rating. Terima kasih! :)"))
		.catch(err => {
			const error = (err.response.data || {}).message || ""
			if (err.response) {
				message.error(error)
			}
			dispatch({ type: types.ADD_RATING_ERROR, payload: error })
		})
}
