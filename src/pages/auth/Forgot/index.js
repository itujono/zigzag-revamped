import React from "react"
import { Section, Heading, Card, Button, Logo } from "components"
import { Row, Col, Form } from "antd"
import { Link, useHistory } from "react-router-dom"
import { Formik } from "formik"
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

export default function Forgot() {
	const { push } = useHistory()

	const handleForgot = (values, { setSubmitting }) => {
		console.log({ values })
		setSubmitting(false)
		push("/forgot_password/success")
	}

	return (
		<Section centered>
			<Row style={{ marginBottom: "2em" }}>
				<Col lg={12}>
					<Logo />
				</Col>
			</Row>
			<Row type="flex" align="middle" justify="center">
				<LeftSide lg={10}>
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
