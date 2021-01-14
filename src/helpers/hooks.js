import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "store/actions/userActions"
import Axios from "axios"

export function useUserDetails() {
	const dispatch = useDispatch()
	const data = useSelector(({ user }) => user.user)

	useEffect(() => {
		dispatch(fetchUser())
	}, [dispatch])

	return data
}

const createKeyChecker = (hotkeys = []) => {
	let index = 0
	const TAIL = hotkeys.length - 1

	return (key) => {
		if (key !== hotkeys[index]) {
			index = 0
			return false
		}

		if (index === TAIL) {
			index = 0
			return true
		}

		index++
		return false
	}
}

export function useHotKey(hotKeys, onMatch) {
	const keyCrawler = React.useMemo(() => createKeyChecker([].concat(hotKeys)), [hotKeys])

	const listen = ({ key }) => {
		if (keyCrawler(key)) {
			onMatch()
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", listen)
		return () => window.removeEventListener("keydown", listen)
	})
}

export const useUserIp = () => {
	const [userIp, setUserIp] = useState({})

	const fetchUserIp = async () => {
		const ipAddress = await Axios.get(`https://json.geoiplookup.io/`).then((res) => res.data)
		setUserIp(ipAddress)
	}

	useEffect(() => {
		fetchUserIp()
	}, [])

	return userIp
}

export function useDebounce(value, delay = 800) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(
		() => {
			const handler = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)
			return () => {
				clearTimeout(handler)
			}
		},
		[value, delay] // Only re-call effect if value or delay changes
	)

	return debouncedValue
}
