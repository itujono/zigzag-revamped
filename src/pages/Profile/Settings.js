import React from "react"
import { Section, Heading } from "components"
import { TextInput } from "components/Fields"
import { Tabs, Form, Row, Col, Divider } from "antd"
import * as yup from "yup"
import { connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"
import { SubmitButton, ResetButton } from "formik-antd"
import { changeProfilePassword } from "store/actions/userActions"

const Tab = styled(Tabs)`
	.ant-tabs-bar {
		margin-bottom: 4em;
	}
`

function Settings({ changeProfilePassword, loading }) {
	const handleChangePassword = (values, { setSubmitting }) => {
		const { new_password_confirmation, ...theValues } = values
		changeProfilePassword(theValues).then(() => setSubmitting(false))
	}

	return (
		<Section width="70%" centered>
			<Heading content="Settings" bold />
			<Tab>
				<Tabs.TabPane key="change-password" tab="Ubah password">
					<Row>
						<Col lg={10}>
							<Formik
								onSubmit={handleChangePassword}
								validationSchema={validationSchema}
								initialValues={{ new_password_confirmation: "", new_password: "", old_password: "" }}
								render={({ handleSubmit }) => (
									<Form layout="vertical" onSubmit={handleSubmit}>
										<TextInput
											password
											name="new_password"
											label="Masukkan password baru kamu"
											placeholder="Eheheh..."
										/>
										<TextInput
											password
											name="new_password_confirmation"
											label="Ulangi password baru kamu"
											placeholder="Eheheh..."
										/>
										<TextInput
											password
											name="old_password"
											label="Masukkan password lama kamu"
											placeholder="Eheheh..."
										/>
										<Divider />
										<SubmitButton type="primary" icon="check" loading={loading}>
											Ubah password sekarang
										</SubmitButton>{" "}
										&nbsp; <ResetButton type="link">Reset</ResetButton>
									</Form>
								)}
							/>
						</Col>
					</Row>
				</Tabs.TabPane>
			</Tab>
		</Section>
	)
}

const validationSchema = yup.object().shape({
	new_password: yup
		.string()
		.required("Jangan lupa password baru nya ya")
		.min(8, "Minimal 8 karakter ya"),
	new_password_confirmation: yup
		.string()
		.required("Ulangi password kamu di atas")
		.oneOf([yup.ref("new_password")], "Password ini harus sama dengan yang di atas"),
	old_password: yup.string().required("Jangan lupa isi password lama kamu ya")
})

// prettier-ignore
export default connect(({user}) => ({ loading: user.loading }), { changeProfilePassword } )(Settings)
