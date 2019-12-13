import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Formik } from "formik"
import { SubmitButton } from "formik-antd"
import { Link } from "react-router-dom"
import { List, Avatar, Row, Col, Icon, Form, Spin } from "antd"

import Drawer from "components/Drawer"
import Heading from "components/Heading"
import styled from "styled-components/macro"
import Button from "components/Button"
import { pricer } from "helpers"
import Section from "components/Section"
import { theme } from "styles"
import { TextInput } from "components/Fields"
import Empty from "components/Empty"
import { fetchCartItems, updateCartItem, deleteCartItem } from "store/actions/productActions"
import Loading from "components/Loading"

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
	padding-bottom: 2em;
	padding-top: 2em;
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

function CartDrawer({ onCartDrawer, data, handler, cartItems, cartTotal, loading, ...props }) {
	const { cartDrawer, setCartDrawer, setCartDrawerFromStore, cartDrawerFromStore } = onCartDrawer
	const { fetchCartItems, deleteCartItem, updateCartItem } = props

	const token = localStorage.getItem("access_token")

	const itemCount = cartTotal && cartTotal.qty > 0 ? `(${cartTotal.qty} item)` : `(masih kosong)`
	// const itemCount = cartTotal.qty === 0 ? `(Masih kosong)` : `(${cartTotal.qty} item)`

	const handleClose = () => {
		setCartDrawerFromStore(false)
		setCartDrawer(false)
	}

	const handleDeleteCart = (cart_id, name) => deleteCartItem({ cart_id }, name)

	const handleGoToCheckout = () => {
		setCartDrawer(false)
		localStorage.setItem("cartDrawerFromStore", false)
	}

	useEffect(() => {
		if (token) fetchCartItems()
	}, [fetchCartItems, token])

	console.log(String(cartTotal.weight))

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
			<Heading content={`Cart kamu ${itemCount}`} level={4} bold />
			{loading ? (
				<Loading />
			) : (
				<List
					itemLayout="horizontal"
					dataSource={cartItems}
					locale={{
						emptyText: <Empty isEmptyItems description="Masih belum ada apa-apa di cart kamu nih" />
					}}
					loading={loading}
					renderItem={({ product_data, ...item }) => {
						const quantity = Number(item.qty)
						const price = (product_data.product_price || {}).price
						const photo = (product_data.product_image || [])[0] || {}
						const name = (product_data.products || {}).name || "-"

						const handleUpdateCart = (values, { setSubmitting }) => {
							values = {
								qty: values.qty,
								cart_id: item.id,
								weight: item.weight,
								total_price: values.qty * price
							}

							updateCartItem(values, name).finally(() => setSubmitting(false))
						}

						return (
							<CartItem>
								<List.Item.Meta
									avatar={<Avatar src={photo.picture} shape="square" className="product-photo" />}
									title={
										<p style={{ marginBottom: 0 }}>
											<Link to={`/product/${item.id}-${name}`}>{name}</Link> &middot;{" "}
											<span>
												Rp {pricer(price)} / pcs &middot;{" "}
												<span css="color: #999;">{item.color}</span>{" "}
												{item.size !== 0 && <span css="color: #999;">(size {item.size})</span>}
											</span>
										</p>
									}
									description={
										<Row>
											<Col lg={24}>
												<Formik
													onSubmit={handleUpdateCart}
													initialValues={{ qty: Number(item.qty) }}
													render={({ handleSubmit }) => (
														<Form layout="inline" onSubmit={handleSubmit}>
															<TextInput
																number
																name="qty"
																width={90}
																placeholder="Jumlah..."
																css="margin-bottom: 1.5em"
															/>
															<Form.Item>
																<SubmitButton type="primary">Update</SubmitButton>
															</Form.Item>
															<Form.Item>
																<Button
																	type="danger"
																	shape={null}
																	icon="delete"
																	onClick={() => handleDeleteCart(item.id, name)}
																>
																	Hapus
																</Button>
															</Form.Item>
														</Form>
													)}
												/>
												<p className="price-weight">
													Rp {pricer(item.total_price)} &middot;{" "}
													<span>{item.weight * quantity} gram</span>
												</p>
											</Col>
										</Row>
									}
								/>
							</CartItem>
						)
					}}
				/>
			)}
			<SubtotalSection>
				<Row type="flex" justify="space-between" gutter={32}>
					<Col lg={16}>
						<Heading
							content="Subtotal"
							subheader="Ongkir dan biaya lainnya akan dikalkulasikan di bagian Checkout"
						/>
					</Col>
					<Col lg={8} style={{ textAlign: "right" }}>
						<Heading
							content={`Rp ${cartItems.length === 0 ? 0 : pricer(cartTotal.price)}`}
							subheader={`${cartTotal.weight || 0} gram`}
							className="price"
						/>
					</Col>
				</Row>
				<Link to="/checkout">
					<Button block size="large" disabled={cartItems.length === 0} onClick={handleGoToCheckout}>
						Lanjut ke Checkout &nbsp; <Icon type="right" />
					</Button>
				</Link>
			</SubtotalSection>
		</Drawer>
	)
}

const mapState = ({ product }) => ({
	cartItems: product.cartItems,
	cartTotal: product.cartTotal || {},
	loading: product.loading
})

export default connect(mapState, { fetchCartItems, updateCartItem, deleteCartItem })(CartDrawer)
