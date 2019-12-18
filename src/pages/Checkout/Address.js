import React, { useState } from "react"
import { Section, Heading, Card, Loading, Button } from "components"
import { Formik } from "formik"
import { Form, Row, Col, Icon, Tooltip } from "antd"
import { useHistory } from "react-router-dom"
import { TextInput, SelectInput } from "components/Fields"
import styled from "styled-components"
import { theme } from "styles"
import { Switch } from "formik-antd"
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

	const formData = JSON.parse(localStorage.getItem("formData")) || {}
	const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
	const typeRemark = (accountType.account_type_remark || "").toLowerCase()

	const {
		fetchCities,
		fetchSubdistricts,
		setFormValues,
		setSelectedSubdistrict,
		setSelectedProvince,
		setSelectedCity
	} = handlers
	const {
		cityOptions,
		provinceOptions,
		subdistrictOptions,
		user,
		cartItems,
		cartTotal,
		selectedSubdistrict,
		selectedProvince,
		selectedCity
	} = data

	const renderInitialValues = property => {
		return formData[property] ? formData[property] : user[property]
	}

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
			// ...formData,
			...values,
			cartItems,
			cartTotal,
			deposit: user.deposit,
			// province: values.province_id,
			province_name: selectedProvince.label,
			// city: values.city_id,
			city_name: selectedCity.label,
			// subdistrict: values.subdistrict_id,
			subdistrict_name: selectedSubdistrict.label
		}
		localStorage.setItem("formData", JSON.stringify(values))
		setSubmitting(false)
		const url = values.isSelfPickup ? "/checkout/summary" : "/checkout/ongkir"
		push(url)
	}

	if (initialLoading) return <Loading />

	return (
		<Section paddingHorizontal="0">
			<Heading content="Alamat kamu" subheader="Isi kontak dan alamat pengiriman nya" marginBottom="3em" />
			<Formik
				onSubmit={handleSaveAddress}
				validationSchema={addressValidation}
				initialValues={{
					name: renderInitialValues("name"),
					email: renderInitialValues("email"),
					tele: renderInitialValues("tele"),
					province: renderInitialValues("province_name") || "Pilih provinsi nya",
					city: renderInitialValues("city_name") || "Pilih kota nya",
					subdistrict: renderInitialValues("subdistrict_name") || "Pilih kecamatan nya",
					province_id: renderInitialValues("province"),
					city_id: renderInitialValues("city"),
					subdistrict_id: renderInitialValues("subdistrict"),
					zip: renderInitialValues("zip"),
					address: renderInitialValues("address"),
					dropshipper_name: renderInitialValues("dropshipper_name"),
					dropshipper_tele: renderInitialValues("dropshipper_tele"),
					jne_online_booking: renderInitialValues("jne_online_booking")
				}}
				render={({ handleSubmit, values }) => {
					const { dropshipper_name, dropshipper_tele, jne_online_booking, ...restValues } = values
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
							{typeRemark === "partner" && (
								<Section paddingHorizontal="0">
									<div style={{ marginBottom: "2em" }}>
										<Switch name="isSelfPickup" /> &nbsp; Saya bersedia jemput di gudang Zigzag
										&nbsp;{" "}
										<Tooltip title="Karena kamu adalah Partner Zigzag, jadi kamu hanya punya pilihan untuk ambil (jemput) barang yg kamu order langsung ke gudang Zigzag">
											<Icon type="question-circle" theme="filled" />
										</Tooltip>
									</div>
									{values.isSelfPickup && (
										<TextInput
											textarea
											rows={3}
											name="notes"
											label="Tulis notes"
											placeholder="Biasanya untuk copy paste alamat di Shopee..."
										/>
									)}
								</Section>
							)}

							{!values.isSelfPickup && (
								<>
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
													autocomplete
													name="province"
													placeholder="Provinsi kamu..."
													options={provinceOptions}
													onChange={handleChangeSelect("province")}
												/>
											</Col>
											<Col lg={12}>
												<SelectInput
													autocomplete
													name="city"
													placeholder="Kota/kabupaten kamu..."
													options={cityOptions}
													onChange={handleChangeSelect("city")}
												/>
											</Col>
											<Col lg={12}>
												<SelectInput
													autocomplete
													name="subdistrict"
													placeholder="Kecamatan kamu..."
													options={subdistrictOptions}
													onChange={handleChangeSelect("subdistrict")}
												/>
											</Col>
											<Col lg={12}>
												<TextInput
													name="zip"
													placeholder="Kode pos kamu..."
													onChange={handleChange}
												/>
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
								</>
							)}

							<Section textAlign="right" paddingHorizontal="0">
								<Button
									htmlType="submit"
									type="primary"
									disabled={Object.values(restValues).some(item => item === "" || !item)}
								>
									Lanjut ke Ongkir <Icon type="right" />
								</Button>
							</Section>
						</Form>
					)
				}}
			/>
		</Section>
	)
}
