import React from "react"
import { Button as Buttonee } from "antd"
import styled from "styled-components"

const StyledButton = styled(Buttonee)`
	transition: all 0.1s ease;
`

function Button(props) {
	return <StyledButton {...props} />
}

export default Button
