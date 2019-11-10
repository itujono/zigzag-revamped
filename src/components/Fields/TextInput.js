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
			line-height: 1.4;
			margin-top: 10px;
		}
	}
`

function TextInput({ helpText, ...props }) {
	return (
		<FormItem name={props.name} style={props.style} reverse={props.reverse} label={props.label}>
			{props.textarea ? (
				<>
					<Input.TextArea {...props} />
					{helpText && <p className="help-text">{helpText}</p>}
				</>
			) : props.number ? (
				<>
					<InputNumber {...props} />
					{helpText && <p className="help-text">{helpText}</p>}
				</>
			) : props.password ? (
				<>
					<Input.Password {...props} />
					{helpText && <p className="help-text">{helpText}</p>}
				</>
			) : (
				<>
					<Input {...props} />
					{helpText && <p className="help-text">{helpText}</p>}
				</>
			)}
		</FormItem>
	)
}

export default TextInput
