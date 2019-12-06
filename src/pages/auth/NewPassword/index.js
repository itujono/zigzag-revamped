import React from "react"
import { Section, Heading, Card, Button, Logo } from "components"
import { Row, Col, Form } from "antd"
import { useHistory } from "react-router"
import { Link, useLocation } from "react-router-dom"
import { Formik } from "formik"
import { connect } from "react-redux"
import { changeNewPassword } from "store/actions/authActions"

import { TextInput } from "components/Fields"
import styled from "styled-components"
import { theme } from "styles"

const TheImage = styled.section`
	width: 100%;
	height: 100%;
	margin-left: -50px;
	z-index: 0;
`

const TheCard = styled(Card)`
	&& {
		border: none;
		border-radius: 15px;
		box-shadow: ${theme.boxShadow.main};
		.ant-card-body {
			padding: 4em;
		}
	}
`

const LeftSide = styled(Col)`
	left: 50px;
	z-index: 1;
`

function NewPassword({ changeNewPassword, error }) {
	const { push } = useHistory()
	const { state = {}, search } = useLocation()
	const params = new URLSearchParams(search)

	const handleChangePassword = (values, { setSubmitting }) => {
		values = { ...values, email: params.get("email"), code: params.get("code") }
		changeNewPassword(values, push).finally(() => setSubmitting(false))
	}

	// if (!state.success) push("/404")

	return (
		<Section centered>
			{/* <Row style={{ marginBottom: "2em" }}>
				<Col lg={12}>
					<Logo />
				</Col>
			</Row> */}
			<Row type="flex" align="middle" justify="center">
				<LeftSide lg={10}>
					<Heading
						bold
						content="Masukkan password baru"
						level={1}
						marginBottom="3em"
						subheader={
							<p>
								Atau <Link to="/login">login saja</Link> langsung
							</p>
						}
					/>
					<TheCard>
						<Formik
							onSubmit={handleChangePassword}
							render={({ handleSubmit }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									<TextInput
										password
										name="new_password"
										label="Password baru kamu"
										placeholder="Jangan pake nama hewan peliharaan kamu ya"
									/>
									<TextInput
										password
										name="new_password_confirmation"
										label="Ulang sekali lagi password baru nya"
										placeholder="Jangan pake nama hewan peliharaan kamu ya"
									/>
									<Button submit size="large">
										Ganti password saya sekarang
									</Button>
								</Form>
							)}
						/>
					</TheCard>
				</LeftSide>
				<Col lg={12}>
					<TheImage>
						<img
							src="https://assets.website-files.com/5ccc8aa73871f9d0b1c81c04/5ced7f5fe2e0591aebdd3fba_sign-in.jpg"
							width="100%"
						/>
					</TheImage>
				</Col>
			</Row>
		</Section>
	)
}

const mapState = ({ auth }) => ({
	error: auth.newPasswordError
})

export default connect(mapState, { changeNewPassword })(NewPassword)
