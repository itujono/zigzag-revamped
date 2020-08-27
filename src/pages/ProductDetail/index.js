import React, { useEffect, useState } from "react"
import { Section, Layout, Heading, Button, ButtonLink, Alert, Modal, ScrollingRow, DynamicIcon } from "components"
import { Row, Col, Tag, Divider, Typography, message, Input, Icon, Collapse } from "antd"
import styled from "styled-components/macro"
import { useParams, Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { pricer, media, shareToSocialMedia, mobile } from "helpers"
import { theme } from "styles"
import { URL_ZIZGAG, LIGHTBOX_SETTING, TEXT_STOCK_HABIS, ORIGIN, COURIER_LIST } from "helpers/constants"
import Lightbox, { SRLWrapper } from "simple-react-lightbox"
import { addItemToCart, addItemToWishlist, fetchProductItem } from "store/actions/productActions"
import { fetchCouriers } from "store/actions/rajaOngkirActions"
import { fetchUser } from "store/actions/userActions"

const Stats = styled.div`
	padding: 1.5em;
	background-color: #f9f9f9;
	border-radius: 8px;
	border: 2px solid #ddd;
	.ant-typography {
		margin-bottom: 0;
	}

	${media.mobile`
		.ant-col {
			&:first-child {
				margin-bottom: 1em;
			}
		}
	`}
`

const StyledSection = styled(Section)`
	padding-bottom: 0;
	h4.ant-typography {
		margin-bottom: 10px;
	}
`

const StyledTag = styled(Tag).attrs(({ id, selectedColor, selectedSize }) => ({
	color: (id === selectedColor.id && "#2db7f5") || (id === selectedSize.id && "#87d068")
}))`
	&& {
		cursor: pointer;
		margin-bottom: 5px;
		.stock-text {
			color: ${({ id, selectedSize }) => (id === selectedSize.id && "#fff") || theme.greyColor[2]};
		}
	}
`

const StyledScrolling = styled(ScrollingRow)`
	position: relative;
	.ant-col {
		height: 240px;
		max-height: 400px;
		transition: all 0.2s ease;
		.ant-tag {
			opacity: 0;
			pointer-events: none;
			transition: all 0.2s ease;
		}
		img {
			height: 100%;
			object-fit: cover;
		}

		&:hover {
			img {
				filter: brightness(0.5);
			}
			.ant-tag {
				opacity: 1;
			}
		}
	}
`

const { Paragraph, Text } = Typography

function ProductDetail() {
	const [selectedColor, setSelectedColor] = useState({})
	const [selectedSize, setSelectedSize] = useState({})
	const [modalShare, setModalShare] = useState(false)
	const { id: productId } = useParams()
	const { push } = useHistory()
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const couriers = useSelector(({ rajaOngkir }) => rajaOngkir.couriers)
	const sortedFromCheapest = useSelector(({ rajaOngkir }) => rajaOngkir.cheapest)
	const user = useSelector(({ user }) => user.user)
	const product = useSelector(({ product }) => product.product)
	const productPrice = useSelector(({ product }) => product.productPrice)
	const loadingCart = useSelector(({ product }) => product.loadingCart)
	const loading = useSelector(({ product }) => product.loading)
	const vipPrice = (product.product_price || []).find((item) => item.price_type === "VIP")?.price || 0
	const regulerPrice = (product.product_price || []).find((item) => item.price_type === "REGULER")?.price || 0

	const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
	const { account_type_id: typeId } = accountType
	const token = localStorage.getItem("access_token")
	const isVip = typeId && typeId === 2
	const isShoes = product.categories?.id === 2
	const isSale = product.categories?.id === 7
	const sizeIsNotSelected = Object.keys(selectedSize).length === 0
	const colorIsNotSelected = Object.keys(selectedColor).length === 0
	const seenText = product.product_viewer === 0 ? "Belum pernah dilihat" : "Dilihat " + product.product_viewer + "x"

	const marketingText =
		((!token || typeId === 1) && (
			<span>
				Dapatkan produk ini seharga <strong>Rp {pricer(vipPrice)}</strong> dengan menjadi member VIP kami.{" "}
				<Link to={token ? "/upgrade" : "/login"}>Daftar jadi member VIP</Link>
			</span>
		)) ||
		(token && isVip && "Great! Kamu berhak dapat harga spesial karena kamu adalah member VIP kami! 🎉")

	const handleSelectColor = (color, stock, isShoes) => {
		if (!isShoes && (stock === TEXT_STOCK_HABIS || stock === 0)) return
		setSelectedColor(color)
	}
	const handleSelectSize = (size, stock) => {
		if (stock === TEXT_STOCK_HABIS || stock === 0) return
		setSelectedSize(size)
	}

	const color = (product.product_detail || []).map((item) => {
		const stock = item.product_more[0].stock || 0
		return (
			<StyledTag
				key={item.id}
				id={item.id}
				isShoes={isShoes}
				selectedColor={selectedColor}
				selectedSize={selectedSize}
				onClick={() => handleSelectColor(item, stock, isShoes)}
			>
				{item.color} {!isShoes && `(${stock})`}
			</StyledTag>
		)
	})

	const size = (catId) => {
		if (catId === 2 || catId === 7) {
			return selectedColor.product_more?.map((item) => {
				if (item.size === 0) return null
				return (
					<StyledTag
						key={item.id}
						id={item.id}
						isShoes={isShoes}
						selectedColor={selectedColor}
						selectedSize={selectedSize}
						onClick={() => handleSelectSize(item, item.stock)}
					>
						{item.size} <span className="stock-text">({item.stock || ""})</span>
					</StyledTag>
				)
			})
		}

		return "-"
	}

	const handleAddToCart = () => {
		if (!token) {
			return message.loading("Mengalihkan ke Login...", 1).then(() => {
				push({ pathname: "/login", state: { previousUrl: pathname } })
				message.error("Kamu harus login dulu ya")
			})
		}
		const saleAndAlsoShoes = isSale && selectedSize.size > 0
		const item = {
			product_id: Number(productId),
			product_more_detail_id: isShoes || saleAndAlsoShoes ? selectedSize.id : selectedColor.product_more?.[0]?.id,
			weight: product.weight,
			qty: 1,
			color: selectedColor.color,
			size: isShoes || saleAndAlsoShoes ? selectedSize.size : selectedColor.product_more?.[0]?.size,
			total_price: productPrice * 1
		}

		dispatch(addItemToCart(item))
	}

	const handleAddToWishlist = () => {
		if (!selectedColor || Object.keys(selectedColor).length === 0) {
			return message.error("Jangan lupa pilih warna nya ya")
		}
		const item = {
			product_id: Number(productId),
			product_more_detail_id: (selectedColor.product_more || [])[0].id,
			color: selectedColor.color,
			size: (selectedColor.product_more || [])[0].size
		}

		dispatch(addItemToWishlist(item))
	}

	const handleShare = () => {
		shareToSocialMedia(
			{
				title: product.name + " di Zigzag Online Shop",
				text: `Belanja ${product.name} hanya di Zigzag Online Shop`,
				url: URL_ZIZGAG + pathname
			},
			setModalShare
		)
	}

	useEffect(() => {
		dispatch(fetchProductItem(Number(productId)))
		if (token) {
			dispatch(fetchUser())
			const data = {
				origin: ORIGIN.cityId,
				destination: user.subdistrict,
				weight: product.weight,
				destinationType: user.subdistrict ? "subdistrict" : "city",
				originType: "city",
				courier: COURIER_LIST
			}

			dispatch(fetchCouriers(data))
		}
	}, [dispatch, product.weight, productId, token, user.subdistrict])

	return (
		<Layout sidebar>
			<Modal visible={modalShare} onCancel={() => setModalShare(false)}>
				<Paragraph className="mb2em">Share produk ini</Paragraph>
				<Text copyable={{ text: URL_ZIZGAG + pathname }}>Copy link produk</Text>
				<Input name="input" value={URL_ZIZGAG + pathname} className="mb2em" />
				<Button block onClick={handleShare}>
					Share ke social media...
				</Button>
			</Modal>

			<Section>
				<Row gutter={64} type="flex">
					<Col lg={14} xs={24}>
						<Lightbox>
							<SRLWrapper options={LIGHTBOX_SETTING}>
								<StyledScrolling alwaysSnapStop height={mobile ? "300px" : "600px"}>
									{(product.product_image || []).map((item) => (
										<Col
											xs={24}
											lg={24}
											key={item.id}
											className={`cursor-pointer ${!mobile && "h-100"}`}
										>
											<Tag className="br-10 center-absolute" color="black">
												<Icon type="fullscreen" />
												&nbsp; Perbesar
											</Tag>
											<img
												src={item.picture}
												alt={item.caption}
												width="100%"
												height="100%"
												className="mb2em br-10"
											/>
											<Text type="secondary">{item.caption}</Text>
										</Col>
									))}
								</StyledScrolling>
							</SRLWrapper>
						</Lightbox>
					</Col>

					<Col lg={10} xs={24}>
						<SectionPrice
							setModalShare={setModalShare}
							isVip={isVip}
							product={product}
							price={{ regulerPrice, productPrice }}
						/>

						{product.product_viewer ? (
							<Paragraph type="secondary">
								<Icon type="eye" /> {seenText}
							</Paragraph>
						) : null}

						{typeId && typeId !== 3 && (
							<Alert message={marketingText} type="info" showIcon className="ta-left mb1em" />
						)}

						{token && <PanelOngkir data={{ sortedFromCheapest, user, couriers, product }} />}

						<Stats>
							<Row type="flex">
								<Col lg={8} xs={12}>
									<Heading content="Kategori" subheader={product.categories?.name} reverse />
								</Col>
								<Col lg={6} xs={12}>
									<Heading content="Berat" subheader={`${product.weight} gr`} reverse />
								</Col>
								<Col lg={10} xs={12}>
									<Heading content="Material" subheader={product.material} reverse />
								</Col>
							</Row>
						</Stats>

						<StyledSection paddingHorizontal="0" marginBottom="0">
							<Row gutter={32}>
								<Col lg={12}>
									<Heading reverse content="Warna" subheader={color} marginBottom="0" />
								</Col>
								<Col lg={12}>
									<Heading
										reverse
										content="Ukuran"
										subheader={size(product.categories?.id)}
										marginBottom="0"
									/>
								</Col>
							</Row>
						</StyledSection>

						<Divider />

						<StyledSection paddingHorizontal="0" marginBottom="0">
							<Button
								type="primary"
								icon="shopping-cart"
								disabled={isShoes ? colorIsNotSelected || sizeIsNotSelected : colorIsNotSelected}
								onClick={handleAddToCart}
								loading={loadingCart}
							>
								Tambahkan ke cart
							</Button>{" "}
							&nbsp;{" "}
							<ButtonLink icon="heart" onClick={handleAddToWishlist} loading={loading}>
								Wishlist
							</ButtonLink>
						</StyledSection>
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

function SectionPrice({ product, price, isVip, setModalShare }) {
	const { regulerPrice, productPrice } = price

	return (
		<Row>
			<Col lg={24} xs={12}>
				<Heading
					bold
					content={product.name}
					subheader={
						<Paragraph>
							{isVip ? (
								<>
									<Text delete disabled>
										Rp {pricer(regulerPrice)}
									</Text>{" "}
									&nbsp; Rp {pricer(productPrice)}
								</>
							) : (
								`Rp ${pricer(productPrice)}`
							)}
						</Paragraph>
					}
				/>
			</Col>
			{mobile && (
				<Col lg={12} className="ta-right">
					<Button icon="more" type="ghost" shape="circle" onClick={() => setModalShare(true)} />
				</Col>
			)}
		</Row>
	)
}

function PanelOngkir({ data }) {
	let { sortedFromCheapest, user, couriers, product } = data

	couriers = couriers.filter(
		(item) => item.code !== "shopeecashless" && item.code !== "tokopedia" && item.code !== "gosend"
	)

	const gosendPotential = user.city === Number(ORIGIN.cityId)

	return (
		<Collapse bordered={false} expandIconPosition="right" className="mb2em">
			<Collapse.Panel
				header={
					<Row gutter={16}>
						<Col lg={4} xs={4}>
							<DynamicIcon type="icon-Delivery" size={40} />
						</Col>
						<Col lg={20} xs={20}>
							<Text>Ongkos kirim mulai dari Rp {pricer(sortedFromCheapest[0] || 0)}</Text>
							<Paragraph className="mb0">
								Ke{" "}
								<Text strong>
									{user.subdistrict_name || user.city_name}, {user.province_name}
								</Text>
							</Paragraph>
						</Col>
					</Row>
				}
			>
				<Row gutter={16} type="flex" justify="space-between">
					<Col lg={8}>
						<Text type="secondary">Dikirim dari</Text>
						<Paragraph className="mb0">{ORIGIN.city}</Paragraph>
					</Col>
					<Col lg={8} className="ta-right">
						<Text type="secondary">Berat</Text>
						<Paragraph className="mb0">{product.weight} gr</Paragraph>
					</Col>
				</Row>
				<Divider />
				{gosendPotential && (
					<Alert type="success" showIcon message="Pengiriman ini bisa pake GoSend (express delivery)" />
				)}
				<Paragraph>
					<ul>
						{couriers.map((courier) => (
							<li key={courier.code}>
								<Paragraph className="mb0">{courier.name}</Paragraph>
								<ul>
									{courier.costs.map((cost) => (
										<li key={cost.service}>
											<Text type="secondary">{cost.service}</Text>: Rp{" "}
											{pricer(cost.cost[0]?.value)}
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</Paragraph>
			</Collapse.Panel>
		</Collapse>
	)
}

export default ProductDetail
