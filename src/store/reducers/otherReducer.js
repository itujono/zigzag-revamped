import * as types from "../types"

const initial = {
	cartDrawer: false,
	orderCodeList: [],
	bankAccounts: [],
	courierDetails: {},
	saveOrderError: null,
	saveCourierDetailsError: null,
	orderHistory: [],
	orderHistoryError: null
}

function reducer(state = initial, action) {
	switch (action.type) {
		case types.LOADING_OTHER:
			return { ...state, loading: true }
		case types.SET_CART_DRAWER_FROM_STORE:
			return { ...state, cartDrawer: action.payload, loading: false }
		case types.FETCH_ORDER_CODE_LIST:
			return { ...state, orderCodeList: action.payload, loading: false }
		case types.FETCH_BANK_ACCOUNTS:
			return {
				...state,
				bankAccounts: action.payload,
				bankAccountOptions: action.payload.map(item => ({
					value: `${item.bank_name} ${item.bank_account}`,
					label: `${item.bank_name} ${item.bank_account} an ${item.under_name}`
				})),
				loading: false
			}
		case types.SAVE_COURIER_DETAILS:
			return { ...state, courierDetails: action.payload, loading: false }
		case types.SAVE_ORDER:
			return { ...state, orderDetails: action.payload, loading: false }
		case types.FETCH_ORDER_HISTORY:
			return { ...state, orderHistory: action.payload, loading: false }
		case types.FETCH_ORDER_HISTORY_ERROR:
			return { ...state, orderHistoryError: action.payload, loading: false }
		case types.SAVE_COURIER_DETAILS_ERROR:
			return { ...state, saveCourierDetailsError: action.payload, loading: false }
		case types.SAVE_ORDER_ERROR:
			return { ...state, saveOrderError: action.payload, loading: false }
		case types.FETCH_CUSTOMER_SERVICES:
			return {
				...state,
				cs: action.payload,
				csOptions: action.payload.map(item => ({
					value: item.id,
					label: `${item.name} - Whatsapp: ${item.whatsapp}, Line: ${item.line}`
				})),
				loading: false
			}
		default:
			return state
	}
}

export default reducer
