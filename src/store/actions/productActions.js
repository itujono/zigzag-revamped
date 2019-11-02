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

export const fetchProducts = () => dispatch => {
	dispatch(loadingProduct())
	instance
		.get("product/list")
		.then(response => {
			dispatch({ type: types.FETCH_PRODUCTS, payload: response.data.result })
		})
		.catch(err => console.error(err.response))
}
