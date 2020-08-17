import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Icon } from "antd"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { Section, Heading, Layout, ProductCard, ButtonLink } from "components"
import { fetchProducts, fetchRestockProducts } from "store/actions/productActions"
import { mobile, isOutOfStock } from "helpers"
import { fetchBanners } from "store/actions/otherActions"
import Banners from "./Banners"

const SelengkapButton = styled(ButtonLink)`
	margin-right: 0;
`

function Home() {
	const [photoIndex, setPhotoIndex] = useState(-1)
	const dispatch = useDispatch()
	const products = useSelector(({ product }) => product.products)
	const restockProducts = useSelector(({ product }) => product.restockProducts)
	const banners = useSelector(({ other }) => other.banners)

	useEffect(() => {
		dispatch(fetchProducts(0, 12))
		dispatch(fetchRestockProducts(0, 12))
		dispatch(fetchBanners())
	}, [dispatch])

	return (
		<Layout sidebar>
			<Section paddingHorizontal="1.5em">
				<Heading
					bold
					content="Cari fashion kamu"
					subheader={
						<span>
							Zigzag adalah gudang nya fashion murah meriah mewah{" "}
							<span role="img" aria-label="dress">
								👗
							</span>
						</span>
					}
				/>

				<Banners data={banners} onPhotoIndex={{ photoIndex, setPhotoIndex }} />

				<Row className="mt4m mb4em" gutter={64}>
					<Col lg={24} style={{ marginBottom: mobile && "2em" }}>
						<Row
							type="flex"
							justify="space-between"
							align="middle"
							style={{ marginBottom: mobile && "2em" }}
						>
							<Col>
								<Heading
									bold
									content="Produk terbaru"
									subheader="Masih anget! Masih anget! Dipilih, dipilih!"
								/>
							</Col>
							<Col>
								<SelengkapButton>
									<Link to="/products/latest">
										Selengkapnya &nbsp; <Icon type="right" />
									</Link>
								</SelengkapButton>
							</Col>
						</Row>
						<Row gutter={16} type="flex">
							{products.map((item) => {
								const to = item.name ? `/product/${item.id}-${item.name}` : null
								const outOfStock = isOutOfStock(item.product_detail)

								return (
									<Col xs={12} lg={6} key={item.id}>
										<ProductCard
											mode="mini"
											data={{
												to,
												src: (item.product_image[0] || {}).picture,
												title: item.name,
												price: item.product_price.price,
												category: item.categories.name,
												isOutOfStock: outOfStock
											}}
										/>
									</Col>
								)
							})}
						</Row>
					</Col>
				</Row>

				<Row gutter={64}>
					<Col lg={24} style={{ marginBottom: mobile && "2em" }}>
						<Row
							type="flex"
							justify="space-between"
							align="middle"
							style={{ marginBottom: mobile && "2em" }}
						>
							<Col>
								<Heading
									bold
									content="Produk restock"
									subheader="Produk-produk idaman yang baru di-update"
								/>
							</Col>
							<Col>
								<SelengkapButton>
									<Link to="/products/restock">
										Selengkapnya &nbsp; <Icon type="right" />
									</Link>
								</SelengkapButton>
							</Col>
						</Row>
						<Row gutter={16} type="flex">
							{restockProducts.map((item) => {
								const to = item.name ? `/product/${item.id}-${item.name}` : null
								const outOfStock = isOutOfStock(item.product_detail)

								return (
									<Col xs={12} lg={6} key={item.id}>
										<ProductCard
											mode="mini"
											data={{
												to,
												src: item.product_image[0].picture,
												title: item.name,
												price: item.product_price.price,
												category: item.categories.name,
												isOutOfStock: outOfStock
											}}
										/>
									</Col>
								)
							})}
						</Row>
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

export default Home
