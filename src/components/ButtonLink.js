import React from "react"
import { Button } from "antd"
import styled from "styled-components"

const StyledButton = styled(Button)`
	transition: 0ms;
	margin-right: 8px;
	&:hover {
		background: #e9e9e9;
		border-radius: 5px;
		color: #777;
		a {
			color: rgba(0, 0, 0, 0.35);
		}
	}
`

function ButtonLink({ children, ...props }) {
	return (
		<StyledButton {...props} type="link">
			{children}
		</StyledButton>
	)
}

export default ButtonLink