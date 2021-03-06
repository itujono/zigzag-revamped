import React, { useEffect, useState } from "react"
import { Row, Col, Form, Upload, message, Icon } from "antd"
import { Formik } from "formik"
import { SubmitButton, ResetButton } from "formik-antd"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"

import { upgradeConfirmation, fetchUpgradeCodeList } from "store/actions/userActions"
import { fetchBankAccounts } from "store/actions/otherActions"
import { Heading, Logo } from "components"
import { SelectInput, TextInput, DateInput } from "components/Fields"
import styled from "styled-components/macro"
import { confirmationSchema } from "pages/Checkout/validation"

const LogoRow = styled(Row)`
	margin-bottom: 2em;
	.ant-col {
		text-align: right;
	}
`

function UpgradeConfirmation({ bankAccountOptions, ...props }) {
	const { push } = useHistory()

	const { upgradeConfirmation, fetchUpgradeCodeList, fetchBankAccounts, upgradeCodeListOptions } = props
	const [file, setFile] = useState({})

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
		upgradeConfirmation(values, push).then(() => setSubmitting(false))
	}

	useEffect(() => {
		fetchUpgradeCodeList()
		fetchBankAccounts()
	}, [fetchBankAccounts, fetchUpgradeCodeList])

	return (
		<Row type="flex" justify="center" css="padding: 2em">
			<LogoRow type="flex" justify="center">
				<Col lg={24}>
					<Logo width="90" />
				</Col>
			</LogoRow>
			<Col lg={20}>
				<Heading
					content="Konfirmasi upgrade akun"
					subheader="Konfirmasi upgrade akun kamu di sini supaya cepat kami proses"
					marginBottom="3em"
				/>
				<Formik
					onSubmit={handleSubmitConfirmation}
					validationSchema={confirmationSchema}
					render={({ handleSubmit }) => (
						<Form layout="vertical" onSubmit={handleSubmit}>
							<SelectInput
								name="order_code"
								label="Kode order"
								placeholder="Masukkan kode order kamu..."
								options={upgradeCodeListOptions}
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
									<p className="ant-upload-text">Klik di sini atau drag file bukti transferan kamu</p>
									<p className="ant-upload-hint">File yang didukung: png, jpeg, jpg, pdf, bmp</p>
								</Upload.Dragger>
							</Form.Item>
							<SubmitButton>Konfirmasi sekarang</SubmitButton> &nbsp;{" "}
							<ResetButton type="link">Reset</ResetButton>
						</Form>
					)}
				/>
			</Col>
		</Row>
	)
}

const mapState = ({ user, other }) => ({
	upgradeCodeList: user.upgradeCodeList,
	upgradeCodeListOptions: user.upgradeCodeList.map(({ order_code }) => ({ value: order_code, label: order_code })),
	bankAccountOptions: other.bankAccountOptions
})

export default connect(mapState, { upgradeConfirmation, fetchUpgradeCodeList, fetchBankAccounts })(UpgradeConfirmation)
