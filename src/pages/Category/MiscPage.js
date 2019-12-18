import React, { useEffect, useState, useCallback } from "react"
import { Section, Button, Heading, ProductCard, Layout, Loading } from "components"
import { Row, Col, Select, Form } from "antd"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import styled from "styled-components"
import { fetchPromoProducts, fetchProductCategories } from "store/actions/productActions"
import { upperCase, mobile, media } from "helpers"

const HeadingSection = styled(Row).attrs({
	type: "flex",
	justify: "space-between",
	gutter: 16
})`
	${media.mobile`
		> .ant-col {
			&:last-child {
				margin-bottom: 2em;
			}
		}
	`}
`

function MiscPage({ products, fetchPromoProducts, loading, categoryOptions }) {
	const { name } = useParams()
	const [selectedCategory, setSelectedCategory] = useState(0)

	const handleFilterCategory = useCallback(
		value => {
			setSelectedCategory(value)
			fetchPromoProducts(value, 50)
		},
		[fetchPromoProducts]
	)

	useEffect(() => {
		fetchPromoProducts(0, 50)
		fetchProductCategories()
	}, [fetchPromoProducts])

	return (
		<Layout sidebar>
			<Section>
				<HeadingSection>
					<Col lg={12} xs={24}>
						<Heading
							content={
								<div>
									{upperCase(name)} <span>({products.length})</span>
								</div>
							}
							subheader={`Liat produk ${name} terbaik di Zigzag`}
							marginBottom="3em"
						/>
					</Col>
					<Col lg={12} xs={24} style={{ textAlign: mobile ? "left" : "right" }}>
						<Form layout="inline">
							<Form.Item name="filter" label="Filter">
								<Select
									name="filter"
									defaultValue="Filter kategori..."
									style={{ width: 200 }}
									onChange={handleFilterCategory}
								>
									{categoryOptions.map(item => (
										<Select.Option key={item.value} value={item.value}>
											{item.label}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Form>
					</Col>
				</HeadingSection>
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
	categoryOptions: product.categoryOptions,
	products: product.promoProducts,
	loading: product.loading
})

export default connect(mapState, { fetchPromoProducts, fetchProductCategories })(MiscPage)
