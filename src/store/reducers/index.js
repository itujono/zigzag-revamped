import { combineReducers } from "redux"
import userReducer from "./userReducer.js"
import productReducer from "./productReducer.js"
import rajaOngkirReducer from "./rajaOngkirReducer.js"
import authReducer from "./authReducer.js"
import otherReducer from "./otherReducer.js"

const appReducer = combineReducers({
	user: userReducer,
	product: productReducer,
	rajaOngkir: rajaOngkirReducer,
	auth: authReducer,
	other: otherReducer
})

export const rootReducer = (state, action) => {
	return appReducer(state, action)
}
