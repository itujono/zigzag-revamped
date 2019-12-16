import React, { useEffect, useState } from "react"
import { Section, Heading, Card, ButtonLink } from "components"
import { TextInput, DateInput, SelectInput } from "components/Fields"
import { Row, Col, Form, Upload, message, Icon } from "antd"
import { connect } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { Formik } from "formik"
import { SubmitButton, ResetButton } from "formik-antd"

import { fetchBankAccounts, fetchOrderCodeList, orderConfirmation } from "store/actions/otherActions"
import { mobile } from "helpers"

function PaymentConfirmation({ bankAccountOptions, orderCodeOptions, ...props }) {
	const { push } = useHistory()
	const [file, setFile] = useState({})
	const { fetchOrderCodeList, fetchBankAccounts, orderConfirmation } = props

	const uploadProps = {
		multiple: false,
		name: "file",
		beforeUpload(file) {
			setFile(file)
			return false
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

	useEffect(() => {
		fetchBankAccounts()
		fetchOrderCodeList()
	}, [fetchBankAccounts, fetchOrderCodeList])

	return (
		<Section centered width="75%">
			<Card noHover padding={mobile ? "1.5em" : "4em"}>
				<Row>
					<Col lg={24}>
						<Heading
							content="Konfirmasi pembayaran"
							subheader="Konfirmasi pembayaran kamu di sini supaya cepat kami proses"
							marginBottom="3em"
						/>
						<Formik
							onSubmit={handleSubmitConfirmation}
							render={({ handleSubmit }) => (
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
										placeholder="Misal: 50000"
									/>
									<DateInput
										name="date"
										label="Tanggal ditransfer"
										placeholder="Pilih tanggal ketika kamu transfer"
									/>
									<Form.Item name="evidence_file" label="Bukti transfer">
										<Upload.Dragger {...uploadProps}>
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
									<SubmitButton>Konfirmasi sekarang</SubmitButton>
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
	const bankAccountOptions = other.bankAccounts.map(item => ({
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
