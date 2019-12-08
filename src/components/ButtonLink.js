import React from "react"
import { Button } from "antd"
import styled from "styled-components"
import { theme } from "styles"

const StyledButton = styled(Button)`
	&& {
		transition: 0ms;
		margin-right: 8px;
		color: #777;
		background-color: ${theme.greyColor[4]};
		&:hover {
			background: ${theme.greyColor[3]};
			border-radius: 5px;
			color: #777;
			a {
				color: rgba(0, 0, 0, 0.35);
			}
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
