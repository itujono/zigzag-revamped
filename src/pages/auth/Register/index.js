import React, { useState } from "react"
import { Section, Heading, Card, Button, Logo } from "components"
import { Row, Col, Form, Icon } from "antd"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import { TextInput, RadioInput, SelectInput } from "components/Fields"
import styled from "styled-components"
import { theme } from "styles"
import { FormikDebug } from "@jbuschke/formik-antd"

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

const AccountCard = styled(Card)`
	&& {
		cursor: pointer;
		background-color: ${({ bg, value, accountType }) => accountType === value && "#f3f3f3"};
		.ant-card-body {
			padding: 2em;
		}
	}
`

const accountTypeOptions = [
	{
		value: "reguler",
		title: "Reguler",
		description: (
			<p>
				Dengan jadi Reguler member, kamu dapat:
				<ul>
					<li>Dapat belanja di sini</li>
					<li>Dapat update barang terbaru pertama kali</li>
					<li>Dapat pahala dan amal jariyah</li>
				</ul>
			</p>
		)
	},
	{
		value: "vip",
		title: "VIP",
		description: (
			<p>
				Dengan jadi VIP member, kamu dapat:
				<ul>
					<li>Semua kelebihan di tipe Reguler</li>
					<li>Dapat diskon melimpah</li>
					<li>Dapat pahala dan amal jariyah</li>
				</ul>
			</p>
		)
	}
]
const csOptions = [
	{ value: "si won", label: "Si Won" },
	{ value: "pipeh", label: "Pipeh" },
	{ value: "pujay", label: "Pujay" }
]

export default function Register() {
	const [section, setSection] = useState("credentials")
	const [accountType, setAccountType] = useState("reguler")
	const handleNext = section => setSection(section)

	const renderForm = () => {
		if (section === "credentials") {
			return (
				<>
					<Row gutter={16}>
						<Col lg={12}>
							<TextInput name="first_name" label="Nama depan" placeholder="Masukkan nama depan kamu..." />
						</Col>
						<Col lg={12}>
							<TextInput
								name="last_name"
								label="Nama belakang"
								placeholder="Masukkan nama belakang kamu..."
							/>
						</Col>
					</Row>
					<TextInput type="email" name="email" label="Email" placeholder="Masukkan email kamu..." />
					<TextInput
						type="password"
						name="password"
						label="Password"
						placeholder="Masukkan password kamu..."
					/>
					<TextInput
						type="password"
						name="repeat_password"
						label="Ulangi password kamu"
						placeholder="Harus sama ama password di atas ya..."
					/>
					<Button onClick={() => handleNext("accountType")}>
						Selanjutnya <Icon type="right" />
					</Button>
				</>
			)
		} else if (section === "accountType") {
			return (
				<>
					{/* <RadioInput name="acc_type" label="Pilih tipe akun" options={accountTypeOptions} /> */}
					<Row gutter={16} style={{ marginBottom: "2em" }}>
						{accountTypeOptions.map(item => (
							<Col lg={12}>
								<AccountCard
									onClick={() => setAccountType(item.value)}
									value={item.value}
									accountType={accountType}
								>
									<Heading content={item.title} subheader={item.description} />
								</AccountCard>
							</Col>
						))}
					</Row>
					<Button onClick={() => handleNext("cs")}>
						Selanjutnya <Icon type="right" />
					</Button>
				</>
			)
		} else if (section === "cs") {
			return (
				<>
					<SelectInput name="customer_service_id" label="Pilih CS kamu" options={csOptions} />
					<Button onClick={() => handleNext("address")}>
						Selanjutnya <Icon type="right" />
					</Button>
				</>
			)
		} else {
			return (
				<>
					<SelectInput name="province" label="Provinsi kamu" options={csOptions} />
					<SelectInput name="city" label="Kota kamu" options={csOptions} />
					<Row gutter={16}>
						<Col lg={18}>
							<SelectInput name="subdistrict" label="Kecamatan kamu" options={csOptions} />
						</Col>
						<Col lg={6}>
							<TextInput name="zip" label="Kode pos" />
						</Col>
					</Row>
					<Button submit>Oke, registrasi sekarang</Button>
				</>
			)
		}
	}

	const handleRegister = (values, { setSubmitting }) => {
		values = { ...values, acc_type: accountType }
		console.log({ values })
		setSubmitting(false)
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
						content="Register"
						level={1}
						marginBottom="3em"
						subheader={
							<p>
								Atau <Link to="/login">login saja</Link> langsung
							</p>
						}
					/>
					<TheCard noHover>
						<Formik
							onSubmit={handleRegister}
							render={({ handleSubmit }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									{renderForm()}
									<FormikDebug />
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
