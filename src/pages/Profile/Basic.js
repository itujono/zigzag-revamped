import React from "react"
import { Section, Heading } from "components"
import { Formik } from "formik"
import { TextInput } from "components/Fields"
import { Form } from "antd"
import { SubmitButton } from "@jbuschke/formik-antd"

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 14 }
	}
}

const tailLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 6
		}
	}
}

function Basic() {
	return (
		<Section width="70%" centered>
			<Heading content="Basic" bold />
			<Formik
				render={({ handleSubmit }) => (
					<Form {...formItemLayout} onSubmit={handleSubmit}>
						<TextInput name="first_name" label="Nama depan" placeholder="Nama depan kamu..." />
						<TextInput name="last_name" label="Nama belakang" placeholder="Nama belakang kamu..." />
						<TextInput type="email" name="email" label="Email" placeholder="Email kamu..." />
						<Form.Item {...tailLayout}>
							<SubmitButton type="primary">Ubah detail</SubmitButton>
						</Form.Item>
					</Form>
				)}
			/>
		</Section>
	)
}

export default Basic
