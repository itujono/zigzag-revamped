import React, { useEffect } from "react"
import { Section, Button, Heading, ProductCard, Layout } from "components"
import { Row, Col } from "antd"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import { fetchProducts } from "store/actions/productActions"

function Category({ products, fetchProducts }) {
	const { name, id } = useParams()

	useEffect(() => {
		fetchProducts(id, 0)
	}, [name, id])

	return (
		<Layout sidebar>
			<Section>
				<Heading content="Tas" subheader="Liat produk tas terbaik di Zigzag" marginBottom="3em" />
				<Row gutter={16}>
					{products.map(item => (
						<Col xs={12} lg={6}>
							<ProductCard
								key={item.id}
								mode="mini"
								data={{
									src: item.product_image[0].picture,
									title: item.name,
									price: item.product_price[0].price,
									to: `/product/${item.id}-${item.name}`,
									category: item.categories.name
								}}
							/>
						</Col>
					))}
					{/* <Col xs={12} lg={6}>
						<ProductCard
							mode="mini"
							data={{
								src: "http://source.unsplash.com/300x501",
								title: "Sempardak",
								price: 75000
							}}
						/>
					</Col>
					<Col xs={12} lg={6}>
						<ProductCard
							mode="mini"
							data={{
								src: "http://source.unsplash.com/300x499",
								title: "Sempardak",
								price: 75000
							}}
						/>
					</Col>
					<Col xs={12} lg={6}>
						<ProductCard
							mode="mini"
							data={{
								src: "http://source.unsplash.com/301x500",
								title: "Sempardak",
								price: 75000
							}}
						/>
					</Col>
					<Col xs={12} lg={6}>
						<ProductCard
							mode="mini"
							data={{
								src: "http://source.unsplash.com/299x499",
								title: "Sempardak",
								price: 75000
							}}
						/>
					</Col>
					<Col xs={12} lg={6}>
						<ProductCard
							mode="mini"
							data={{
								src: "http://source.unsplash.com/299x500",
								title: "Sempardak",
								price: 75000
							}}
						/>
					</Col> */}
				</Row>
			</Section>
		</Layout>
	)
}

const mapState = ({ product }) => ({
	products: product.products
})

export default connect(mapState, { fetchProducts })(Category)
