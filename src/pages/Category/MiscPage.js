import React, { useEffect, useState, useCallback } from "react"
import { Section, Button, Heading, ProductCard, Layout, Loading } from "components"
import { Row, Col, Select, Form } from "antd"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import {
	fetchPromoProducts,
	fetchProductCategories,
	fetchRestockProducts,
	fetchProducts
} from "store/actions/productActions"
import { upperCase, mobile, media, isOutOfStock } from "helpers"

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

function MiscPage() {
	const dispatch = useDispatch()
	const { name } = useParams()
	const [selectedCategory, setSelectedCategory] = useState(0)

	const promoProducts = useSelector(({ product }) => product.promoProducts)
	const restockProducts = useSelector(({ product }) => product.restockProducts)
	const allProducts = useSelector(({ product }) => product.products)
	const loading = useSelector(({ product }) => product.loading)
	const categoryOptions = useSelector(({ product }) => product.categoryOptions)

	const products = name === "restock" ? restockProducts : name === "promo" ? promoProducts : allProducts

	const handleFilterCategory = (value) => setSelectedCategory(value)

	useEffect(() => {
		if (name === "restock") dispatch(fetchRestockProducts(0, 0))
		else if (name === "promo") dispatch(fetchPromoProducts(selectedCategory, 75))
		else dispatch(fetchProducts(0, 0))
		dispatch(fetchProductCategories())
	}, [dispatch, name, selectedCategory])

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
									defaultValue={0}
									style={{ width: 200 }}
									onChange={handleFilterCategory}
								>
									{[{ value: 0, label: "Semua" }, ...categoryOptions].map((item) => (
										<Select.Option key={item.value} value={item.value}>
											{item.label}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Form>
					</Col>
				</HeadingSection>
				<Row gutter={32} type="flex">
					{products.map((item) => {
						const outOfStock = isOutOfStock(item.product_detail)
						return (
							<Col xs={12} lg={6} key={item.id}>
								<ProductCard
									key={item.id}
									mode="mini"
									loading={loading}
									style={{ marginBottom: "2em" }}
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

export default MiscPage
