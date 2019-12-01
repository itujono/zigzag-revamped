import React from "react"
import { DatePicker, FormItem } from "formik-antd"

export default function DateInput(props) {
	return (
		<FormItem name={props.name} label={props.label}>
			<DatePicker {...props} style={{ width: "100%" }} />
		</FormItem>
	)
}
