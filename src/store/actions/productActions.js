import * as types from "../types"
import { instance } from "helpers"

const loadingProduct = condition => ({ type: types.LOADING_PRODUCT, payload: condition })

export const fetchProductItem = id => async dispatch => {
	dispatch(loadingProduct())
	try {
		const response = await instance.get(`product/detail/${id}`)
		dispatch({ type: types.FETCH_PRODUCT_ITEM, payload: response.data.result })
	} catch (err) {
		return console.error(err.response)
	}
}

export const fetchProducts = (category = 1, limit = 10) => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/product/list?category=${category}&limit=${limit}`)
		.then(response => dispatch({ type: types.FETCH_PRODUCTS, payload: response.data.result }))
		.catch(err => console.error(err.response))
}

export const fetchProductCategories = () => dispatch => {
	dispatch(loadingProduct())
	instance
		.get(`/category/list`)
		.then(({ data }) => dispatch({ type: types.FETCH_PRODUCT_CATEGORIES, payload: data.data.category_data }))
		.catch(err => console.error(err.response))
}

// export const fetchProducts = (category = 1, limit = 0) => dispatch => {
// 	dispatch(loadingProduct())
// 	instance
// 		.get(`product/list?category=${category}&limit=${limit}`)
// 		.then(response => {
// 			dispatch({ type: types.FETCH_PRODUCTS, payload: response.data.result })
// 		})
// 		.catch(err => console.error(err.response))
// }
