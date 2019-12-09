import React from "react"
import { Section, Heading, Card, Button, Logo } from "components"
import { Row, Col, Form } from "antd"
import { Link, useHistory } from "react-router-dom"
import { Formik } from "formik"
import { connect, useSelector } from "react-redux"
import styled from "styled-components"

import { authUser } from "store/actions/authActions"
import { TextInput } from "components/Fields"
import { theme } from "styles"
import { media } from "helpers"
import { validationSchema } from "./validation"

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
	}

	${media.mobile`
		&& {
			margin-bottom: 2em;
			.ant-card-body {
				padding: 1em;
			}
		}
	`}
`

const LeftSide = styled(Col)`
	left: 50px;
	z-index: 1;

	${media.mobile`
		left: initial;
	`}
`

function Login({ authUser }) {
	const { push } = useHistory()

	const handleLogin = (values, { setSubmitting }) => {
		authUser(values, setSubmitting, push)
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
						content="Login"
						level={1}
						marginBottom="3em"
						subheader={
							<p>
								Atau <Link to="/register">register dulu</Link>
							</p>
						}
					/>
					<TheCard>
						<Formik
							onSubmit={handleLogin}
							validationSchema={validationSchema}
							render={({ handleSubmit }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									<TextInput
										type="email"
										name="email"
										label="Email"
										placeholder="Masukkan email kamu..."
									/>
									<TextInput
										type="password"
										name="password"
										label="Password"
										placeholder="Masukkan password kamu..."
									/>
									<Row type="flex" justify="end" style={{ marginBottom: "2em" }}>
										<Col lg={12} style={{ textAlign: "right" }}>
											<Link to="/forgot_password">Lupa password?</Link>
										</Col>
									</Row>
									<Button submit size="large">
										Login sekarang
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

export default connect(null, { authUser })(Login)
