import React from "react"
import { Section, Heading } from "components"
import { TextInput } from "components/Fields"
import { Tabs, Form, Row, Col } from "antd"
import { Formik } from "formik"
import styled from "styled-components"

const Tab = styled(Tabs)`
	.ant-tabs-bar {
		margin-bottom: 4em;
	}
`

function Settings() {
	return (
		<Section>
			<Heading content="Settings" bold />
			<Tab>
				<Tabs.TabPane key="change-password" tab="Change password">
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

export default Settings