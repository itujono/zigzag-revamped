import React from "react"
import { Section, Heading } from "components"
import { TextInput } from "components/Fields"
import { Formik } from "formik"
import { Form } from "antd"
import { SubmitButton } from "formik-antd"
import styled from "styled-components"
import { theme } from "styles"

const CancelSection = styled.div`
	padding: 2em;
	background-color: #f3f3f3;
	border-radius: 8px;
`

export default function CancelOrder({ data, cancelOrder }) {
	const { id: orderId, status_order } = data

	const cancelledByCustomer = status_order.status_id === 10

	const handleCancelOrder = (values, { setSubmitting }) => {
		values = { ...values, order_id: orderId }
		cancelOrder(values).finally(() => setSubmitting(false))
		console.log({ values })
	}

	return (
		<Section paddingHorizontal="0" style={{ paddingTop: 0 }}>
			{cancelledByCustomer && (
				<CancelSection>
					<Heading content="Kamu sudah membatalkan orderan ini" />
				</CancelSection>
			)}
			{!cancelledByCustomer && (
				<>
					<Heading
						content="Batal orderan ini"
						subheader="Kamu bisa mengajukan pembatalan order. Sebutkan alasannya di bawah"
					/>
					<Formik
						onSubmit={handleCancelOrder}
						render={({ handleSubmit }) => (
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
					/>
				</>
			)}
		</Section>
	)
}
