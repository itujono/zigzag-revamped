import React, { useEffect } from "react"
import { Row, Col, Typography, Divider, Form, List, Icon, Badge } from "antd"
import styled from "styled-components"
import moment from "moment"
import { SubmitButton } from "formik-antd"
import { Formik } from "formik"
import { connect, useDispatch, useSelector } from "react-redux"
import * as yup from "yup"

import { fetchListDeposit, addNewDeposit } from "store/actions/userActions"
import { Section, Heading } from "components"
import { pricer, media, mobile } from "helpers"
import { theme } from "styles"
import { TextInput } from "components/Fields"
import { Link } from "react-router-dom"

const { Text } = Typography

const PriceSection = styled(Section)`
	${media.mobile`
		&&& {
			padding-top: 0;
			padding-bottom: 0;
		}
	`}
	&& {
		font-size: 3em;
		padding-top: 0;
		padding-bottom: 0;
		margin-bottom: 0;
	}
	.ant-typography:not(.rp) {
		color: ${theme.color[0]};
		top: 10px;
	}
	.rp {
		font-size: initial;
		vertical-align: super;
		color: ${theme.greyColor[0]};
	}
`

const ListItem = styled(List.Item)`
	.ant-list-item-meta {
		.ant-list-item-meta-title {
			.time {
				color: ${theme.greyColor[2]};
			}
			.amount {
				color: ${theme.color[0]};
			}
		}
	}

	${media.mobile`
		.ant-list-item-meta {
			.ant-list-item-meta-title {
				.time {
					display: block;
				}
			}
		}
	`}
`

function Deposit() {
	const dispatch = useDispatch()
	const depositList = useSelector(({ user }) => user.depositList)
	const depositBalance = useSelector(({ user }) => user.depositBalance.deposit)
	const loading = useSelector(({ user }) => user.loading)

	useEffect(() => {
		dispatch(fetchListDeposit())
	}, [dispatch])

	return (
		<Section width="80%" centered>
			<Heading content="Deposit" bold marginBottom="3em" />
			<Row gutter={64}>
				<Col lg={10}>
					<PriceSection paddingHorizontal="0">
						<Text className="rp">Rp</Text> <Text>{pricer(depositBalance)}</Text>
					</PriceSection>
					<Divider />
					<Section paddingHorizontal="0">
						<Formik
							onSubmit={(values, { setSubmitting }) => {
								setSubmitting(false)
								dispatch(addNewDeposit(values))
							}}
							validationSchema={validationSchema}
							render={({ handleSubmit }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									<TextInput
										allowClear
										number
										name="total_deposit"
										label="Saya mau deposit"
										helpText="Tulis angka saja (tidak perlu titik atau koma)"
										placeholder="Minimal Rp 50.000 ya"
									/>
									<SubmitButton submit type="primary" icon="check">
										Oke, deposit sekarang
									</SubmitButton>
								</Form>
							)}
						/>
					</Section>
				</Col>
				<Col lg={14} style={{ borderLeft: !mobile && "1px solid #ddd" }}>
					<List
						itemLayout="horizontal"
						dataSource={depositList}
						loading={loading}
						locale={{ emptyText: "Kamu belum ada ngelakuin deposit" }}
						renderItem={({ status, deposit_code, ...item }) => {
							const statusId = status.status_id
							const deducted = statusId === 4
							const deductedByAdmin = statusId === 7
							const actionLabel = deductedByAdmin
								? `Dikurangi sebesar `
								: `Kamu ${deducted ? "belanja" : "deposit"} sebesar `
							const statusDepo =
								statusId === 1 ? "warning" : statusId === 6 || statusId === 2 ? "error" : "success"

							return (
								<ListItem>
									<Row>
										{!mobile && (
											<Col lg={2}>
												<div>
													<Icon
														type="check-circle"
														theme="twoTone"
														twoToneColor="#52c41a"
														style={{ fontSize: 20 }}
													/>
												</div>
											</Col>
										)}
										<Col lg={22}>
											<List.Item.Meta
												title={
													<Typography>
														{actionLabel}
														<span className="amount">
															Rp {pricer(item.total)}
														</span> &nbsp;{" "}
														<span className="time">
															{moment(item.created_date).fromNow()}
														</span>
													</Typography>
												}
												description={
													<div>
														<Badge
															text={status.status_remark}
															status={statusDepo}
															style={{ marginBottom: "1em", display: "block" }}
														/>
														{statusId === 1 && (
															<Link
																to={{
																	pathname: "/deposit/confirmation",
																	state: { depositCode: deposit_code }
																}}
															>
																Konfirmasi deposit sekarang&nbsp;
																<Icon type="right" />
															</Link>
														)}
													</div>
												}
											/>
										</Col>
									</Row>
								</ListItem>
							)
						}}
					/>
				</Col>
			</Row>
		</Section>
	)
}

const validationSchema = yup.object().shape({
	total_deposit: yup
		.number()
		.required("Jangan dibiarin kosong ya")
		.min(50000, "Minimal Rp 50.000 ya")
		.typeError("Harus masukin angka aja ya")
})

export default Deposit
