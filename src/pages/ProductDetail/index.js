import React, { useEffect, useState } from "react"
import { Section, Layout, Heading, Button, ButtonLink, Alert } from "components"
import { Row, Col, Tag, Divider, Typography, Carousel, message, Rate, Popconfirm } from "antd"
import styled from "styled-components/macro"
import { useParams, Link, useHistory } from "react-router-dom"
import { connect } from "react-redux"

import { pricer, media } from "helpers"
import {
	fetchProductItem,
	addItemToCart,
	addItemToWishlist,
	addRating,
	updateCartItem
} from "store/actions/productActions"
import { theme } from "styles"

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

const StyledRating = styled(Rate)`
	.ant-rate-star {
		margin-left: 0;
		&:first-child {
			margin-left: 0;
		}
		&:not(:last-child) {
			margin-right: 4px;
		}
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

const { Paragraph, Text } = Typography

function ProductDetail({ product, productPrice, vipPrice, regulerPrice, loading, cartItems, ...props }) {
	const [selectedColor, setSelectedColor] = useState({})
	const [selectedSize, setSelectedSize] = useState({})
	const [temporaryRating, setTemporaryRating] = useState(0)
	const { id: productId } = useParams()
	const { push } = useHistory()
	const { fetchProductItem, addItemToCart, addItemToWishlist, addRating, loadingCart } = props

	const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
	const { account_type_id: typeId } = accountType
	const token = localStorage.getItem("access_token")
	const isVip = typeId && typeId === 2
	const isShoes = (product.categories || {}).id === 2
	const sizeIsNotSelected = Object.keys(selectedSize).length === 0
	const colorIsNotSelected = Object.keys(selectedColor).length === 0
	// const isInCart = cartItems.find(item => item.product_id === Number(productId)) || {}

	// console.log({ isInCart })

	const handleRate = () => {
		if (!token) {
			push("/login")
			message.error("Kalo mau nge-rate, harus login dulu ya")
		} else addRating(productId, temporaryRating)
	}

	const marketingText =
		((!token || typeId === 1) && (
			<span>
				Dapatkan produk ini seharga <strong>Rp {pricer(vipPrice)}</strong> dengan menjadi member VIP kami.{" "}
				<Link to={token ? "/upgrade" : "/login"}>Daftar jadi member VIP</Link>
			</span>
		)) ||
		(token && isVip && "Great! Kamu berhak dapat harga spesial karena kamu adalah member VIP kami! 🎉")

	// const productRating = (
	// 	<Popconfirm
	// 		title={
	// 			<span>
	// 				Kamu yakin mau kasih produk ini <strong>{temporaryRating} bintang</strong>?
	// 			</span>
	// 		}
	// 		onConfirm={handleRate}
	// 	>
	// 		<StyledRating
	// 			name="rating_product"
	// 			value={product.rating_product}
	// 			onChange={value => setTemporaryRating(value)}
	// 			allowHalf
	// 		/>{" "}
	// 		&nbsp;
	// 		{product.count_user_rating > 0
	// 			? `${product.count_user_rating} orang kasih rating`
	// 			: "Belum ada yang kasih rating"}
	// 		{product.is_rated_by_customer === 1 && (
	// 			<p
	// 				css={`
	// 					color: ${theme.greyColor[2]};
	// 				`}
	// 			>
	// 				Kamu sudah kasih rating untuk produk ini
	// 			</p>
	// 		)}
	// 	</Popconfirm>
	// )

	const handleSelectColor = (color, stock, isShoes) => {
		if (!isShoes && (stock === "STOCK HABIS" || stock === 0)) return
		setSelectedColor(color)
	}
	const handleSelectSize = (size, stock) => {
		if (stock === "STOCK HABIS" || stock === 0) return
		setSelectedSize(size)
	}

	const color = (product.product_detail || []).map(item => {
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

	const size = typeId => {
		if (typeId === 2)
			return (selectedColor.product_more || []).map(item => (
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
				push("/login")
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

	useEffect(() => {
		fetchProductItem(Number(productId))
	}, [fetchProductItem, product.rating_product, productId])

	return (
		<Layout sidebar>
			<Section>
				<Row gutter={64} type="flex">
					<Col lg={14} xs={24}>
						<Carousel autoplay adaptiveHeight infinite style={{ marginBottom: "2em" }}>
							{(product.product_image || []).map(item => (
								<div key={item.id}>
									<img src={item.picture} alt={item.caption} width="100%" />
								</div>
							))}
						</Carousel>
					</Col>
					<Col lg={10} xs={24}>
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
	const vipPrice = (product.product.product_price || []).find(item => item.price_type === "VIP") || {}
	const regulerPrice = (product.product.product_price || []).find(item => item.price_type === "REGULER") || {}

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
