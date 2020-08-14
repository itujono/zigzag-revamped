import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import { SubmitButton } from "formik-antd"
import { Link } from "react-router-dom"
import { List, Avatar, Row, Col, Icon, Form, Tooltip, message } from "antd"

import Drawer from "components/Drawer"
import Heading from "components/Heading"
import styled from "styled-components/macro"
import Button from "components/Button"
import { pricer, mobile, media } from "helpers"
import Section from "components/Section"
import { theme } from "styles"
import { TextInput } from "components/Fields"
import Empty from "components/Empty"
import { fetchCartItems, updateCartItem, deleteCartItem } from "store/actions/productActions"
import Loading from "components/Loading"

function CartDrawer({ onCartDrawer }) {
	const { cartDrawer, setCartDrawer, setCartDrawerFromStore } = onCartDrawer
	const dispatch = useDispatch()
	const cartItems = useSelector(({ product }) => product.cartItems)
	const cartTotal = useSelector(({ product }) => product.cartTotal)
	const loading = useSelector(({ product }) => product.loadingCart)

	const token = localStorage.getItem("access_token")

	const itemCount = cartTotal && cartTotal.qty > 0 ? `(${cartTotal.qty} item)` : `(masih kosong)`
	const subtotal = cartItems.length === 0 ? 0 : cartTotal.price - (cartTotal.discount || 0)
	const roundedWeight = (
		<p>
			<Tooltip
				placement="left"
				title="Kenapa dibulatkan? Karena kami bekerjasama dengan ekspedisi-ekspedisi yang mempunyai ketetapan/peraturan demikian"
			>
				<Icon type="question-circle" theme="filled" />
			</Tooltip>{" "}
			&nbsp;
			{cartTotal.roundedWeight || 0} gram
		</p>
	)

	const handleClose = () => {
		setCartDrawerFromStore(false)
		setCartDrawer(false)
	}

	const handleDeleteCart = (cart_id, name) => dispatch(deleteCartItem({ cart_id }, name))

	const handleGoToCheckout = () => {
		setCartDrawer(false)
		localStorage.setItem("cartDrawerFromStore", false)
	}

	useEffect(() => {
		if (token) dispatch(fetchCartItems())
	}, [dispatch, token])

	return (
		<Drawer
			placement="right"
			closable={mobile}
			width={mobile ? "100%" : 540}
			onClose={handleClose}
			visible={cartDrawer}
			css={`
				.ant-drawer-body {
					padding: 2em 0;
					height: 100%;
					overflow-y: auto;
				}
			`}
		>
			<Heading bold content={`Cart kamu ${itemCount}`} level={4} className="px3em px1em__mobile" />
			{loading ? (
				<Loading />
			) : (
				<List
					itemLayout="horizontal"
					dataSource={cartItems}
					className="px3em px1em__mobile"
					locale={{
						emptyText: <Empty isEmptyItems description="Masih belum ada apa-apa di cart kamu nih" />
					}}
					loading={loading}
					renderItem={({ product_data, product_total_price, ...item }) => {
						const quantity = Number(item.product_qty)
						const price = (item.product_price || {}).price
						const photo = (product_data.product_image || [])[0] || {}
						const name = item.product_name || "-"
						const stock = product_data.product_detail?.stock

						const handleUpdateCart = (values, { setSubmitting }) => {
							values = {
								qty: values.qty,
								cart_id: item.cart_id,
								weight: item.weight_per_pcs * values.qty,
								total_price: values.qty * price
							}

							if (values.qty > stock) {
								setSubmitting(false)
								return message.error("Stock nggak cukup")
							}

							dispatch(updateCartItem(values, name)).finally(() => setSubmitting(false))
						}

						return (
							<CartItem>
								<List.Item.Meta
									avatar={<Avatar src={photo.picture} shape="square" className="product-photo" />}
									title={
										<p style={{ marginBottom: 0 }}>
											<Link to={`/product/${item.product_id}-${name}`}>{name}</Link> &middot;{" "}
											<span>
												Rp {pricer(price)} / pcs &middot;{" "}
												<span css="color: #999;">{item.product_color}</span>{" "}
												{item.product_size !== 0 && (
													<span css="color: #999;">(size {item.product_size})</span>
												)}
											</span>
										</p>
									}
									description={
										<Row>
											<Col lg={24}>
												<Formik
													onSubmit={handleUpdateCart}
													initialValues={{ qty: Number(item.product_qty) }}
												>
													{({ handleSubmit }) => (
														<Form layout="inline" onSubmit={handleSubmit}>
															<TextInput
																number
																name="qty"
																width={90}
																marginBottom={mobile && "0"}
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
																	onClick={() => handleDeleteCart(item.cart_id, name)}
																>
																	Hapus
																</Button>
															</Form.Item>
														</Form>
													)}
												</Formik>
												<p className="price-weight">
													Rp {pricer(product_total_price)} &middot;{" "}
													<span>{item.weight_per_pcs * quantity} gram</span>
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
				<Row type="flex" justify="space-between" align="middle" gutter={32}>
					<Col lg={16} xs={12}>
						<Heading content="Diskon" subheader="Jika kamu berhak dapat diskon, akan muncul di sini" />
					</Col>
					<Col lg={8} xs={12} style={{ textAlign: "right" }}>
						<Heading content={`- Rp ${pricer(cartTotal.discount || 0) || 0}`} className="discount" />
					</Col>
				</Row>
				<Row type="flex" justify="space-between" gutter={32}>
					<Col lg={16} xs={12}>
						<Heading
							content="Subtotal"
							subheader="Ongkir dan biaya lainnya akan dikalkulasikan di bagian Checkout"
						/>
					</Col>
					<Col lg={8} xs={12} style={{ textAlign: "right" }}>
						<Heading content={`Rp ${pricer(subtotal)}`} subheader={roundedWeight} className="price" />
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

export default CartDrawer

const SubtotalSection = styled(Section).attrs({
	paddingHorizontal: "3em"
})`
	border-top: 1px solid ${theme.greyColor[3]};
	backdrop-filter: blur(10px);
	padding: 2em 3em;
	position: sticky;
	bottom: -30px;
	left: 0;
	z-index: 2;
	background-color: rgba(255, 255, 255, 0.9);
	.ant-typography {
		h4 {
			font-size: 1em;
		}
		> div {
			font-size: 0.9em;
			color: ${theme.greyColor[1]};
		}
	}
	.discount {
		h4 {
			color: ${theme.greenColor};
		}
	}
	.price {
		font-weight: bold;
		> p {
			margin-bottom: 0;
		}
		> div {
			font-weight: normal;
		}
	}

	${media.mobile`
		&& {
			padding: 2em 1em;
		}
	`}
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
