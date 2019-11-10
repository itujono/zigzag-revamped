import React from "react"
import { Button as Buttonee } from "antd"
import styled from "styled-components"
import { theme } from "styles"
import { SubmitButton } from "@jbuschke/formik-antd"

const StyledButton = styled(Buttonee).attrs(({ type, shape }) => ({
	type: type || "primary",
	shape: shape || "round"
}))`
	&& {
		transition: all 0.1s ease;
		background-color: ${({ type }) => type === "primary" && theme.color[0]};
		border-color: ${({ type }) => type === "primary" && theme.color[0]};
		&[disabled] {
			background-color: #f5f5f5;
			border-color: #d9d9d9;
		}
	}
`

const StyledSubmit = styled(SubmitButton).attrs(({ type, shape }) => ({
	type: type || "primary",
	shape: shape || "round"
}))`
	&& {
		transition: all 0.1s ease;
		background-color: ${({ type }) => type === "primary" && theme.color[0]};
		border-color: ${({ type }) => type === "primary" && theme.color[0]};
		&[disabled] {
			background-color: #f5f5f5;
			border-color: #d9d9d9;
		}
	}
`

function Button(props) {
	if (props.submit) return <StyledSubmit {...props} />
	return <StyledButton {...props} />
}

export default Button
