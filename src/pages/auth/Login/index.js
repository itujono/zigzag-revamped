import React from "react"
import { Section, Card, Button, GifPlayer, Logo } from "components"
import { Row, Col, Form, PageHeader } from "antd"
import { Link, useHistory, useLocation } from "react-router-dom"
import { Formik } from "formik"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import { authUser } from "store/actions/authActions"
import { TextInput } from "components/Fields"
import { theme } from "styles"
import { media, mobile } from "helpers"
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
				padding: 2em;
			}
		}
	`}
`

const LeftSide = styled(Col)`
	left: 50px;
	z-index: 1;
	margin-right: 6em;
	${media.mobile`
		left: 40px;
	`};
`

function Login() {
	const { push, goBack } = useHistory()
	const dispatch = useDispatch()
	const { state = {} } = useLocation()

	const previousUrl = state.previousUrl || ""

	const handleLogin = (values, { setSubmitting }) => {
		dispatch(authUser(values, setSubmitting, previousUrl))
	}

	if (localStorage.getItem("access_token")) push("/404")

	return (
		<Section centered>
			{/* <Row style={{ marginBottom: "2em" }}>
				<Col lg={12}>
					<Logo />
				</Col>
			</Row> */}

			<Row type="flex" align="middle" justify="center" className="mb4em">
				<LeftSide lg={10} xs={24}>
					<PageHeader
						className="pl0 mb2em"
						onBack={() => goBack()}
						title="Login"
						subTitle="Silakan login dulu untuk melanjutkan"
					/>
					<TheCard>
						<Formik
							onSubmit={handleLogin}
							initialValues={{ email: "" }}
							validationSchema={validationSchema}
						>
							{({ handleSubmit }) => (
								<Form layout="vertical" onSubmit={handleSubmit} className="mb4em">
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
						</Formik>
						<Row type="flex" justify="center">
							<Col lg={12} xs={24} className="ta-center">
								Atau <Link to="/register">register</Link> dulu
							</Col>
						</Row>
					</TheCard>
				</LeftSide>

				<Col lg={12} className="pt4em pt-initial__mobile">
					<GifPlayer src="https://assets6.lottiefiles.com/datafiles/8I4VBobfLT0ZhRnzi3ZZl61uKHJ6yUtXkb7aKe4Z/bag.json" />
					{/* <GifPlayer src="https://assets7.lottiefiles.com/packages/lf20_VcQkr6.json" /> */}
				</Col>
			</Row>

			<Row type="flex" justify="center">
				<Col lg={12} className="ta-center">
					<Logo width={!mobile && 140} />
				</Col>
			</Row>
		</Section>
	)
}

export default Login
