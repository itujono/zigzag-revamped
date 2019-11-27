import React from "react"
import { Select, FormItem } from "formik-antd"
import styled from "styled-components"

const Item = styled(FormItem)`
	&& {
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

function SelectInput({ reverse, options, helpText, ...props }) {
	return (
		<Item name={props.name} reverse={reverse} label={props.label}>
			<Select {...props}>
				{options &&
					options.map(item => (
						<Select.Option key={item.value} value={item.value}>
							{item.label}
						</Select.Option>
					))}
			</Select>
			{helpText && <p className="help-text">{helpText}</p>}
		</Item>
	)
}

export default SelectInput
