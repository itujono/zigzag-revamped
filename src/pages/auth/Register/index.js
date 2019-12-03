import React, { useState, useEffect } from "react"
import { Section, Heading, Card, Button, Logo, ButtonLink } from "components"
import { Row, Col, Form, Icon } from "antd"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { fetchProvinces, fetchCities, fetchSubdistricts } from "store/actions/rajaOngkirActions"
import { Formik } from "formik"
import { TextInput, RadioInput, SelectInput } from "components/Fields"
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

function Register({
	fetchProvinces,
	provinceOptions,
	cityOptions,
	fetchCities,
	subdistrictOptions,
	fetchSubdistricts
}) {
	const [section, setSection] = useState("credentials")
	const [accountType, setAccountType] = useState("reguler")
	const [selectedProvince, setSelectedProvince] = useState("")
	const [selectedCity, setSelectedCity] = useState("")
	const handleNext = section => setSection(section)

	const handleRenderCities = values => setSelectedProvince(values.province)
	const handleRenderSubdistricts = values => setSelectedCity(values.city)

	const renderForm = values => {
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
					<Row type="flex" justify="space-between">
						<Col lg={12}></Col>
						<Col lg={12} style={{ textAlign: "right" }}>
							<Button
								disabled={
									!values.first_name ||
									!values.last_name ||
									!values.email ||
									!values.password ||
									!values.repeat_password
								}
								onClick={() => handleNext("accountType")}
							>
								Selanjutnya <Icon type="right" />
							</Button>
						</Col>
					</Row>
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
					<Row type="flex" justify="space-between">
						<Col lg={12}>
							<ButtonLink icon="left" onClick={() => handleNext("credentials")}>
								Kembali
							</ButtonLink>
						</Col>
						<Col lg={12} style={{ textAlign: "right" }}>
							<Button onClick={() => handleNext("cs")}>
								Selanjutnya <Icon type="right" />
							</Button>
						</Col>
					</Row>
				</>
			)
		} else if (section === "cs") {
			return (
				<>
					<SelectInput
						name="customer_service_id"
						label="Pilih CS kamu"
						options={csOptions}
						helpText="CS kamu adalah orang yg kamu pilih untuk selalu memandu kamu selama menggunakan website Zigzag. Atau dengan kata lain, CS adalah asisten pribadi kamu."
					/>
					<Row type="flex" justify="space-between">
						<Col lg={12}>
							<ButtonLink icon="left" onClick={() => handleNext("accountType")}>
								Kembali
							</ButtonLink>
						</Col>
						<Col lg={12} style={{ textAlign: "right" }}>
							<Button
								disabled={values.customer_service_id === "Pilih CS nya"}
								onClick={() => handleNext("address")}
							>
								Selanjutnya <Icon type="right" />
							</Button>
						</Col>
					</Row>
				</>
			)
		} else {
			// Address
			return (
				<>
					<SelectInput
						name="province"
						label="Provinsi kamu"
						options={provinceOptions}
						onChange={handleRenderCities(values)}
					/>
					<SelectInput name="city" label="Kota kamu" options={cityOptions} />
					<Row gutter={16}>
						<Col lg={18}>
							<SelectInput
								name="subdistrict"
								label="Kecamatan kamu"
								options={subdistrictOptions}
								onChange={handleRenderSubdistricts(values)}
							/>
						</Col>
						<Col lg={6}>
							<TextInput name="zip" label="Kode pos" />
						</Col>
					</Row>
					<Row type="flex" justify="space-between">
						<Col lg={12}>
							<ButtonLink icon="left" onClick={() => handleNext("cs")}>
								Kembali
							</ButtonLink>
						</Col>
						<Col lg={12} style={{ textAlign: "right" }}>
							<Button submit>Oke, register sekarang</Button>
						</Col>
					</Row>
				</>
			)
		}
	}

	const handleRegister = (values, { setSubmitting }) => {
		values = { ...values, acc_type: accountType }
		console.log({ values })
		setSubmitting(false)
	}

	useEffect(() => {
		fetchProvinces()
		fetchCities("", selectedProvince)
		if (selectedCity) fetchSubdistricts(selectedCity)
	}, [selectedProvince, selectedCity])

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
							initialValues={{ customer_service_id: "Pilih CS nya" }}
							onSubmit={handleRegister}
							render={({ handleSubmit, values }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									{renderForm(values)}
								</Form>
							)}
						/>
					</TheCard>
				</LeftSide>
				<Col lg={12}>
					<TheImage>
						<img
							src="https://assets.website-files.com/5ccc8aa73871f9d0b1c81c04/5ced813ed73b74c8b6b95728_sign-up-compressor.jpg"
							width="100%"
						/>
					</TheImage>
				</Col>
			</Row>
		</Section>
	)
}

const mapState = ({ rajaOngkir }) => {
	const provinces = rajaOngkir.provinces || []
	const cities = rajaOngkir.cities || []
	const subdistricts = rajaOngkir.subdistricts || []
	const provinceOptions = provinces.map(item => ({ value: item.province_id, label: item.province }))
	const cityOptions = cities.map(item => ({ value: item.city_id, label: item.city_name }))
	const subdistrictOptions = subdistricts.map(item => ({ value: item.subdistrict_id, label: item.subdistrict_name }))

	return {
		provinces: rajaOngkir.provinces,
		cities,
		cityOptions,
		subdistrictOptions,
		provinceOptions
	}
}

export default connect(mapState, { fetchProvinces, fetchCities, fetchSubdistricts })(Register)
