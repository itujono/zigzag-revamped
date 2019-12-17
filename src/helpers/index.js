import axios from "axios"
import { useState } from "react"
import { css } from "styled-components"
import { useHistory } from "react-router-dom"
import { unauthUser } from "store/actions/authActions"
import { message } from "antd"
import { FETCH_USER } from "store/types"

const instance = axios.create({
	baseURL: "https://zigzagbatam.com:9000/api/v1/frontend",
	headers: {
		api_key: "3c72dde0-c72f-ZIGZAG-4656-8143-ee95e52f58b4",
		Accept: "*/*"
	}
})

instance.interceptors.request.use(config => {
	config.headers["x-access-token"] = localStorage.getItem("access_token")
	return config
})

export { instance }

/////////////////////////////////

export const akunKoko = 40

export const randomCode = () => Math.floor(Math.random() * (100 - 10)) + 10

export function useRenderError(err, dispatch, type, noShow = false) {
	const errResponse = err.response || {}
	console.error(errResponse)
	const error = (errResponse.data || {}).message || ""
	if (error) {
		if (noShow) console.log({ error })
		else message.error(error)
	}
	if (errResponse.status === 401) {
		localStorage.clear()
		// dispatch({ type: LOGOU })
	}

	dispatch({ type, payload: error })
	return error
}

export function useFetchData(url, param) {
	const [data, setData] = useState([])

	instance.get(url, param).then(res => {
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

export const upperCase = word => word && word[0].toUpperCase() + word.slice(1)

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
