import React, { useEffect, useState } from "react"
import { Section, Heading } from "components"
import { Formik } from "formik"
import { TextInput, SelectInput } from "components/Fields"
import { Form } from "antd"
import { SubmitButton } from "formik-antd"
import { connect } from "react-redux"

import { fetchUser } from "store/actions/userActions"
import { fetchProvinces, fetchCities, fetchSubdistricts } from "store/actions/rajaOngkirActions"

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 14 }
	}
}

const tailLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 6
		}
	}
}

function Basic({ provinceOptions, cityOptions, subdistrictOptions, ...props }) {
	const [selectedProvince, setSelectedProvince] = useState({})
	const [selectedCity, setSelectedCity] = useState({})
	const { fetchUser, fetchCities, fetchProvinces, fetchSubdistricts } = props

	const handleRenderCities = values => setSelectedProvince(values.province)
	const handleRenderSubdistricts = values => setSelectedCity(values.city)

	useEffect(() => {
		fetchUser()
		fetchProvinces()
		fetchCities("", selectedProvince)
		if (selectedCity) fetchSubdistricts(selectedCity)
	}, [selectedProvince, selectedCity])

	return (
		<Section width="70%" centered>
			<Heading content="Basic" bold />
			<Formik
				render={({ handleSubmit, values }) => (
					<Form {...formItemLayout} onSubmit={handleSubmit}>
						<TextInput name="first_name" label="Nama depan" placeholder="Nama depan kamu..." />
						<TextInput name="last_name" label="Nama belakang" placeholder="Nama belakang kamu..." />
						<TextInput type="email" name="email" label="Email" placeholder="Email kamu..." />
						<SelectInput
							name="province"
							label="Provinsi kamu"
							placeholder="Pilih salah satu..."
							onChange={handleRenderCities(values)}
							options={provinceOptions}
						/>
						<SelectInput
							name="city"
							label="Kota/kabupaten kamu"
							placeholder="Pilih salah satu..."
							onChange={handleRenderSubdistricts(values)}
							options={cityOptions}
						/>
						<SelectInput
							name="subdistrict"
							label="Kecamatan kamu"
							placeholder="Pilih salah satu..."
							options={subdistrictOptions}
						/>
						<Form.Item {...tailLayout}>
							<SubmitButton type="primary">Ubah detail</SubmitButton>
						</Form.Item>
					</Form>
				)}
			/>
		</Section>
	)
}

const mapState = ({ user, rajaOngkir }) => ({
	user: user.user,
	provinceOptions: rajaOngkir.provinceOptions,
	cityOptions: rajaOngkir.cityOptions,
	subdistrictOptions: rajaOngkir.subdistrictOptions
})

export default connect(mapState, { fetchUser, fetchCities, fetchSubdistricts, fetchProvinces })(Basic)
