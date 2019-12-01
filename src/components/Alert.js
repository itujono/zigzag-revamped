import React from "react"
import Notif from "antd/lib/alert"
import styled from "styled-components"

const StyledAlert = styled(Notif)`
	&& {
		margin-bottom: 2em;
	}
`

export default function Alert(props) {
	return <StyledAlert {...props} />
}
