import React from "react"
import { FormItem as Item, Input, InputNumber } from "@jbuschke/formik-antd"
import styled from "styled-components"

const FormItem = styled(Item)`
	&& {
		margin-bottom: 1em;
		.ant-input-number,
		input {
			width: 100%;
		}
		.ant-input-prefix {
			color: rgba(0, 0, 0, 0.25);
		}
		.ant-form-item-label {
			label {
				font-size: ${({ reverse }) => reverse && "11px"};
				color: ${({ reverse }) => reverse && "#bbb"};
				text-transform: ${({ reverse }) => reverse && "uppercase"};
				line-height: ${({ reverse }) => reverse && "1.4"};
				font-weight: ${({ reverse }) => reverse && "600"};
			}
		}
		.help-text {
			font-size: 12px;
			color: #999;
		}
	}
`

function TextInput({ helpText, ...props }) {
	return (
		<FormItem name={props.name} style={props.style} reverse={props.reverse} label={props.label}>
			{props.textarea ? (
				<>
					<Input.TextArea {...props} />
					{helpText && <span className="help-text">{helpText}</span>}
				</>
			) : props.number ? (
				<>
					<InputNumber {...props} />
					{helpText && <span className="help-text">{helpText}</span>}
				</>
			) : props.password ? (
				<>
					<Input.Password {...props} />
					{helpText && <span className="help-text">{helpText}</span>}
				</>
			) : (
				<>
					<Input {...props} />
					{helpText && <span className="help-text">{helpText}</span>}
				</>
			)}
		</FormItem>
	)
}

export default TextInput
