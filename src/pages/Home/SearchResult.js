import React, { useState, useEffect, useCallback } from "react"
import { Section, Heading, Button, Layout, Empty } from "components"
import { Row, Col, Input, List, Avatar, Icon, Tag } from "antd"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { searchProduct } from "store/actions/productActions"
import { media, pricer, mobile, isOutOfStock } from "helpers"

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

	const keywordFromNavbar = localStorage.getItem("keywordFromNavbar")

	const handleSearch = useCallback(
		(value) => {
			if (value !== "") {
				setKeyword(value)
				searchProduct(value || keywordFromNavbar)
			}
		},
		[keywordFromNavbar, searchProduct]
	)

	useEffect(() => {
		setKeyword(keywordFromNavbar)
		handleSearch(keyword)

		return () => {
			setKeyword("")
			localStorage.removeItem("keywordFromNavbar")
		}
	}, [handleSearch, keyword, keywordFromNavbar])

	return (
		<Layout>
			<Section centered>
				<Row type="flex" justify="center">
					<Col lg={12} xs={24}>
						<Heading content="Hasil pencarian" subheader="Cari apa saja di website Zigzag" />
						<Input.Search
							allowClear
							name="search"
							placeholder="Cari apa saja..."
							style={{ width: "100%", marginBottom: "3em" }}
							defaultValue={keywordFromNavbar || ""}
							onSearch={handleSearch}
						/>
						<List
							itemLayout="horizontal"
							dataSource={searchList}
							locale={{ emptyText: <Empty isEmptyItems description="Ayo cari apa saja!" /> }}
							loading={loading}
							renderItem={(item) => {
								const picture = (item.product_image || [])[0] || {}
								const colorArr = item.product_detail.map(({ color }) => color)
								const colors = colorArr.length > 1 ? colorArr.join(", ") : colorArr
								const outOfStock = isOutOfStock(item.product_detail)

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
													<Link to={`/product/${item.id}-${item.name}`}>{item.name}</Link>{" "}
													&middot;{" "}
													<span>Rp {pricer((item.product_price || {}).price)} / pcs</span>
												</p>
											}
											description={
												<Row>
													<Col lg={24}>
														<p className="price-weight mb1em">
															Kategori <strong>{(item.categories || {}).name}</strong>{" "}
															&middot;{" "}
															<span>
																Warna <strong>{colors}</strong>
															</span>
														</p>
														{outOfStock && <Tag color="orange">Stok habis</Tag>}
													</Col>
												</Row>
											}
										/>
										<Link to={`/product/${item.id}-${item.name}`}>
											<Button block={mobile}>
												Detail&nbsp; <Icon type="right" />
											</Button>
										</Link>
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
