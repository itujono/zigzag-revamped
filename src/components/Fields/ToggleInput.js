import React from "react"
import { Switch, FormItem } from "formik-antd"
import styled from "styled-components"

const FItem = styled(FormItem)`
	&& {
		.ant-form-item-label {
			label {
				font-size: ${({ reverse }) => reverse && "11px"};
				color: ${({ reverse }) => reverse && "#bbb"};
				text-transform: ${({ reverse }) => reverse && "uppercase"};
				line-height: ${({ reverse }) => reverse && "1.4"};
			}
		}
	}
`

function ToggleInput({ name, label, helpText = "", ...props }) {
	return (
		<FItem name={name} reverse={props.reverse} label={label}>
			<Switch name={name} {...props} /> &nbsp; {helpText}
		</FItem>
	)
}

export default ToggleInput
