import React, { useEffect, useState } from "react"
import { Section, Layout, Heading, Button, ButtonLink } from "components"
import { Row, Col, Tag, Divider, Typography, Carousel, message } from "antd"
import styled from "styled-components/macro"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"

import { pricer } from "helpers"
import { fetchProductItem, addItemToCart, fetchCartItems, addItemToWishlist } from "store/actions/productActions"

const Stats = styled.div`
	padding: 1.5em;
	background-color: #f9f9f9;
	border-radius: 8px;
	.ant-typography {
		margin-bottom: 0;
	}
`

const StyledSection = styled(Section)`
	padding-bottom: 0;
	h4.ant-typography {
		margin-bottom: 10px;
	}
`

const { Paragraph, Text } = Typography

function ProductDetail({ product, productPrice, ...props }) {
	const [selectedColor, setSelectedColor] = useState({})
	const { id: productId } = useParams()
	const { fetchProductItem, addItemToCart, fetchCartItems, addItemToWishlist } = props

	const handleSelectColor = color => setSelectedColor(color)

	const color = (product.product_detail || []).map(item =>
		// prettier-ignore
		<Tag
			color={item.id === selectedColor.id && "#2db7f5"}
			key={item.id}
			onClick={() => handleSelectColor(item)}
			css={` && { cursor: pointer; } `}
		>
			{item.color} ({item.product_more[0].stock || 0})
		</Tag>
	)

	const size = typeId => {
		if (typeId === 2)
			return (selectedColor.product_more || []).map(item => (
				<Tag color="#87d068" key={item.id}>
					{item.size}
				</Tag>
			))

		return "-"
	}

	const handleAddToCart = () => {
		if (!selectedColor || Object.keys(selectedColor).length === 0) message.error("Jangan lupa pilih warna nya ya")
		else {
			const item = {
				product_id: productId,
				product_more_detail_id: (selectedColor.product_more || [])[0].id,
				weight: product.weight,
				qty: 1,
				color: selectedColor.color,
				size: (selectedColor.product_more || [])[0].size,
				total_price: productPrice * 1
			}

			addItemToCart(item)
		}
	}

	const handleAddToWishlist = () => {
		if (!selectedColor || Object.keys(selectedColor).length === 0) message.error("Jangan lupa pilih warna nya ya")
		else {
			const item = {
				product_id: productId,
				product_more_detail_id: (selectedColor.product_more || [])[0].id,
				color: selectedColor.color,
				size: (selectedColor.product_more || [])[0].size
			}

			addItemToWishlist(item)
		}
	}

	useEffect(() => {
		fetchProductItem(Number(productId))
		fetchCartItems()
	}, [])

	return (
		<Layout sidebar>
			<Section>
				<Row gutter={64} type="flex">
					<Col lg={14}>
						<Carousel autoplay adaptiveHeight infinite style={{ marginBottom: "2em" }}>
							{(product.product_image || []).map(item => (
								<div key={item.id}>
									<img src={item.picture} alt={item.caption} width="100%" />
								</div>
							))}
						</Carousel>
					</Col>
					<Col lg={10}>
						<Heading
							bold
							content={product.name}
							subheader={
								<Paragraph>
									<Text delete disabled>
										Rp {pricer(245000)}
									</Text>{" "}
									&nbsp; Rp {pricer(productPrice)}
								</Paragraph>
							}
						/>
						<Stats>
							<Row type="flex">
								<Col lg={8}>
									<Heading content="Kategori" subheader={(product.categories || {}).name} reverse />
								</Col>
								<Col lg={6}>
									<Heading content="Berat" subheader={`${product.weight} gr`} reverse />
								</Col>
								<Col lg={10}>
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
							<Button type="primary" icon="shopping-cart" onClick={handleAddToCart}>
								Tambahkan ke cart
							</Button>{" "}
							&nbsp;{" "}
							<ButtonLink icon="heart" onClick={handleAddToWishlist}>
								Wishlist
							</ButtonLink>
						</StyledSection>
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

const mapState = ({ product }) => ({
	product: product.product,
	productPrice: product.productPrice
})

export default connect(mapState, { fetchProductItem, addItemToCart, fetchCartItems, addItemToWishlist })(ProductDetail)
