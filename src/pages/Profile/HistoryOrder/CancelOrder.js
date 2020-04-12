import React from "react"
import { Section, Heading } from "components"
import { TextInput } from "components/Fields"
import { Formik } from "formik"
import { Form } from "antd"
import { SubmitButton } from "formik-antd"
import styled from "styled-components"

const CancelSection = styled.div`
	padding: 2em;
	background-color: #f3f3f3;
	border-radius: 8px;
`

export default function CancelOrder({ data, cancelOrder }) {
	const { status_order } = data

	const cantCancel = status_order.status_id !== 1
	const canceledByCustomer = status_order.status_id === 10

	return (
		<Section paddingHorizontal="0" style={{ paddingTop: 0 }}>
			{cantCancel && (
				<CancelSection>
					<Heading
						content={
							canceledByCustomer
								? "Kamu sudah membatalkan pesanan ini :("
								: "Kamu sudah tidak bisa membatalkan orderan ini"
						}
					/>
				</CancelSection>
			)}
			{!cantCancel && (
				<>
					<Heading
						content="Batal orderan ini"
						subheader="Kamu bisa mengajukan pembatalan order. Sebutkan alasannya di bawah"
					/>
					<Formik onSubmit={cancelOrder} initialValues={{ remark_cancel: "" }}>
						{({ handleSubmit }) => (
							<Form layout="vertical" onSubmit={handleSubmit}>
								<TextInput
									textarea
									rows={3}
									name="remark_cancel"
									label="Alasan pembatalan"
									placeholder="Jelaskan dengan singkat dan jelas..."
								/>
								<SubmitButton>Batal orderan ini sekarang</SubmitButton>
							</Form>
						)}
					</Formik>
				</>
			)}
		</Section>
	)
}
