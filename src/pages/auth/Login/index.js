import React from "react"
import { Section, Heading, Card, Button, Logo } from "components"
import { Row, Col, Form } from "antd"
import { Link } from "react-router-dom"
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
	box-shadow: ${theme.boxShadow.main};
	.ant-card-body {
		padding: 4em;
	}
`

const LeftSide = styled(Col)`
	left: 50px;
	z-index: 1;
`

export default function Login() {
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
