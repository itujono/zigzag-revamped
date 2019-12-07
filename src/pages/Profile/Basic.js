import React, { useEffect, useState } from "react"
import { Section, Heading, Loading } from "components"
import { Formik } from "formik"
import { TextInput, SelectInput } from "components/Fields"
import { Form, Divider, Button } from "antd"
import { connect } from "react-redux"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { fetchUser, updateUserProfile } from "store/actions/userActions"
import { fetchProvinces, fetchCities, fetchSubdistricts } from "store/actions/rajaOngkirActions"
import { ResetButton, SubmitButton } from "formik-antd"

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

const StyledForm = styled(Form)`
	.ant-typography {
		&.account-type {
			margin-bottom: 0;
			h4 {
				font-size: 1.1em;
			}
		}
	}
`

function Basic({ provinceOptions, cityOptions, subdistrictOptions, user, loading, ...props }) {
	const { fetchUser, fetchCities, fetchProvinces, fetchSubdistricts, updateUserProfile } = props

	const handleRenderCities = value => fetchCities("", value)
	const handleRenderSubdistricts = value => fetchSubdistricts(value)
	const accountType = (user.acc_type || {}).account_type_remark
	const accountTypeText = `Kamu adalah member ${accountType} ${(accountType === "VIP" && "🔥") ||
		(accountType === "Reguler" && <Link to="/upgrade">Upgrade akun?</Link>)}`

	const handleUpdate = values => {
		updateUserProfile(values)
	}

	useEffect(() => {
		fetchUser()
		fetchProvinces()
	}, [])

	if (!user || Object.keys(user).length === 0) return <Loading />

	return (
		<Section width="70%" centered>
			<Heading content="Basic" bold />
			<Formik
				initialValues={{
					...user,
					province: user.province_name,
					city: user.city_name,
					subdistrict: user.subdistrict_name
				}}
				onSubmit={handleUpdate}
				render={({ handleSubmit }) => (
					<StyledForm {...formItemLayout} onSubmit={handleSubmit}>
						<Form.Item {...tailLayout}>
							<Heading className="account-type" content={accountTypeText} />
						</Form.Item>
						<TextInput name="name" label="Nama kamu" placeholder="Nama kamu..." />
						<TextInput
							disabled
							helpText="Email tidak dapat diubah"
							type="email"
							name="email"
							label="Email"
							placeholder="Email kamu..."
						/>
						<Divider />
						<Heading content="Detail alamat" />
						<SelectInput
							name="province"
							label="Provinsi kamu"
							placeholder="Pilih salah satu..."
							onChange={handleRenderCities}
							options={provinceOptions}
						/>
						<SelectInput
							name="city"
							label="Kota/kabupaten kamu"
							placeholder="Pilih salah satu..."
							onChange={handleRenderSubdistricts}
							options={cityOptions}
						/>
						<SelectInput
							name="subdistrict"
							label="Kecamatan kamu"
							placeholder="Pilih salah satu..."
							options={subdistrictOptions}
						/>
						<TextInput name="zip" label="Kode pos" placeholder="Kode pos kamu..." />
						<TextInput texarea rows={3} name="address" label="Alamat" placeholder="Alamat kamu..." />
						<TextInput name="tele" label="Nomor HP" placeholder="Nomor HP kamu..." />
						<Form.Item {...tailLayout}>
							<SubmitButton>Ubah detail</SubmitButton> &nbsp; <ResetButton type="link">Reset</ResetButton>
						</Form.Item>
					</StyledForm>
				)}
			/>
		</Section>
	)
}

const mapState = ({ user, rajaOngkir }) => ({
	user: user.user,
	loading: user.loading,
	provinceOptions: rajaOngkir.provinceOptions,
	cityOptions: rajaOngkir.cityOptions,
	subdistrictOptions: rajaOngkir.subdistrictOptions
})

export default connect(mapState, { fetchUser, fetchCities, fetchSubdistricts, fetchProvinces, updateUserProfile })(
	Basic
)
