import React from "react"
import Drawer from "components/Drawer"
import Heading from "components/Heading"
import { List, Avatar, Row, Col, Icon, Form, Tooltip } from "antd"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import Button from "components/Button"
import { pricer } from "helpers"
import { cartItems } from "helpers/dummy"
import Section from "components/Section"
import { theme } from "styles"
import { TextInput } from "components/Fields"
import { Formik } from "formik"
import { SubmitButton } from "formik-antd"

const SubtotalSection = styled(Section).attrs({
	paddingHorizontal: "0"
})`
	border-top: 1px solid ${theme.greyColor[3]};
	position: sticky;
	bottom: 0;
	left: 0;
	z-index: 2;
	background-color: #fff;
	.ant-typography {
		h4 {
			font-size: 1em;
		}
		> div {
			font-size: 0.9em;
			color: ${theme.greyColor[1]};
		}
	}
	.price {
		font-weight: bold;
		> div {
			font-weight: normal;
		}
	}
`

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

export default function CartDrawer({ onCartDrawer }) {
	const { cartDrawer, setCartDrawer, setCartDrawerFromStore, cartDrawerFromStore } = onCartDrawer

	const handleClose = () => {
		setCartDrawerFromStore(false)
		setCartDrawer(false)
	}

	return (
		<Drawer
			placement="right"
			closable={false}
			width={540}
			onClose={handleClose}
			visible={cartDrawer}
			css={`
				.ant-drawer-body {
					padding: 2em 3em;
					height: 100%;
					overflow-y: auto;
				}
			`}
		>
			<Heading content="Cart kamu" level={4} bold />
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
									<span>
										Rp {pricer(item.price)} / pcs &middot; &nbsp; &nbsp;
										<Tooltip title="Hapus" placement="right">
											<span className="delete">
												<Icon type="delete" />
											</span>
										</Tooltip>
									</span>
								</p>
							}
							description={
								<Row>
									<Col lg={24}>
										<Formik
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
										/>
										<p className="price-weight">
											Rp {pricer(item.quantity * item.price)} &middot;{" "}
											<span>{item.weight * item.quantity} gram</span>
										</p>
									</Col>
								</Row>
							}
						/>
					</CartItem>
				)}
			/>
			<SubtotalSection>
				<Row type="flex" justify="space-between" gutter={32}>
					<Col lg={16}>
						<Heading
							content="Subtotal"
							subheader="Ongkir dan biaya lainnya akan dikalkulasikan di bagian Checkout"
						/>
					</Col>
					<Col lg={8} style={{ textAlign: "right" }}>
						<Heading content="Rp 560,000" subheader="2400 gram" className="price" />
					</Col>
				</Row>
				<Link to="/checkout">
					<Button block size="large">
						Lanjut ke Checkout &nbsp; <Icon type="right" />
					</Button>
				</Link>
			</SubtotalSection>
		</Drawer>
	)
}
