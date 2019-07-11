import React from "react"
import { Link } from "react-router-dom"
import logo from "assets/images/zigzag-logo.png"

function Logo({ width }) {
	return (
		<Link to="/">
			<img src={logo} width={width || "40"} alt="Logo Zigzag" />
		</Link>
	)
}

export default Logo
