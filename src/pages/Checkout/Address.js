import React, { useEffect, useState } from "react"
import { Section, Heading, Card, Button } from "components"
import { Formik } from "formik"
import { Form, Row, Col, Icon } from "antd"
import { TextInput, SelectInput } from "components/Fields"
import styled from "styled-components"
import { theme } from "styles"
import { Switch } from "formik-antd"

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

export default function Address({ data, handlers }) {
	const [selectedProvince, setSelectedProvince] = useState("")
	const [selectedCity, setSelectedCity] = useState("")

	const { fetchCities, fetchSubdistricts, setFormValues } = handlers
	const { cityOptions, provinceOptions, subdistrictOptions, formValues } = data

	const handleRenderCities = provinceId => setSelectedProvince(provinceId)
	const handleRenderSubdistricts = cityId => setSelectedCity(cityId)

	useEffect(() => {
		fetchCities("", selectedProvince)
		if (selectedCity) fetchSubdistricts(selectedCity)
	}, [selectedProvince, selectedCity])

	return (
		<Section paddingHorizontal="0">
			<Heading content="Alamat kamu" subheader="Isi kontak dan alamat pengiriman nya" marginBottom="3em" />
			<Formik
				render={({ handleSubmit, values }) => {
					const handleChange = e => {
						const name = e.target.name
						setFormValues(formValues => ({ ...formValues, [name]: e.target.value }))
					}

					const handleChangeSelect = name => value => {
						if (name === "province") handleRenderCities(value)
						if (name === "city") handleRenderSubdistricts(value)
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
								<Button>
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
