import { combineReducers } from "redux"
import userReducer from "./userReducer.js"
import productReducer from "./productReducer.js"
import rajaOngkirReducer from "./rajaOngkirReducer.js"

const appReducer = combineReducers({
	user: userReducer,
	product: productReducer,
	rajaOngkir: rajaOngkirReducer
})

export const rootReducer = (state, action) => {
	return appReducer(state, action)
}
