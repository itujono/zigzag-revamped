import React, { useEffect, useState } from "react"
import { Section, Heading, Card, Button } from "components"
import { Formik } from "formik"
import { Form, Row, Col, Icon } from "antd"
import { TextInput, SelectInput } from "components/Fields"
import styled from "styled-components"
import { theme } from "styles"

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

	const { fetchCities, fetchSubdistricts } = handlers
	const { cityOptions, provinceOptions, subdistrictOptions } = data

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
				render={({ handleSubmit, values }) => (
					<Form layout="vertical" onSubmit={handleSubmit}>
						<StyledCard noHover title="Info kontak">
							<Row gutter={16}>
								<Col lg={8}>
									<TextInput name="name" placeholder="Nama kamu..." marginBottom="0" />
								</Col>
								<Col lg={8}>
									<TextInput name="email" placeholder="Email kamu..." marginBottom="0" />
								</Col>
								<Col lg={8}>
									<TextInput name="tele" placeholder="Nomor handphone kamu..." marginBottom="0" />
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
										onChange={handleRenderCities(values.province)}
									/>
								</Col>
								<Col lg={12}>
									<SelectInput
										name="city"
										placeholder="Kota/kabupaten kamu..."
										options={cityOptions}
										onChange={handleRenderSubdistricts(values.city)}
									/>
								</Col>
								<Col lg={12}>
									<SelectInput
										name="subdistrict"
										placeholder="Kecamatan kamu..."
										options={subdistrictOptions}
									/>
								</Col>
								<Col lg={12}>
									<TextInput name="zip" placeholder="Kode pos kamu..." />
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
				)}
			/>
		</Section>
	)
}
