import React from "react"
import { Section, Heading, Card, Button, Logo } from "components"
import { Row, Col, Form } from "antd"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import { connect } from "react-redux"
import { forgotPassword } from "store/actions/authActions"

import { TextInput } from "components/Fields"
import styled from "styled-components"
import { theme } from "styles"
import { media } from "helpers"

const TheImage = styled.section`
	width: 100%;
	height: 100%;
	margin-left: -50px;
	z-index: 0;

	${media.mobile`
		margin-left: initial;
	`}
`

const TheCard = styled(Card)`
	&& {
		border: none;
		border-radius: 15px;
		box-shadow: ${theme.boxShadow.main};
		.ant-card-body {
			padding: 4em;
		}

		${media.mobile`
			margin-bottom: 2em;
			.ant-card-body {
				padding: 2em;
			}
		`}
	}
`

const LeftSide = styled(Col)`
	left: 50px;
	z-index: 1;

	${media.mobile`
		left: initial;
	`}
`

function Forgot({ forgotPassword, error }) {
	const { push } = useHistory()

	const handleForgot = (values, { setSubmitting }) => {
		forgotPassword({ email: values.email }, push).finally(() => setSubmitting(false))
	}

	return (
		<Section centered>
			{/* <Row style={{ marginBottom: "2em" }}>
				<Col lg={12}>
					<Logo />
				</Col>
			</Row> */}
			<Row type="flex" align="middle" justify="center">
				<LeftSide lg={10} xs={24}>
					<Heading
						bold
						content="Lupa password?"
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
							onSubmit={handleForgot}
							render={({ handleSubmit }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									<TextInput
										type="email"
										name="email"
										label="Email kamu pas register kemaren"
										placeholder="Masukkan email yang kamu pake pas registrasi..."
									/>
									<Button submit size="large">
										Kirim password saya sekarang
									</Button>
								</Form>
							)}
						/>
					</TheCard>
				</LeftSide>
				<Col lg={12} xs={24}>
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
	error: auth.forgotError
})

export default connect(mapState, { forgotPassword })(Forgot)
