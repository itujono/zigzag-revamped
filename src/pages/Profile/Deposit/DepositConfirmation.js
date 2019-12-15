import React, { useEffect, useState } from "react"
import { Row, Col, Form, Upload, message, Icon } from "antd"
import { Formik } from "formik"
import { SubmitButton, ResetButton, FormikDebug } from "formik-antd"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"

import { fetchListDeposit, depositConfirmation } from "store/actions/userActions"
import { fetchBankAccounts } from "store/actions/otherActions"
import { Heading, Layout } from "components"
import { SelectInput, TextInput, DateInput } from "components/Fields"
import styled from "styled-components/macro"

function DepositConfirmation({ bankAccountOptions, depositCodeOptions, ...props }) {
	const { push } = useHistory()

	const { fetchBankAccounts, depositConfirmation, fetchListDeposit } = props
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
		depositConfirmation(values, push).finally(() => setSubmitting(false))
	}

	useEffect(() => {
		fetchListDeposit()
		fetchBankAccounts()
	}, [fetchBankAccounts, fetchListDeposit])

	return (
		<Layout>
			<Row type="flex" justify="center" css="padding: 2em">
				<Col lg={16}>
					<Heading
						content="Konfirmasi deposit"
						subheader="Konfirmasi deposit kamu di sini supaya cepat kami proses"
						marginBottom="3em"
					/>
					<Formik
						onSubmit={handleSubmitConfirmation}
						render={({ handleSubmit, isValid }) => (
							<Form layout="vertical" onSubmit={handleSubmit}>
								<SelectInput
									name="deposit_code"
									label="Kode deposit"
									placeholder="Masukkan kode deposit kamu..."
									options={depositCodeOptions}
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
									name="transfer_date"
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
		</Layout>
	)
}

const mapState = ({ user, other }) => ({
	depositCodeOptions: user.depositCodeOptions,
	bankAccountOptions: other.bankAccountOptions
})

export default connect(mapState, { fetchListDeposit, fetchBankAccounts, depositConfirmation })(DepositConfirmation)