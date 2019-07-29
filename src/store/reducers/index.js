import { combineReducers } from "redux"
import userReducer from "./userReducer.js"
import productReducer from "./productReducer.js"

const appReducer = combineReducers({
	user: userReducer,
	product: productReducer
})

export const rootReducer = (state, action) => {
	return appReducer(state, action)
}
