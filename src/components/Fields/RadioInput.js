import React from "react"
import { Radio, FormItem } from "formik-antd"

export default function RadioInput({ options, ...props }) {
	return (
		<FormItem name={props.name} label={props.label}>
			<Radio.Group {...props} buttonStyle="solid">
				{(options || []).map(item => (
					<Radio.Button value={item.value} key={item.value}>
						{item.label}
					</Radio.Button>
				))}
			</Radio.Group>
		</FormItem>
	)
}
