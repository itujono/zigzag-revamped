import React from "react"
import Draw from "antd/lib/drawer"
import styled from "styled-components"

const StyledDrawer = styled(Draw)`
	padding: 3em;
	padding-top: 0;
`

export default function Drawer(props) {
	return <StyledDrawer {...props} />
}
