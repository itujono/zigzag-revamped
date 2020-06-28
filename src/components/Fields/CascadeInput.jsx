import React from "react"
import { FormItem as _FormItem, Cascader } from "formik-antd"
import styled from "styled-components"

const FormItem = styled(_FormItem)`
	position: relative;
	width: ${({ width }) => width || "100%"};
`

export default function CascadeInput({ name, label, options = [], ...props }) {
	return (
		<FormItem name={name} label={label}>
			<Cascader {...props} name={name} options={options} />
		</FormItem>
	)
}
