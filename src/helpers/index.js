import axios from "axios"
import { useState, useEffect } from "react"
import { css } from "styled-components"
import createActivityDetector from "activity-detector"

import { unauthUser } from "store/actions/authActions"
import { message } from "antd"
import { TEXT_STOCK_HABIS } from "./constants"
import { useLocation } from "react-router"
// import { FETCH_USER } from "store/types"

const instance = axios.create({
	baseURL: "https://zigzagbatam.com:9000/api/v1/frontend",
	headers: {
		api_key: "3c72dde0-c72f-ZIGZAG-4656-8143-ee95e52f58b4",
		Accept: "*/*"
	}
})

instance.interceptors.request.use((config) => {
	config.headers["x-access-token"] = localStorage.getItem("access_token")
	return config
})

export { instance }

/////////////////////////////////

export default function ScrollToTop() {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

export const shareToSocialMedia = ({ title, text, url }, setModal) => {
	if (navigator.share) {
		navigator
			.share({ title, text, url })
			.then(() => message.success("Oke, sudah berhasil di-share"))
			.catch((err) => message.error("Oops, ada sesuatu nih: ", err))
			.finally(() => setModal(false))
		return
	}

	message.error("Oops ada sesuatu nih heheh...")
}

export const randomCode = () => Math.floor(Math.random() * (100 - 10)) + 10

export const isOutOfStock = (product_detail = []) => {
	return product_detail
		.map((item) => item.product_stock.every((item) => item.stock === TEXT_STOCK_HABIS))
		.every((item) => Boolean(item))
}

export function renderError(err, dispatch, type, noShow = false) {
	const errResponse = err.response || {}
	const error = (errResponse.data || {}).message || ""

	if (localStorage.getItem("access_token") && errResponse.status === 401) {
		localStorage.clear()
		dispatch(unauthUser())
		return
	}

	if (error) {
		if (noShow) return
		else message.error(error)
	}

	dispatch({ type, payload: error })
	return error
}

export function useIdle(options) {
	const [isIdle, setIsIdle] = useState(false)

	useEffect(() => {
		const activityDetector = createActivityDetector(options)
		activityDetector.on("idle", () => setIsIdle(true))
		activityDetector.on("active", () => setIsIdle(false))
		return () => activityDetector.stop()
	}, [options])

	return isIdle
}

export function useFetchData(url, param) {
	const [data, setData] = useState([])

	instance.get(url, param).then((res) => {
		setData(res.data)
	})

	return data
}

export const pricer = (price, withComma = false) => {
	const theValue = new Intl.NumberFormat("id-ID", {
		currency: "IDR"
	}).format(price)

	if (withComma) return theValue + ",00"
	return theValue
}

export const upperCase = (word) => word && word[0].toUpperCase() + word.slice(1)

// Media queries Styled-Components
const sizes = {
	tablet: 767,
	mobile: 414
}

export const media = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label]}px) {
			${css(...args)};
		}
	`
	return acc
}, {})

export const mobile = window.innerWidth < 415
export const tablet = window.innerWidth > 414 && window.innerWidth < 769
