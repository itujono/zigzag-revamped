import React from "react"
import { Button as _Button } from "antd"
import styled from "styled-components"

const StyledButton = styled(_Button)`
	transition: all 0.1s ease;
`

export default function Button(props) {
	return <StyledButton {...props} />
}
