import React, { useEffect } from "react"
import { Section, Heading } from "components"
import { TextInput } from "components/Fields"
import { Tabs, Form, Row, Col, Divider } from "antd"
import { useSelector, useDispatch, connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"
import { SubmitButton, ResetButton } from "@jbuschke/formik-antd"
import { FETCH_PROVINCES } from "store/types"
import { fetchProvinces } from "store/actions/rajaOngkirActions"

const Tab = styled(Tabs)`
	.ant-tabs-bar {
		margin-bottom: 4em;
	}
`

function Settings({ fetchProvinces }) {
	const provinces = useSelector(({ provinces }) => provinces)
	const dispatch = useDispatch()

	useEffect(() => {
		fetchProvinces()
	}, [])

	console.log({ provinces })

	return (
		<Section width="70%" centered>
			<Heading content="Settings" bold />
			<Tab>
				<Tabs.TabPane key="change-password" tab="Ubah password">
					<Row>
						<Col lg={10}>
							<Formik
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
											name="repeat_password"
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
										<SubmitButton type="primary" icon="check">
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

export default connect(
	null,
	{ fetchProvinces }
)(Settings)