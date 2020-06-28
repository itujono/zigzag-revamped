import React from "react"
import { Select, FormItem, AutoComplete } from "formik-antd"
import styled from "styled-components"

const Item = styled(FormItem)`
	&& {
		margin-bottom: 1em;
		width: 100%;
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

function SelectInput({ reverse, options, helpText, autocomplete, allowClear = true, ...props }) {
	return (
		<Item name={props.name} reverse={reverse} label={props.label}>
			{autocomplete ? (
				<AutoComplete
					{...props}
					allowClear={allowClear}
					name={props.name}
					dataSource={options}
					filterOption={(inputValue, option) => {
						const child = option.props.children || ""
						return child.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}}
				/>
			) : (
				<Select {...props}>
					{options &&
						options.map((item) => (
							<Select.Option key={item.value} value={item.value}>
								{item.label}
							</Select.Option>
						))}
				</Select>
			)}
			{helpText && <p className="help-text">{helpText}</p>}
		</Item>
	)
}

export default SelectInput
