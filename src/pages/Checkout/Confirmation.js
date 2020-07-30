import React, { useEffect, useState } from "react"
import { Section, Heading, Card, ButtonLink, Logo, Empty, Button } from "components"
import { TextInput, DateInput, SelectInput } from "components/Fields"
import { Row, Col, Form, Upload, message, Icon } from "antd"
import { connect } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { Formik } from "formik"
import { SubmitButton } from "formik-antd"
import styled from "styled-components"

import { fetchBankAccounts, fetchOrderCodeList, orderConfirmation } from "store/actions/otherActions"
import { mobile } from "helpers"
import { confirmationSchema } from "./validation"

const LogoRow = styled(Row)`
	margin-bottom: 2em;
	.ant-col {
		text-align: right;
	}
`

function PaymentConfirmation({ bankAccountOptions, orderCodeOptions, ...props }) {
	const { push } = useHistory()
	const [file, setFile] = useState({})
	const { fetchOrderCodeList, fetchBankAccounts, orderConfirmation } = props

	const uploadProps = {
		multiple: false,
		name: "file",
		beforeUpload(file) {
			const lowerThan2mb = file.size / 1024 / 1024 < 2
			if (!lowerThan2mb) {
				message.error("File image nya gak boleh lebih dari 2 MB ya")
				setFile({})
			} else setFile(file)
			return lowerThan2mb
		},
		onChange(info) {
			const { status } = info.file
			if (status !== "uploading") {
				console.log(info.file, info.fileList)
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`)
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`)
			}
		}
	}

	const handleSubmitConfirmation = (values, { setSubmitting }) => {
		values = { ...values, bank_number_sender: values.bank_sender, evidence_file: file }
		orderConfirmation(values, push).then(() => setSubmitting(false))
	}

	if (!localStorage.getItem("access_token")) push("/404")

	useEffect(() => {
		fetchBankAccounts()
		fetchOrderCodeList()
	}, [fetchBankAccounts, fetchOrderCodeList])

	if (orderCodeOptions.length === 0) {
		return (
			<Section centered width="75%">
				<Card noHover padding={mobile ? "1.5em" : "4em"}>
					<LogoRow type="flex" justify="center">
						<Col lg={24}>
							<Logo width="90" />
						</Col>
					</LogoRow>
					<Row>
						<Col lg={24}>
							<Heading
								bold
								content="Konfirmasi pembayaran"
								subheader="Konfirmasi pembayaran kamu di sini supaya cepat kami proses"
								marginBottom="3em"
							/>
							<Empty description="Tidak ada yang perlu dikonfirmasi untuk sekarang">
								<Button onClick={() => push("/")}>Balik ke Home</Button>
							</Empty>
						</Col>
					</Row>
				</Card>
			</Section>
		)
	}

	return (
		<Section centered width="75%">
			<Card noHover padding={mobile ? "1.5em" : "4em"}>
				<LogoRow type="flex" justify="center">
					<Col lg={24}>
						<Logo width="90" />
					</Col>
				</LogoRow>
				<Row>
					<Col lg={24}>
						<Heading
							bold
							content="Konfirmasi pembayaran"
							subheader="Konfirmasi pembayaran kamu di sini supaya cepat kami proses"
							marginBottom="3em"
						/>
						<Formik
							onSubmit={handleSubmitConfirmation}
							validationSchema={confirmationSchema}
							render={({ handleSubmit, isValid }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									<SelectInput
										name="order_code"
										label="Kode order"
										placeholder="Masukkan kode order kamu..."
										options={orderCodeOptions}
										helpText="Silakan lihat kode order yang mau dipilih di inbox email kamu"
									/>
									<SelectInput
										name="bank_receiver"
										label="Nomor rekening Zigzag yang kamu transfer"
										placeholder="Pilih salah satu rekening nya..."
										options={bankAccountOptions}
									/>
									<TextInput
										name="bank_sender"
										label="Bank pengirim"
										placeholder="Misal: BCA 111.9332.2243"
									/>
									<TextInput
										name="total_transfer"
										label="Jumlah yang ditransfer (Rp)"
										placeholder="Misal: 100091"
									/>
									<DateInput
										name="date"
										label="Tanggal ditransfer"
										placeholder="Pilih tanggal ketika kamu transfer"
									/>
									<Form.Item name="evidence_file" label="Bukti transfer">
										<Upload.Dragger {...uploadProps} showUploadList={false} accept="image/*,.pdf">
											<p className="ant-upload-drag-icon">
												<Icon type="inbox" />
											</p>
											<p className="ant-upload-text">
												Klik di sini atau drag file bukti transferan kamu
											</p>
											<p className="ant-upload-hint">
												File yang didukung: png, jpeg, jpg, pdf, bmp
											</p>
										</Upload.Dragger>
									</Form.Item>
									<SubmitButton disabled={!isValid || Object.keys(file).length === 0}>
										Konfirmasi sekarang
									</SubmitButton>
								</Form>
							)}
						/>
					</Col>
				</Row>
			</Card>
			<Section centered textAlign="center">
				<Link to="/">
					<ButtonLink icon="home">Kembali ke Home</ButtonLink>
				</Link>
			</Section>
		</Section>
	)
}

const mapState = ({ other }) => {
	const bankAccountOptions = other.bankAccounts.map((item) => ({
		value: `${item.bank_name} ${item.bank_account}`,
		label: `${item.bank_name} ${item.bank_account} an ${item.under_name}`
	}))

	return {
		orderCodeOptions: other.orderCodeOptions,
		bankAccounts: other.bankAccounts,
		bankAccountOptions
	}
}

export default connect(mapState, { fetchBankAccounts, fetchOrderCodeList, orderConfirmation })(PaymentConfirmation)
