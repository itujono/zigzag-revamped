import React from "react"
import { Section, Heading, Button } from "components"
import { Row, Col, Typography, Divider, Form, List, Icon, Badge } from "antd"
import { pricer, media, mobile } from "helpers"
import styled from "styled-components"
import moment from "moment"
import { theme } from "styles"
import { Formik } from "formik"
import { TextInput } from "components/Fields"
import { SubmitButton } from "formik-antd"
import { depositData } from "helpers/dummy"

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
				font-weight: normal;
			}
			.amount {
				color: ${theme.color[0]};
			}
		}
	}
`

function Deposit({ amount = 350000 }) {
	return (
		<Section width="70%" centered>
			<Heading content="Deposit" bold marginBottom="3em" />
			<Row gutter={64}>
				<Col lg={10}>
					<PriceSection paddingHorizontal="0">
						<Text className="rp">Rp</Text> <Text>{pricer(amount)}</Text>
					</PriceSection>
					<Divider />
					<Section paddingHorizontal="0">
						<Formik
							render={({ handleSubmit }) => (
								<Form layout="vertical" onSubmit={handleSubmit}>
									<TextInput
										allowClear
										number
										name="amount"
										label="Saya mau deposit"
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
						dataSource={depositData}
						renderItem={item => (
							<ListItem>
								<Row>
									<Col lg={1}>
										<div>
											<Icon
												type="check-circle"
												theme="twoTone"
												twoToneColor="#52c41a"
												style={{ fontSize: 20 }}
											/>
										</div>
									</Col>
									<Col lg={23}>
										<List.Item.Meta
											title={
												<span>
													Kamu deposit sebesar{" "}
													<span className="amount">Rp {pricer(item.amount)}</span> &nbsp;{" "}
													<span className="time">{moment().fromNow()}</span>
												</span>
											}
											description={<Badge text="Sukses" status="success" />}
										/>
									</Col>
								</Row>
							</ListItem>
						)}
					/>
				</Col>
			</Row>
		</Section>
	)
}

export default Deposit
