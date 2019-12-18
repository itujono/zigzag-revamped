import React, { useEffect } from "react"
import { Section, Button, Heading, ProductCard, Layout, Loading } from "components"
import { Row, Col } from "antd"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import { fetchProducts } from "store/actions/productActions"
import { upperCase } from "helpers"

function Category({ products, fetchProducts, loading }) {
	const { name, id } = useParams()

	useEffect(() => {
		fetchProducts(id, 0)
	}, [name, id, fetchProducts])

	// if (loading) return <Loading />

	return (
		<Layout sidebar>
			<Section>
				<Heading
					content={
						<div>
							{upperCase(name)} <span>({products.length})</span>
						</div>
					}
					subheader={`Liat produk ${name} terbaik di Zigzag`}
					marginBottom="3em"
				/>
				<Row gutter={32}>
					{products.map(item => (
						<Col xs={12} lg={6} key={item.id}>
							<ProductCard
								key={item.id}
								mode="mini"
								loading={loading}
								style={{ marginBottom: "2em" }}
								data={{
									src: item.product_image[0].picture,
									title: item.name,
									price: item.product_price.price,
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
