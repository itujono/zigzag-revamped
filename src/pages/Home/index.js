import React from "react"
import { Section, Heading, Layout, ProductCard, ButtonLink } from "components"
import { connect } from "react-redux"
import { fetchProductItem } from "store/actions/productActions"
import { Carousel, Row, Col, Icon } from "antd"
import { mobile, media } from "helpers"
import styled from "styled-components"

const SelengkapButton = styled(ButtonLink)`
	${media.mobile`
		padding-left: 0;
	`}
	margin-right: 0;
`

function Home(props) {
	const handleFetchProduct = () => {
		props.fetchProductItem()
	}

	return (
		<Layout sidebar>
			<Section paddingHorizontal="2.5em">
				<Heading bold content="Ini Homepage" subheader="Kamu adalah apa yang kamu makan, eheheh" />
				<Carousel
					className="center"
					autoplay
					pauseOnHover
					infinite
					centerMode
					slidesToShow={mobile ? 1 : 3}
					centerPadding="60px"
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
						<Row gutter={16}>
							<Col xs={12} lg={8}>
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
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/300x501",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/300x499",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/301x500",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/299x499",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
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
									content="Produk terlaris"
									subheader="Produk-produk idaman wanita masa kini"
								/>
							</Col>
							<Col>
								<SelengkapButton>
									Selengkapnya &nbsp; <Icon type="right" />
								</SelengkapButton>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/300x500",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/300x501",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/300x499",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/301x500",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
								<ProductCard
									mode="mini"
									data={{
										src: "http://source.unsplash.com/299x499",
										title: "Sempardak",
										price: 75000
									}}
								/>
							</Col>
							<Col xs={12} lg={8}>
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
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

const mapState = ({ product }) => ({
	product: product.product
})

export default connect(
	mapState,
	{ fetchProductItem }
)(Home)
