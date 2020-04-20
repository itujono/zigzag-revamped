import { useEffect } from "react"
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
