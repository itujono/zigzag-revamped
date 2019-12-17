import React, { useState, useEffect } from "react"
import { Section, Heading, Card, Button, Logo, ButtonLink } from "components"
import { Row, Col, Form, Icon, Modal } from "antd"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"

import { fetchProvinces, fetchCities, fetchSubdistricts } from "store/actions/rajaOngkirActions"
import { fetchCustomerServices } from "store/actions/otherActions"
import { registerUser } from "store/actions/authActions"
import { Formik } from "formik"
import { TextInput, SelectInput } from "components/Fields"
import styled from "styled-components"
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
				padding: 2em;
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
		margin-bottom: 2em;
		background-color: ${({ value, accountType }) => accountType === value && theme.greyColor[4]};
		border-color: ${({ value, accountType }) => accountType === value && theme.primaryColor};
		.ant-card-body {
			padding: 2em;
		}
	}
`

const accountTypeOptions = [
	{
		value: 1,
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
		value: 2,
		title: "VIP",
		description: (
			<p>
				Dengan jadi VIP member, kamu dapat:
				<ul style={{ marginBottom: "1em" }}>
					<li>Semua kelebihan di tipe Reguler</li>
					<li>Dapat diskon melimpah</li>
					<li>Dapat pahala dan amal jariyah</li>
				</ul>
				Tapi kamu diwajibkan untuk:
				<ul style={{ marginBottom: "1em" }}>
					<li>
						Membayar biaya member sebesar <span className="primary">Rp 50.000</span> setelah proses
						registrasi
					</li>
					<li>Belanja minimal 4 (empat) items (direset tiap awal bulan)</li>
				</ul>
			</p>
		)
	}
]

function Register({ provinceOptions, cityOptions, csOptions, subdistrictOptions, error, loading, ...props }) {
	const [section, setSection] = useState("credentials")
	const [accountType, setAccountType] = useState(1)
	const [selectedProvince, setSelectedProvince] = useState("")
	const [selectedCity, setSelectedCity] = useState("")
	const { push } = useHistory()
	const { fetchSubdistricts, fetchCustomerServices, fetchProvinces, fetchCities } = props

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
					<TextInput password name="password" label="Password" placeholder="Masukkan password kamu..." />
					<TextInput
						password
						name="repeat_password"
						label="Ulangi password kamu"
						placeholder="Harus sama ama password di atas ya..."
						onPressEnter={() => handleNext("accountType")}
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
									!values.repeat_password ||
									values.password !== values.repeat_password
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
					<Row style={{ marginBottom: "2em" }}>
						{accountTypeOptions.map(item => (
							<Col lg={24} key={item.value}>
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
						loading={loading}
					/>
					<SelectInput name="city" label="Kota kamu" options={cityOptions} loading={loading} />
					<Row gutter={16}>
						<Col lg={18}>
							<SelectInput
								name="subdistrict"
								label="Kecamatan kamu"
								options={subdistrictOptions}
								onChange={handleRenderSubdistricts(values)}
								loading={loading}
							/>
						</Col>
						<Col lg={6}>
							<TextInput name="zip" label="Kode pos" placeholder="Kode pos kamu..." />
						</Col>
					</Row>
					<TextInput name="tele" label="Nomor HP" placeholder="Misal: 08122212122" />
					<TextInput
						texarea
						rows={3}
						name="address"
						label="Alamat kamu"
						placeholder="Misal: Jalan Suci no. 11"
					/>
					<Row type="flex" justify="space-between">
						<Col lg={12}>
							<ButtonLink icon="left" onClick={() => handleNext("cs")}>
								Kembali
							</ButtonLink>
						</Col>
						<Col lg={12} style={{ textAlign: "right" }}>
							<Button
								disabled={
									!values.province ||
									!values.city ||
									!values.subdistrict ||
									!values.zip ||
									!values.tele ||
									!values.address
								}
								submit
							>
								Oke, register sekarang
							</Button>
						</Col>
					</Row>
				</>
			)
		}
	}

	const handleRegister = (values, { setSubmitting }) => {
		values = { ...values, acc_type: accountType, name: `${values.first_name} ${values.last_name}` }
		const { repeat_password, first_name, last_name, ...theValues } = values
		Modal.confirm({
			title: "Daftar sekarang?",
			content: "Yakin kamu mau daftar sekarang?",
			centered: true,
			onOk: () => {
				props.registerUser(theValues, accountType, push).finally(() => setSubmitting(false))
			}
		})
	}

	useEffect(() => {
		fetchProvinces()
		fetchCities("", selectedProvince)
		fetchCustomerServices()
		if (selectedCity) fetchSubdistricts(selectedCity)
	}, [selectedProvince, selectedCity, fetchProvinces, fetchCities, fetchCustomerServices, fetchSubdistricts])

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
							initialValues={{
								customer_service_id: "Pilih CS nya",
								province: "Pilih provinsi kamu",
								city: "Pilih kota/kabupaten kamu",
								subdistrict: "Pilih kecamatan nya juga"
							}}
							validationSchema={validationSchema}
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

const mapState = ({ rajaOngkir, other, auth }) => {
	const provinces = rajaOngkir.provinces || []
	const cities = rajaOngkir.cities || []
	const subdistricts = rajaOngkir.subdistricts || []
	const provinceOptions = provinces.map(item => ({ value: item.province_id, label: item.province }))
	const cityOptions = cities.map(item => ({ value: item.city_id, label: item.city_name }))
	const subdistrictOptions = subdistricts.map(item => ({ value: item.subdistrict_id, label: item.subdistrict_name }))

	return {
		provinces: rajaOngkir.provinces,
		csOptions: other.csOptions,
		error: auth.registerUserError,
		loading: auth.loading,
		cities,
		cityOptions,
		subdistrictOptions,
		provinceOptions
	}
}

const actions = { fetchProvinces, fetchCities, fetchSubdistricts, fetchCustomerServices, registerUser }

// prettier-ignore
export default connect(mapState, actions)(Register)
