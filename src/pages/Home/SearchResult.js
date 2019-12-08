import React, { useState } from "react"
import { Section, Heading, Button, Layout } from "components"
import { Row, Col, Form, Input, List, Avatar } from "antd"
import { connect } from "react-redux"
import styled from "styled-components"

import { searchProduct } from "store/actions/productActions"
import { media, pricer, mobile } from "helpers"

const CartItem = styled(List.Item)`
	.ant-list-item-meta-avatar {
		margin-right: 24px;
		.product-photo {
			width: 60px;
			height: 80px;
		}
	}
	.ant-list-item-meta-title {
		.delete {
			cursor: pointer;
		}
	}
	.price-weight {
		span {
			font-weight: normal;
		}
	}

	${media.mobile`
		.ant-list-item-meta {
			margin-bottom: 20px;
		}
	`}
`

function SearchResult({ searchProduct, searchList, loading }) {
	const [keyword, setKeyword] = useState("")

	const handleSearch = value => {
		setKeyword(value)
		searchProduct(value)
	}

	return (
		<Layout>
			<Section centered>
				<Row type="flex" justify="center">
					<Col lg={12}>
						<Heading content="Hasil pencarian" subheader="Cari apa saja di website Zigzag" />
						<Input.Search
							allowClear
							name="search"
							placeholder="Cari apa saja..."
							style={{ width: "100%" }}
							defaultValue="Heheh..."
							onSearch={handleSearch}
						/>
						<List
							itemLayout="horizontal"
							dataSource={searchList}
							locale={{ emptyText: "Ayo cari apa saja!" }}
							loading={loading}
							renderItem={item => {
								const picture = (item.product_image || [])[0] || {}

								return (
									<CartItem>
										<List.Item.Meta
											avatar={
												<Avatar
													src={picture.picture}
													shape="square"
													className="product-photo"
												/>
											}
											title={
												<p style={{ marginBottom: 0 }}>
													<a href="https://ant.design">{item.name}</a> &middot;{" "}
													<span>
														Rp {pricer((item.product_price || {}).price)} / pcs &middot;
														&nbsp; &nbsp;
													</span>
												</p>
											}
											description={
												<Row>
													<Col lg={24}>
														<p className="price-weight">
															Kategori <strong>{(item.category || {}).name}</strong>{" "}
															&middot;{" "}
															<span>
																Warna <strong>{item.color}</strong>
															</span>
														</p>
													</Col>
												</Row>
											}
										/>
										<Button icon="plus" block={mobile}>
											Tambah ke cart
										</Button>
									</CartItem>
								)
							}}
						/>
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

const mapState = ({ product }) => ({
	searchList: product.searchList,
	loading: product.loading
})

export default connect(mapState, { searchProduct })(SearchResult)
