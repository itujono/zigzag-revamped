import React from "react"
import { List, Avatar, Tooltip, Icon, Row, Col, Form } from "antd"
import { Formik } from "formik"
import styled from "styled-components"
import { SubmitButton } from "formik-antd"

import { Section, Heading, Button, ButtonLink } from "components"
import { cartItems } from "helpers/dummy"
import { pricer } from "helpers"
import { TextInput } from "components/Fields"

const CartItem = styled(List.Item)`
	.ant-list-item-meta-avatar {
		margin-right: 24px;
		.product-photo {
			width: 60px;
			height: 80px;
		}
	}
	.ant-list-item-meta-title {
		.delete {
			cursor: pointer;
		}
	}
	.price-weight {
		font-weight: bold;
		span {
			font-weight: normal;
		}
	}
`

export default function Wishlist() {
	return (
		<Section centered width="70%">
			<Heading content="Wishlist" subheader="Daftar item-item yang kamu suka/simpan" />
			<List
				itemLayout="horizontal"
				dataSource={cartItems}
				renderItem={item => (
					<CartItem>
						<List.Item.Meta
							avatar={<Avatar src={item.photo} shape="square" className="product-photo" />}
							title={
								<p style={{ marginBottom: 0 }}>
									<a href="https://ant.design">{item.name}</a> &middot;{" "}
									<span>Rp {pricer(item.price)} / pcs &middot; &nbsp; &nbsp;</span>
								</p>
							}
							description={
								<Row>
									<Col lg={24}>
										{/* <Formik
											initialValues={{ quantity: item.quantity }}
											render={({ handleSubmit }) => (
												<Form layout="inline" onSubmit={handleSubmit}>
													<TextInput
														number
														name="quantity"
														width={90}
														placeholder="Jumlah..."
														css="margin-bottom: 1.5em"
													/>
													<Form.Item>
														<SubmitButton type="primary">Update</SubmitButton>
													</Form.Item>
												</Form>
											)}
										/> */}
										<p className="price-weight">
											Rp {pricer(item.quantity * item.price)} &middot;{" "}
											<span>{item.weight * item.quantity} gram</span>
										</p>
										<Button type="dashed" icon="delete">
											Hapus dari wishlist
										</Button>
									</Col>
								</Row>
							}
						/>
						<Button icon="plus">Tambah ke cart</Button>
					</CartItem>
				)}
			/>
		</Section>
	)
}
