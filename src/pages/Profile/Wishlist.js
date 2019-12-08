import React, { useEffect } from "react"
import { List, Avatar, Tooltip, Icon, Row, Col, Form, Popconfirm } from "antd"
import styled from "styled-components"
import { connect } from "react-redux"

import { Section, Heading, Button } from "components"
import { fetchWishlistItems, deleteWishlistItem } from "store/actions/productActions"
import { pricer, media, mobile } from "helpers"

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

function Wishlist({ fetchWishlistItems, deleteWishlistItem, wishlistItems, loading }) {
	const handleDeleteWishlist = id => {
		deleteWishlistItem(id)
	}

	useEffect(() => {
		fetchWishlistItems()
	}, [])

	return (
		<Section centered width="70%">
			<Heading content="Wishlist" subheader="Daftar item-item yang kamu suka/simpan" />
			<List
				itemLayout="horizontal"
				dataSource={wishlistItems}
				locale={{ emptyText: "Kamu belum ada wishlist sama sekali" }}
				loading={loading}
				renderItem={item => {
					const picture = (item.product_image || [])[0] || {}
					const details = item.wishlist

					return (
						<CartItem>
							<List.Item.Meta
								avatar={<Avatar src={picture.picture} shape="square" className="product-photo" />}
								title={
									<p style={{ marginBottom: 0 }}>
										<a href="https://ant.design">{details.product_name}</a> &middot;{" "}
										<span>
											Rp {pricer((item.product_price || {}).price)} / pcs &middot;{" "}
											{details.product_weight} gram
										</span>
									</p>
								}
								description={
									<Row>
										<Col lg={24}>
											<p className="price-weight">
												Kategori <strong>{(item.category || {}).name}</strong> &middot;{" "}
												<span>
													Warna <strong>{details.product_color}</strong>
												</span>
											</p>
											<Popconfirm
												title="Yakin mau hapus produk ini dari Wishlist kamu?"
												okText="Yakin"
												onConfirm={() => handleDeleteWishlist(details.wishlist_id)}
											>
												<Button type="dashed" icon="delete">
													Hapus dari wishlist
												</Button>
											</Popconfirm>
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
		</Section>
	)
}

const mapState = ({ product }) => ({
	wishlistItems: product.wishlistItems,
	loading: product.loading
})

export default connect(mapState, { fetchWishlistItems, deleteWishlistItem })(Wishlist)
