import React, { useState } from "react"
import { Section, Heading, Card, Loading, Button } from "components"
import { Formik } from "formik"
import { Form, Row, Col, Icon } from "antd"
import { useHistory } from "react-router-dom"
import { TextInput, SelectInput } from "components/Fields"
import styled from "styled-components"
import { theme } from "styles"
import { Switch, SubmitButton, FormikDebug } from "formik-antd"
import { addressValidation } from "./validation"

const StyledCard = styled(Card)`
	&& {
		margin-bottom: 2em;
		box-shadow: ${theme.boxShadow.main};
		border: none;
		.ant-card-head {
			padding-left: 2em;
		}
	}
`

export default function Address({ data, handlers, initialLoading }) {
	const { push } = useHistory()
	const [selectedProvince, setSelectedProvince] = useState({})
	const [selectedCity, setSelectedCity] = useState({})
	const [selectedSubdistrict, setSelectedSubdistrict] = useState({})

	const formData = JSON.parse(localStorage.getItem("formData")) || {}

	const { fetchCities, fetchSubdistricts, setFormValues } = handlers
	const { cityOptions, provinceOptions, subdistrictOptions, user, cartItems, cartTotal } = data

	const handleRenderCities = value => {
		fetchCities("", value)
		setSelectedProvince(provinceOptions.find(item => item.value === value) || {})
	}

	const handleRenderSubdistricts = value => {
		fetchSubdistricts(value)
		setSelectedCity(cityOptions.find(item => item.value === value) || {})
	}

	const handleSelectSubdistrict = value => {
		setSelectedSubdistrict(subdistrictOptions.find(item => item.value === value) || {})
	}

	const handleSaveAddress = (values, { setSubmitting }) => {
		values = {
			...formData,
			...values,
			cartItems,
			cartTotal,
			province_name: selectedProvince.label,
			city_name: selectedCity.label,
			subdistrict_name: selectedSubdistrict.label
		}
		localStorage.setItem("formData", JSON.stringify(values))
		setSubmitting(false)
		push("/checkout/ongkir")
	}

	if (initialLoading) return <Loading />

	return (
		<Section paddingHorizontal="0">
			<Heading content="Alamat kamu" subheader="Isi kontak dan alamat pengiriman nya" marginBottom="3em" />
			<Formik
				onSubmit={handleSaveAddress}
				validationSchema={addressValidation}
				initialValues={{
					...user,
					province: "Pilih provinsi nya",
					city: "Pilih kota nya",
					subdistrict: "Pilih kecamatan nya",
					zip: "",
					address: ""
				}}
				render={({ handleSubmit, values }) => {
					const handleChange = e => {
						const name = e.target.name
						setFormValues(formValues => ({ ...formValues, [name]: e.target.value }))
					}

					const handleChangeSelect = name => value => {
						if (name === "province") handleRenderCities(value)
						if (name === "city") handleRenderSubdistricts(value)
						if (name === "subdistrict") handleSelectSubdistrict(value)
						setFormValues(formValues => ({ ...formValues, [name]: value }))
					}

					return (
						<Form layout="vertical" onSubmit={handleSubmit}>
							<StyledCard noHover title="Info kontak">
								<Row gutter={16}>
									<Col lg={8}>
										<TextInput
											name="name"
											placeholder="Nama kamu..."
											marginBottom="0"
											onChange={handleChange}
										/>
									</Col>
									<Col lg={8}>
										<TextInput
											name="email"
											placeholder="Email kamu..."
											marginBottom="0"
											onChange={handleChange}
										/>
									</Col>
									<Col lg={8}>
										<TextInput
											name="tele"
											placeholder="Nomor handphone kamu..."
											marginBottom="0"
											onChange={handleChange}
										/>
									</Col>
								</Row>
							</StyledCard>
							<StyledCard noHover title="Alamat">
								<Row gutter={16}>
									<Col lg={12}>
										<SelectInput
											name="province"
											placeholder="Provinsi kamu..."
											options={provinceOptions}
											onChange={handleChangeSelect("province")}
										/>
									</Col>
									<Col lg={12}>
										<SelectInput
											name="city"
											placeholder="Kota/kabupaten kamu..."
											options={cityOptions}
											onChange={handleChangeSelect("city")}
										/>
									</Col>
									<Col lg={12}>
										<SelectInput
											name="subdistrict"
											placeholder="Kecamatan kamu..."
											options={subdistrictOptions}
											onChange={handleChangeSelect("subdistrict")}
										/>
									</Col>
									<Col lg={12}>
										<TextInput name="zip" placeholder="Kode pos kamu..." onChange={handleChange} />
									</Col>
								</Row>
								<Row gutter={16}>
									<Col lg={24}>
										<TextInput
											textarea
											rows={3}
											name="address"
											placeholder="Alamat pengiriman kamu..."
											marginBottom="0"
											onChange={handleChange}
										/>
									</Col>
								</Row>
							</StyledCard>
							<StyledCard
								noHover
								title={
									<div>
										Dropshipper &nbsp; <Switch name="isDropshipper" />
									</div>
								}
							>
								<Row gutter={16}>
									<Col lg={8}>
										<TextInput
											name="dropshipper_name"
											placeholder="Nama kamu sebagai dropshipper..."
											disabled={!values.isDropshipper}
											onChange={handleChange}
										/>
									</Col>
									<Col lg={8}>
										<TextInput
											name="dropshipper_tele"
											placeholder="Nomor HP kamu sebagai dropshipper..."
											disabled={!values.isDropshipper}
											onChange={handleChange}
										/>
									</Col>
									<Col lg={8}>
										<TextInput
											name="jne_online_booking"
											placeholder="JNE Online Booking..."
											disabled={!values.isDropshipper}
											onChange={handleChange}
										/>
									</Col>
								</Row>
							</StyledCard>
							<Section textAlign="right" paddingHorizontal="0">
								<SubmitButton type="primary">
									Lanjut ke Ongkir <Icon type="right" />
								</SubmitButton>
							</Section>
						</Form>
					)
				}}
			/>
		</Section>
	)
}
