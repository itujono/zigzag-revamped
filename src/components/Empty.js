import React from "react"
import EmptyComp from "antd/lib/empty"
import { Link } from "react-router-dom"
import Button from "./Button"

export default function Empty({ isEmptyItems, button = {}, ...props }) {
	const { to = "/", text = "Belanja sekarang" } = button

	if (isEmptyItems)
		return (
			<div style={{ marginBottom: "2em" }}>
				<Empty {...props} style={{ marginBottom: "2em" }} />
				<Link to={to}>
					<Button>{text}</Button>
				</Link>
			</div>
		)

	return <EmptyComp {...props} />
}
