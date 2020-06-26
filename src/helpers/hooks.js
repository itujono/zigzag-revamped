import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "store/actions/userActions"

export function useUserDetails() {
	const dispatch = useDispatch()
	const data = useSelector(({ user }) => user.user)

	useEffect(() => {
		dispatch(fetchUser())
	}, [])

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
