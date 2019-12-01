import React from "react"
import { Section, Heading, Card, ButtonLink } from "components"
import { TextInput, DateInput, SelectInput } from "components/Fields"
import { Row, Col, Form, Upload, message, Icon } from "antd"
import { Formik } from "formik"
import { SubmitButton, ResetButton } from "formik-antd"
import { mobile } from "helpers"

export default function PaymentConfirmation() {
	const props = {
		name: "file",
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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
							render={({ handleSubmit }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									<SelectInput
										name="order_code"
										label="Kode order"
										placeholder="Masukkan kode order kamu..."
										options={[]}
									/>
									<SelectInput
										name="bank_receiver"
										label="Nomor rekening Zigzag yang kamu transfer"
										placeholder="Pilih salah satu rekening nya..."
										options={[]}
									/>
									<TextInput name="bank_sender" label="Bank pengirim" placeholder="Misal: BCA" />
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
									<Form.Item label="Bukti transfer">
										<Upload.Dragger {...props}>
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
									<SubmitButton>Konfirmasi sekarang</SubmitButton> &nbsp;{" "}
									<ResetButton type="link">Reset</ResetButton>
								</Form>
							)}
						/>
					</Col>
				</Row>
			</Card>
			<Section centered textAlign="center">
				<ButtonLink icon="home">Kembali ke Home</ButtonLink>
			</Section>
		</Section>
	)
}
