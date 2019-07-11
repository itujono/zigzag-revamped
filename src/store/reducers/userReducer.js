import * as types from "../types"

const initialState = {
	user: null
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_USER:
			return { ...state, user: "Gunawan Sasongko" }
		default:
			return state
	}
}

export default reducer
