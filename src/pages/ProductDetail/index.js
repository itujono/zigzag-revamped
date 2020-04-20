import React, { useEffect, useState } from "react"
import { Section, Layout, Heading, Button, ButtonLink, Alert, Modal, Carousel, ScrollingRow } from "components"
import { Row, Col, Tag, Divider, Typography, message, Input } from "antd"
import styled from "styled-components/macro"
import { useParams, Link, useHistory, useLocation } from "react-router-dom"
import { connect } from "react-redux"

import { pricer, media, shareToSocialMedia, mobile } from "helpers"
import {
	fetchProductItem,
	addItemToCart,
	addItemToWishlist,
	addRating,
	updateCartItem
} from "store/actions/productActions"
import { theme } from "styles"
import { URL_ZIZGAG } from "helpers/constants"

const Stats = styled.div`
	padding: 1.5em;
	background-color: #f9f9f9;
	border-radius: 8px;
	.ant-typography {
		margin-bottom: 0;
	}

	${media.mobile`
		.ant-col {
			&:first-child {
				margin-bottom: 1em;
			}
		}
	`}
`

const StyledSection = styled(Section)`
	padding-bottom: 0;
	h4.ant-typography {
		margin-bottom: 10px;
	}
`

const StyledTag = styled(Tag).attrs(({ id, isShoes, selectedColor, selectedSize }) => ({
	color: (id === selectedColor.id && "#2db7f5") || (id === selectedSize.id && "#87d068")
}))`
	&& {
		cursor: pointer;
		margin-bottom: 5px;
		.stock-text {
			color: ${({ id, selectedSize }) => (id === selectedSize.id && "#fff") || theme.greyColor[2]};
		}
	}
`

const PhotoModal = styled(Modal)`
	&& {
		.ant-modal-body {
			padding: 0;
			.ant-typography {
				position: absolute;
				bottom: 20px;
				left: 20px;
				color: #fff;
			}
		}
	}
`

const StyledScrolling = styled(ScrollingRow)`
	position: relative;
	.ant-col {
		height: 240px;
		img {
			height: 100%;
			object-fit: cover;
		}
	}
`

const { Paragraph, Text } = Typography

