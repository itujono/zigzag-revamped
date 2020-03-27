import React, { useEffect } from "react"
import { Section, Heading, Layout, ProductCard, ButtonLink } from "components"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, fetchRestockProducts } from "store/actions/productActions"
import { Carousel, Row, Col, Icon } from "antd"
import { mobile, media } from "helpers"
import styled from "styled-components"

const SelengkapButton = styled(ButtonLink)`
	margin-right: 0;
	/* ${media.mobile`
		padding-left: 0;
	`} */
`

function Home() {
	const dispatch = useDispatch()
	const product = useSelector(({ product }) => product)
	const products = useSelector(({ product }) => product.products)
	const restockProducts = useSelector(({ product }) => product.restockProducts)

	useEffect(() => {
		dispatch(fetchProducts(0, 6))
		dispatch(fetchRestockProducts(0, 6))
	}, [dispatch])

	return (
		<Layout sidebar>
			<Section paddingHorizontal="1.5em">
				<Heading bold content="Ini Homepage" subheader="Kamu adalah apa yang kamu makan, eheheh" />
				<Carousel
					className="center"
					autoplay
					pauseOnHover
					infinite
					// centerMode
					slidesToShow={mobile ? 1 : 3}
					// centerPadding="60px"
					style={{ marginBottom: "2em" }}
				>
					<div>
						<img src="https://source.unsplash.com/600x300" alt="Disclaimer" />
					</div>
					<div>
						<img src="https://source.unsplash.com/600x299" alt="Welcome to Zigzag" />
					</div>
					<div>
						<img src="https://source.unsplash.com/599x299" alt="Welcome to Zigzag" />
					</div>
					<div>
						<img src="https://source.unsplash.com/599x300" alt="Welcome to Zigzag" />
					</div>
					<div>
						<img src="https://source.unsplash.com/599x301" alt="599x301" />
					</div>
				</Carousel>
				<Row style={{ marginTop: "4em" }} gutter={64}>
					<Col lg={12} style={{ marginBottom: mobile && "2em" }}>
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
									Selengkapnya &nbsp; <Icon type="right" />
								</SelengkapButton>
							</Col>
						</Row>
						<Row gutter={16} type="flex">
							{products.map(item => {
								const to = item.name ? `/product/${item.id}-${item.name}` : null

								return (
									<Col xs={12} lg={8} key={item.id}>
										<ProductCard
											mode="mini"
											data={{
												to,
												src: (item.product_image[0] || {}).picture,
												title: item.name,
												price: item.product_price.price,
												category: item.categories.name
											}}
										/>
									</Col>
								)
							})}
						</Row>
					</Col>
					<Col lg={12} style={{ marginBottom: mobile && "2em" }}>
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
									Selengkapnya &nbsp; <Icon type="right" />
								</SelengkapButton>
							</Col>
						</Row>
						<Row gutter={16} type="flex">
							{restockProducts.map(item => {
								const to = item.name ? `/product/${item.id}-${item.name}` : null

								return (
									<Col xs={12} lg={8} key={item.id}>
										<ProductCard
											mode="mini"
											data={{
												to,
												src: item.product_image[0].picture,
												title: item.name,
												price: item.product_price.price,
												category: item.categories.name
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
