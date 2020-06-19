import React, { useEffect, useState } from "react"
import { Formik } from "formik"
import { Form, Divider, Button, Row, Col, Avatar, Affix, Upload } from "antd"
import { connect } from "react-redux"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { ResetButton, SubmitButton } from "formik-antd"

import { Section, Heading, Loading, Card, ButtonLink, Alert, DynamicIcon } from "components"
import { TextInput, SelectInput } from "components/Fields"
import { fetchUser, updateUserProfile, changeAvatar } from "store/actions/userActions"
import { fetchProvinces, fetchCities, fetchSubdistricts } from "store/actions/rajaOngkirActions"
import levitate from "assets/gifs/levitate.gif"
import { media, mobile } from "helpers"

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

const CsCard = styled(Card)`
	&& {
		margin-bottom: 2em;
	}
	.ant-card-body {
		padding-left: 0;
		.ant-col {
			&:first-child {
				padding-right: 1em;
			}
			img {
				height: 100%;
				object-fit: cover;
			}
		}
	}

	${media.mobile`
		.ant-card-body {
			padding-left: 2em;
		}
	`}
`

const CsHeading = styled(Heading)`
	> h4.ant-typography {
		font-size: 1.6em;
		margin-bottom: 1.5em;
		line-height: 1.2;
	}
`

const StyledAvatar = styled(Avatar)`
	&& {
		width: 100px;
		height: 100px;
	}
`

const StyledUpload = styled(Upload)`
	.ant-upload-list {
		margin-bottom: ${({ file }) => Object.keys(file).length > 0 && "2em"};
	}
`

function Basic({ provinceOptions, cityOptions, subdistrictOptions, user, loading, ...props }) {
	const { fetchUser, fetchCities, fetchProvinces, fetchSubdistricts, updateUserProfile, changeAvatar } = props
	const { customer_service: cs = {}, customer_upgrade = {} } = user
	const upgradeStatus = (customer_upgrade.status || {}).status_id || 0
	const [media, setMedia] = useState({})

	const handleRenderCities = (value) => fetchCities(value)
	const handleRenderSubdistricts = (value) => fetchSubdistricts(value)
	const csWhatsappNumber = (cs.whatsapp || "").startsWith("0")
		? "62" + (cs.whatsapp || "").slice(1)
		: cs.whatsapp || ""
	const accountType = (user.acc_type || {}).account_type_remark
	const accountTypeText = (
		<span>
			Kamu adalah member {accountType}{" "}
			{(accountType === "VIP" && "🔥") ||
				(accountType === "Reguler" && upgradeStatus !== 3 && <Link to="/upgrade">Upgrade akun?</Link>) ||
				null}
		</span>
	)

	const csDetails = (
		<div>
			<Row gutter={20} type="flex" align="middle">
				<Col lg={4} xs={6}>
					<DynamicIcon type="icon-social-whatsapp" />
				</Col>
				<Col lg={20} xs={18}>
					<Heading
						content="Whatsapp"
						marginBottom="0"
						subheader={
							<a
								target="blank"
								rel="noopener noreferrer"
								href={`https://wa.me/${csWhatsappNumber}?text=${encodeURIComponent(
									`Halo, ${cs.name || ""}. Saya mau tanya...`
								)}`}
							>
								{cs.whatsapp}
							</a>
						}
						reverse
					/>
				</Col>
			</Row>
			<Row gutter={20} type="flex" align="middle">
				<Col lg={4} xs={6}>
					<DynamicIcon type="icon-lineicon_gongzuoquyu" />
				</Col>
				<Col lg={20} xs={18}>
					<Heading content="Line" marginBottom="0" subheader={cs.line} reverse />
				</Col>
			</Row>
		</div>
	)

	const handleUpdate = (values, { setSubmitting }) => {
		updateUserProfile(values).finally(() => setSubmitting(false))
	}

	const handleBeforeUpload = (media) => {
		setMedia(media)
		return false
	}

	const handleUpload = () => {
		const formData = new FormData()
		formData.append("photo_file", media)
		changeAvatar(formData)
	}

	useEffect(() => {
		fetchUser()
		fetchProvinces()
	}, [fetchProvinces, fetchUser])

	if (!user || Object.keys(user).length === 0) return <Loading />

	return (
		<Section centered>
			<Row gutter={32}>
				<Col lg={16}>
					<Heading content="Basic" bold />
					<Form.Item {...tailLayout}>
						<Row style={{ marginBottom: "3em" }} type="flex" align="middle" gutter={32}>
							<Col lg={8}>
								<StyledAvatar src={user.picture} />
							</Col>
							<Col lg={16}>
								<StyledUpload
									multiple={false}
									beforeUpload={handleBeforeUpload}
									onRemove={() => setMedia({})}
									file={media}
									accept="image/*"
								>
									<ButtonLink icon="upload">Ganti avatar...</ButtonLink>
								</StyledUpload>
								{Object.keys(media).length > 0 && (
									<Button onClick={handleUpload}>Upload sekarang</Button>
								)}
							</Col>
						</Row>
					</Form.Item>
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
									autocomplete
									name="province"
									label="Provinsi kamu"
									placeholder="Pilih salah satu..."
									onChange={handleRenderCities}
									options={provinceOptions}
								/>
								<SelectInput
									autocomplete
									name="city"
									label="Kota/kabupaten kamu"
									placeholder="Pilih salah satu..."
									onChange={handleRenderSubdistricts}
									options={cityOptions}
								/>
								<SelectInput
									autocomplete
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
					<Affix offset={mobile ? -20 : 30}>
						<CsCard>
							<Row type="flex">
								<Col lg={12}>
									<img src={levitate} width="100%" alt="CS kamu" />
								</Col>
								<Col lg={12}>
									<CsHeading content={`Halo, sis! Saya ${cs.name || ""}`} subheader={csDetails} />
								</Col>
							</Row>
						</CsCard>
						{upgradeStatus === 2 && (
							<Alert
								type="warning"
								message="Konfirmasi upgrade akun?"
								description={
									<span>
										Kamu sudah mengajukan upgrade akun, tapi kamu{" "}
										<strong>belum melakukan konfirmasi pembayaran</strong> upgrade akun. Kalo kamu
										sudah melakukan pembayaran, silakan{" "}
										<Link to="/upgrade/confirmation">konfirmasi sekarang</Link>
									</span>
								}
								showIcon
							/>
						)}
					</Affix>
				</Col>
			</Row>
		</Section>
	)
}

const mapState = ({ user, rajaOngkir }) => ({
	user: user.user,
	loading: user.loading,
	provinceOptions: rajaOngkir.provinceOptions.map((item) => ({ value: item.value, text: item.label })),
	cityOptions: rajaOngkir.cityOptions.map((item) => ({ value: item.value, text: item.label })),
	subdistrictOptions: rajaOngkir.subdistrictOptions.map((item) => ({ value: item.value, text: item.label }))
})

const actions = { fetchUser, fetchCities, fetchSubdistricts, fetchProvinces, updateUserProfile, changeAvatar }

export default connect(mapState, actions)(Basic)