function ProductDetail({ product, productPrice, vipPrice, regulerPrice, loading, cartItems, ...props }) {
	const [selectedColor, setSelectedColor] = useState({})
	const [selectedSize, setSelectedSize] = useState({})
	const [modalShare, setModalShare] = useState(false)
	const [selectedPhoto, setSelectedPhoto] = useState({})
	const { id: productId } = useParams()
	const { push } = useHistory()
	const { pathname } = useLocation()
	const { fetchProductItem, addItemToCart, addItemToWishlist, loadingCart } = props

	const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
	const { account_type_id: typeId } = accountType
	const token = localStorage.getItem("access_token")
	const isVip = typeId && typeId === 2
	const isShoes = (product.categories || {}).id === 2
	const sizeIsNotSelected = Object.keys(selectedSize).length === 0
	const colorIsNotSelected = Object.keys(selectedColor).length === 0

	const marketingText =
		((!token || typeId === 1) && (
			<span>
				Dapatkan produk ini seharga <strong>Rp {pricer(vipPrice)}</strong> dengan menjadi member VIP kami.{" "}
				<Link to={token ? "/upgrade" : "/login"}>Daftar jadi member VIP</Link>
			</span>
		)) ||
		(token && isVip && "Great! Kamu berhak dapat harga spesial karena kamu adalah member VIP kami! 🎉")

	const handleSelectColor = (color, stock, isShoes) => {
		if (!isShoes && (stock === "STOCK HABIS" || stock === 0)) return
		setSelectedColor(color)
	}
	const handleSelectSize = (size, stock) => {
		if (stock === "STOCK HABIS" || stock === 0) return
		setSelectedSize(size)
	}

	const color = (product.product_detail || []).map((item) => {
		const stock = item.product_more[0].stock || 0
		return (
			<StyledTag
				key={item.id}
				id={item.id}
				isShoes={isShoes}
				selectedColor={selectedColor}
				selectedSize={selectedSize}
				onClick={() => handleSelectColor(item, stock, isShoes)}
			>
				{item.color} {!isShoes && `(${stock})`}
			</StyledTag>
		)
	})

	const size = (typeId) => {
		if (typeId === 2)
			return (selectedColor.product_more || []).map((item) => (
				<StyledTag
					key={item.id}
					id={item.id}
					isShoes={isShoes}
					selectedColor={selectedColor}
					selectedSize={selectedSize}
					onClick={() => handleSelectSize(item, item.stock)}
				>
					{item.size} <span className="stock-text">({item.stock || ""})</span>
				</StyledTag>
			))

		return "-"
	}

	const handleAddToCart = () => {
		if (!token) {
			message.loading("Mengalihkan ke Login...", 1).then(() => {
				push({ pathname: "/login", state: { previousUrl: pathname } })
				message.error("Kamu harus login dulu ya")
			})
		} else {
			const item = {
				product_id: Number(productId),
				product_more_detail_id: isShoes ? selectedSize.id : (selectedColor.product_more || [])[0].id,
				weight: product.weight,
				qty: 1,
				color: selectedColor.color,
				size: isShoes ? selectedSize.size : (selectedColor.product_more || [])[0].size,
				total_price: productPrice * 1
			}

			addItemToCart(item)
		}
	}

	const handleAddToWishlist = () => {
		if (!selectedColor || Object.keys(selectedColor).length === 0) message.error("Jangan lupa pilih warna nya ya")
		else {
			const item = {
				product_id: Number(productId),
				product_more_detail_id: (selectedColor.product_more || [])[0].id,
				color: selectedColor.color,
				size: (selectedColor.product_more || [])[0].size
			}

			addItemToWishlist(item)
		}
	}

	const handleShare = () => {
		shareToSocialMedia(
			{
				title: product.name + " di Zigzag Online Shop",
				text: `Belanja ${product.name} hanya di Zigzag Online Shop`,
				url: URL_ZIZGAG + pathname
			},
			setModalShare
		)
	}

	// const handleCopy = () => {
	// 	return navigator.clipboard.readText().then(text => {
	// 		text = URL_ZIZGAG + pathname
	// 		return text
	// 	})
	// }

	useEffect(() => {
		fetchProductItem(Number(productId))
	}, [fetchProductItem, product.rating_product, productId])

	return (
		<Layout sidebar>
			<Modal visible={modalShare} onCancel={() => setModalShare(false)}>
				<Paragraph className="mb2em">Share produk ini</Paragraph>
				<Text copyable={{ text: URL_ZIZGAG + pathname }}>Copy link produk</Text>
				<Input name="input" value={URL_ZIZGAG + pathname} className="mb2em" />
				<Button block onClick={handleShare}>
					Share ke social media...
				</Button>
			</Modal>

			{mobile && (
				<PhotoModal visible={Object.keys(selectedPhoto).length} onCancel={() => setSelectedPhoto({})}>
					<img src={selectedPhoto.picture} alt={selectedPhoto.caption} width="100%" />
					<Typography.Paragraph>{selectedPhoto.caption}</Typography.Paragraph>
				</PhotoModal>
			)}

			<Section>
				<Row gutter={64} type="flex">
					<Col lg={14} xs={24}>
						{mobile ? (
							<StyledScrolling alwaysSnapStop height="300px">
								{(product.product_image || []).map((item) => (
									<Col xs={24} key={item.id}>
										<img
											src={item.picture}
											alt={item.caption}
											width="100%"
											height="100%"
											className="mb2em"
											onClick={() => setSelectedPhoto(item)}
										/>
										<Text type="secondary">{item.caption}</Text>
									</Col>
								))}
							</StyledScrolling>
						) : (
							<Carousel className="mb2em">
								{(product.product_image || []).map((item) => (
									<>
										<img
											key={item.id}
											src={item.picture}
											alt={item.caption}
											width="100%"
											className="mb2em"
										/>
										<Text type="secondary">{item.caption}</Text>
									</>
								))}
							</Carousel>
						)}
					</Col>
					<Col lg={10} xs={24}>
						<Row>
							<Col lg={24} xs={12}>
								<Heading
									bold
									content={product.name}
									subheader={
										<Paragraph>
											{isVip ? (
												<>
													<Text delete disabled>
														Rp {pricer(regulerPrice)}
													</Text>{" "}
													&nbsp; Rp {pricer(productPrice)}
												</>
											) : (
												`Rp ${pricer(productPrice)}`
											)}
										</Paragraph>
									}
								/>
							</Col>
							{mobile && (
								<Col lg={12} className="ta-right">
									<Button
										icon="more"
										type="ghost"
										shape="circle"
										onClick={() => setModalShare(true)}
									/>
								</Col>
							)}
						</Row>
						{typeId && typeId !== 3 && (
							<Alert
								message={marketingText}
								type="info"
								showIcon
								style={{ textAlign: "left", marginBottom: "2em" }}
							/>
						)}
						{/* <Heading reverse content="Rating" subheader={productRating} marginBottom="2em" /> */}
						<Stats>
							<Row type="flex">
								<Col lg={8} xs={12}>
									<Heading content="Kategori" subheader={(product.categories || {}).name} reverse />
								</Col>
								<Col lg={6} xs={12}>
									<Heading content="Berat" subheader={`${product.weight} gr`} reverse />
								</Col>
								<Col lg={10} xs={12}>
									<Heading content="Material" subheader={product.material} reverse />
								</Col>
							</Row>
						</Stats>
						<StyledSection paddingHorizontal="0" marginBottom="0">
							<Row gutter={32}>
								<Col lg={12}>
									<Heading reverse content="Warna" subheader={color} marginBottom="0" />
								</Col>
								<Col lg={12}>
									<Heading
										reverse
										content="Ukuran"
										subheader={size((product.categories || {}).id)}
										marginBottom="0"
									/>
								</Col>
							</Row>

							{/* <Row>
								<Col lg={12}>
									{selectedColor && Object.keys(selectedColor).length > 0 && (
										<Heading
											reverse
											content={`Stok warna ${selectedColor.color}`}
											subheader={`${productStock} pcs`}
											marginBottom="0"
										/>
									)}
								</Col>
							</Row> */}
						</StyledSection>
						<Divider />
						<StyledSection paddingHorizontal="0" marginBottom="0">
							<Button
								type="primary"
								icon="shopping-cart"
								disabled={isShoes ? colorIsNotSelected || sizeIsNotSelected : colorIsNotSelected}
								onClick={handleAddToCart}
								loading={loadingCart}
							>
								Tambahkan ke cart
							</Button>{" "}
							&nbsp;{" "}
							<ButtonLink icon="heart" onClick={handleAddToWishlist} loading={loading}>
								Wishlist
							</ButtonLink>
						</StyledSection>
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

const mapState = ({ product }) => {
	const vipPrice = (product.product.product_price || []).find((item) => item.price_type === "VIP") || {}
	const regulerPrice = (product.product.product_price || []).find((item) => item.price_type === "REGULER") || {}

	return {
		product: product.product,
		cartItems: product.cartItems,
		productPrice: product.productPrice,
		vipPrice: vipPrice.price || 0,
		regulerPrice: regulerPrice.price || 0,
		loading: product.loading,
		loadingCart: product.loadingCart
	}
}

const actions = { fetchProductItem, addItemToCart, addItemToWishlist, addRating, updateCartItem }

export default connect(mapState, actions)(ProductDetail)
