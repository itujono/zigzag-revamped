import React from "react"
import { Section, Button, Heading, ProductCard, Layout } from "components"
import { Row, Col } from "antd"

function Category() {
	return (
		<Layout sidebar>
			<Section>
				<Heading content="Tas" subheader="Liat produk tas terbaik di Zigzag" marginBottom="3em" />
				<Row gutter={16}>
					<Col xs={12} lg={6}>
						<ProductCard
							mode="mini"
							data={{
								src: "http://source.unsplash.com/300x500",
								title: "Sempardak",
								price: 75000,
								to: "/product/Sempardak"
							}}
						/>
					</Col>
					<Col xs={12} lg={6}>
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
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

export default Category
