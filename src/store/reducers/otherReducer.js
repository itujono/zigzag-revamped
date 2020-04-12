import * as types from "../types"
import { ID_AKUN_KOKO } from "helpers/constants"

const initial = {
	cartDrawer: false,
	orderCodeList: [],
	bankAccounts: [],
	courierDetails: {},
	saveOrderError: null,
	saveCourierDetailsError: null,
	orderHistory: [],
	orderCodeOptions: [],
	orderHistoryError: null,
	cancelOrderError: null,
	orderConfirmationError: null
}

function reducer(state = initial, action) {
	switch (action.type) {
		case types.LOADING_OTHER:
			return { ...state, loading: true }
		case types.SET_CART_DRAWER_FROM_STORE:
			return { ...state, cartDrawer: action.payload, loading: false }

		case types.FETCH_ORDER_CODE_LIST:
			const orderCodeOptions = action.payload.map(({ order_code }) => ({ value: order_code, label: order_code }))
			return { ...state, orderCodeList: action.payload, orderCodeOptions, loading: false }

		case types.FETCH_BANK_ACCOUNTS:
			return {
				...state,
				bankAccounts: action.payload,
				bankAccountOptions: action.payload.map((item) => ({
					value: `${item.bank_name} ${item.bank_account}`,
					label: `${item.bank_name} ${item.bank_account} an ${item.under_name}`
				})),
				loading: false
			}
		case types.SAVE_COURIER_DETAILS:
			return { ...state, courierDetails: action.payload, loading: false }
		case types.SAVE_ORDER:
			return { ...state, orderDetails: action.payload, loading: false }
		case types.ORDER_CONFIRMATION:
			return { ...state, loading: false }
		case types.CANCEL_ORDER:
			return { ...state, cancelOrder: action.payload, loading: false }
		case types.CANCEL_ORDER_ERROR:
			return { ...state, cancelOrderError: action.payload, loading: false }

		case types.FETCH_ORDER_HISTORY: {
			const orderHistory = action.payload
				.sort((a, b) => Date.parse(b.created_date) - Date.parse(a.created_date))
				.map((item) => {
					const { customers, orders_detail } = item

					if (customers.id === ID_AKUN_KOKO) {
						return {
							...item,
							orders_detail: orders_detail.map((detail) => ({
								...detail,
								product_price: "-",
								product_total_price: "-"
							}))
						}
					}

					return item
				})
			return { ...state, orderHistory, loading: false }
		}

		case types.FETCH_ORDER_HISTORY_ERROR:
			return { ...state, orderHistoryError: action.payload, loading: false }
		case types.SAVE_COURIER_DETAILS_ERROR:
			return { ...state, saveCourierDetailsError: action.payload, loading: false }
		case types.ORDER_CONFIRMATION_ERROR:
			return { ...state, orderConfirmationError: action.payload, loading: false }
		case types.SAVE_ORDER_ERROR:
			return { ...state, saveOrderError: action.payload, loading: false }
		case types.FETCH_CUSTOMER_SERVICES:
			return {
				...state,
				cs: action.payload,
				csOptions: action.payload.map((item) => ({
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
