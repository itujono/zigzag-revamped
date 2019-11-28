import React, { useEffect } from "react"
import { Section, Button, Heading, ProductCard, Layout, Loading } from "components"
import { Row, Col } from "antd"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import { fetchProducts } from "store/actions/productActions"

function Category({ products, fetchProducts, loading }) {
	const { name, id } = useParams()

	useEffect(() => {
		fetchProducts(id, 0)
	}, [name, id])

	// if (loading) return <Loading />

	return (
		<Layout sidebar>
			<Section>
				<Heading
					content={
						<div>
							{name} <span>({products.length})</span>
						</div>
					}
					subheader={`Liat produk ${name} terbaik di Zigzag`}
					marginBottom="3em"
				/>
				<Row gutter={16}>
					{products.map(item => (
						<Col xs={12} lg={6}>
							<ProductCard
								key={item.id}
								mode="mini"
								loading={loading}
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
				</Row>
			</Section>
		</Layout>
	)
}

const mapState = ({ product }) => ({
	products: product.products,
	loading: product.loading
})

export default connect(mapState, { fetchProducts })(Category)
