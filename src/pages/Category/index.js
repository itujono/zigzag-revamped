import React, { useEffect } from "react"
import { Section, Heading, ProductCard, Layout } from "components"
import { Row, Col } from "antd"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from "store/actions/productActions"
import { upperCase, isOutOfStock } from "helpers"

function Category() {
	const { name, id } = useParams()
	const dispatch = useDispatch()
	const productsError = useSelector(({ product }) => product.productsError)
	let loading = useSelector(({ product }) => product.loading)
	const products = useSelector(({ product }) => product.products)

	loading = productsError ? false : loading

	useEffect(() => {
		dispatch(fetchProducts(id, 0))
	}, [name, id, dispatch])

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
				<Row gutter={16} type="flex">
					{products.map((item) => {
						const outOfStock = isOutOfStock(item.product_detail)

						return (
							<Col xs={12} lg={6} key={item.id}>
								<ProductCard
									key={item.id}
									mode="mini"
									loading={loading}
									style={{ marginBottom: "1.5em" }}
									data={{
										src: (item.product_image[0] || {}).picture,
										title: item.name,
										price: item.product_price.price,
										to: `/product/${item.id}-${item.name}`,
										category: item.categories.name,
										isOutOfStock: outOfStock
									}}
								/>
							</Col>
						)
					})}
				</Row>
			</Section>
		</Layout>
	)
}

export default Category
