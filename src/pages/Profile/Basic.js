import React, { useEffect, useState } from "react"
import { Section, Heading, Loading, Card } from "components"
import { Formik } from "formik"
import { TextInput, SelectInput } from "components/Fields"
import { Form, Divider, Button, Row, Col, Avatar, Affix } from "antd"
import { connect } from "react-redux"
import styled from "styled-components/macro"
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

const CsHeading = styled(Heading)`
	> h4.ant-typography {
		font-size: 1em;
		margin-bottom: 1.5em;
	}
`

function Basic({ provinceOptions, cityOptions, subdistrictOptions, user, loading, ...props }) {
	const { fetchUser, fetchCities, fetchProvinces, fetchSubdistricts, updateUserProfile } = props
	const { customer_service: cs = {} } = user

	const handleRenderCities = value => fetchCities("", value)
	const handleRenderSubdistricts = value => fetchSubdistricts(value)
	const accountType = (user.acc_type || {}).account_type_remark
	const accountTypeText = (
		<span>
			Kamu adalah member {accountType}{" "}
			{(accountType === "VIP" && "🔥") ||
				(accountType === "Reguler" && <Link to="/upgrade">Upgrade akun?</Link>) ||
				null}
		</span>
	)

	const csDetails = (
		<div>
			<Heading content="Whatsapp" subheader={cs.whatsapp} reverse />
			<Heading content="Line" subheader={cs.line} reverse />
		</div>
	)

	const handleUpdate = values => {
		updateUserProfile(values)
	}

	useEffect(() => {
		fetchUser()
		fetchProvinces()
	}, [fetchProvinces, fetchUser])

	if (!user || Object.keys(user).length === 0) return <Loading />

	return (
		<Section centered>
			<Row>
				<Col lg={16}>
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
								<TextInput
									texarea
									rows={3}
									name="address"
									label="Alamat"
									placeholder="Alamat kamu..."
								/>
								<TextInput name="tele" label="Nomor HP" placeholder="Nomor HP kamu..." />
								<Form.Item {...tailLayout}>
									<SubmitButton>Ubah detail</SubmitButton> &nbsp;{" "}
									<ResetButton type="link">Reset</ResetButton>
								</Form.Item>
							</StyledForm>
						)}
					/>
				</Col>
				<Col lg={8}>
					<Affix offset={30}>
						<Card title="CS kamu">
							<Row type="flex">
								<Col lg={8}>
									<Avatar
										css={`
											&& {
												width: 80px;
												height: 80px;
											}
										`}
										src="https://source.unsplash.com/random/"
										size="large"
										shape="circle"
									/>
								</Col>
								<Col lg={16}>
									<CsHeading content={cs.name} subheader={csDetails} />
								</Col>
							</Row>
						</Card>
					</Affix>
				</Col>
			</Row>
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

const actions = { fetchUser, fetchCities, fetchSubdistricts, fetchProvinces, updateUserProfile }

export default connect(mapState, actions)(Basic)
