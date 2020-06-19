import React, { useState, useEffect } from "react"
import { Section, Heading, Card, Button, Logo, ButtonLink, Alert, GifPlayer } from "components"
import { Row, Col, Form, Icon, Modal, PageHeader } from "antd"
import { connect, useSelector } from "react-redux"
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
// import { AutoComplete } from "formik-antd"

// const TheImage = styled.section`
// 	width: 100%;
// 	height: 100%;
// 	margin-left: -50px;
// 	z-index: 0;

// 	${media.mobile`
// 		margin-left: initial;
// 	`}
// `

// ███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
// ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
// ███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
// ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
// ███████║   ██║      ██║   ███████╗███████╗███████║
// ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

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

function Register({ csOptions, error, loading, isPartner, ...props }) {
	const [section, setSection] = useState("credentials")
	const [accountType, setAccountType] = useState(1)
	const [selectedProvince, setSelectedProvince] = useState("")
	const [selectedCity, setSelectedCity] = useState("")
	const { push, goBack } = useHistory()
	const registerError = useSelector(({ auth }) => auth.registerUserError)
	const { fetchSubdistricts, fetchCustomerServices, fetchProvinces, fetchCities } = props

	const handleNext = (section) => {
		window.scrollTo(0, 0)
		setSection(section)
	}

	const handleRenderCities = (values) => setSelectedProvince(values.province)
	const handleRenderSubdistricts = (values) => setSelectedCity(values.city)

	const renderForm = (values) => {
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
						onPressEnter={() => handleNext(isPartner ? "cs" : "accountType")}
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
								onClick={() => handleNext(isPartner ? "cs" : "accountType")}
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
						{accountTypeOptions.map((item) => (
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
						disabled={isPartner}
						options={csOptions}
						helpText="CS kamu adalah orang yg kamu pilih untuk selalu memandu kamu selama menggunakan website Zigzag. Atau dengan kata lain, CS adalah asisten pribadi kamu."
					/>
					{isPartner && (
						<Alert
							type="success"
							message="CS kamu sudah ditentukan"
							description="Berhubung kamu regis sebagai Partner, maka CS kamu sudah ditentukan dari kami :)"
						/>
					)}
					<Row type="flex" justify="space-between">
						<Col lg={12}>
							<ButtonLink
								icon="left"
								onClick={() => handleNext(isPartner ? "credentials" : "accountType")}
							>
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
						autocomplete
						name="province"
						label="Provinsi kamu"
						placeholder="Pilih provinsi mu..."
						options={props.provinceAutocomplete}
						onChange={handleRenderCities(values)}
						loading={loading}
					/>
					<SelectInput
						autocomplete
						name="city"
						label="Kota kamu"
						placeholder="Pilih kota/kabupaten mu..."
						options={props.cityAutocomplete}
						loading={loading}
					/>
					<Row gutter={16}>
						<Col lg={18}>
							<SelectInput
								autocomplete
								name="subdistrict"
								label="Kecamatan kamu"
								placeholder="Pilih kecamatan mu..."
								options={props.subdistrictAutocomplete}
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
		values = {
			...values,
			acc_type: isPartner ? 3 : accountType,
			customer_service_id: isPartner ? 6 : values.customer_service_id,
			name: `${values.first_name} ${values.last_name}`
		}
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
		fetchCities(selectedProvince)
		fetchCustomerServices()
		if (selectedCity) fetchSubdistricts(selectedCity)
	}, [selectedProvince, selectedCity, fetchProvinces, fetchCities, fetchCustomerServices, fetchSubdistricts])

	return (
		<Section centered>
			<Row type="flex" align="middle" justify="center" className="mb2em">
				<LeftSide lg={10} xs={24}>
					<PageHeader
						className="pl0 mb2em"
						onBack={() => goBack()}
						title={isPartner ? "Register (partner)" : "Register"}
						subTitle="Silakan isi data kamu dulu untuk registrasi"
					/>
					<TheCard noHover>
						<Formik
							initialValues={{ customer_service_id: isPartner ? 6 : "Pilih CS nya" }}
							validationSchema={validationSchema}
							onSubmit={handleRegister}
						>
							{({ handleSubmit, values }) => (
								<Form layout="vertical" onSubmit={handleSubmit} className="mb4em">
									{renderForm(values)}
								</Form>
							)}
						</Formik>
						<Row type="flex" justify="center">
							<Col lg={12} xs={24} className="ta-center">
								Atau <Link to="/login">login</Link> aja langsung
							</Col>
						</Row>
					</TheCard>
				</LeftSide>
				<Col lg={12}>
					<GifPlayer src="https://assets6.lottiefiles.com/datafiles/8I4VBobfLT0ZhRnzi3ZZl61uKHJ6yUtXkb7aKe4Z/bag.json" />
				</Col>
			</Row>

			<Row type="flex" justify="center">
				<Col lg={12} className="ta-center">
					<Logo />
				</Col>
			</Row>
		</Section>
	)
}

const mapState = ({ rajaOngkir, other, auth }) => {
	const provinces = rajaOngkir.provinces || []
	const cities = rajaOngkir.cities || []
	const subdistricts = rajaOngkir.subdistricts || []
	const provinceAutocomplete = provinces.map((item) => ({ value: Number(item.province_id), text: item.province }))
	const cityAutocomplete = cities.map((item) => ({ value: Number(item.city_id), text: item.city_name }))
	const subdistrictAutocomplete = subdistricts.map((item) => ({
		value: Number(item.subdistrict_id),
		text: item.subdistrict_name
	}))

	return {
		provinces: rajaOngkir.provinces,
		csOptions: other.csOptions,
		error: auth.registerUserError,
		loading: auth.loading,
		cities,
		provinceAutocomplete,
		cityAutocomplete,
		subdistrictAutocomplete
	}
}

const actions = { fetchProvinces, fetchCities, fetchSubdistricts, fetchCustomerServices, registerUser }

// prettier-ignore
export default connect(mapState, actions)(Register)
