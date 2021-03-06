import React, { useState } from "react"
import { Section, Heading, Card, Button, Modal, Alert } from "components"
import styled from "styled-components"
import { Row, Col, Checkbox, Popover, Typography, message } from "antd"
import { useHistory } from "react-router-dom"

import { theme } from "styles"
import { pricer, media, mobile } from "helpers"
import { useDispatch, useSelector } from "react-redux"
import { ID_AKUN_KOKO, UserType } from "helpers/constants"

const StyledCard = styled(Card)`
	&& {
		padding: 2em 3em;
		background-color: ${theme.greyColor[4]};

		${media.mobile`
			padding: 1em;
		`}
	}
`

const StyledRow = styled(Row).attrs({
	type: "flex",
	justify: "space-between",
	align: "middle"
})`
	.right {
		text-align: right;
	}
	.discount {
		h4 {
			color: ${theme.greenColor};
		}
	}
`

const StyledPopover = styled(Popover)`
	cursor: pointer;
	.ant-popover-inner-content {
		padding: 2em;
		text-align: center;
	}
`

const { Text } = Typography

export default function Summary({ handlers: { saveOrder }, data: { user = {} } }) {
	const { push } = useHistory()
	const dispatch = useDispatch()
	const loading = useSelector(({ other }) => other.loadingOrder)
	const [confirmModal, setConfirmModal] = useState(false)
	const [allGood, setAllGood] = useState(false)
	const userId = localStorage.getItem("user_id")
	const isKoko = Number(userId) === ID_AKUN_KOKO

	const formData = JSON.parse(localStorage.getItem("formData")) || {}
	const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
	const { account_type_remark: role = "" } = accountType
	const isPartner = role.toLowerCase() === UserType.PARTNER
	const { customer_service: cs = {} } = user
	const csWhatsappNumber = (cs.whatsapp || "").startsWith("0") && "62" + (cs.whatsapp || "").slice(1)
	const uniqueCode = formData.payment?.value === "deposit" ? 0 : Number(formData.unique_code || 0)

	const { cartTotal = {}, order_detail = {} } = formData

	const generalTotal =
		Number(order_detail.ekspedition_total || 0) +
		Number(cartTotal?.price || 0) +
		uniqueCode -
		Number(cartTotal.discount || 0)

	const handleSaveOrder = () => {
		// prettier-ignore
		const { cartItems, cartTotal, province, province_id, city, city_id, subdistrict, subdistrict_id, order_detail = {}, address, payment, deposit, ...restValues } = formData

		if (cartTotal?.price === 0) {
			return message.error("Sepertinya ada yg salah dengan totalan nya. Silakan refresh dan coba lagi ya.")
		}

		const adjustedCartItems = formData.cartItems.map(({ product_price, product_total_price, ...item }) => {
			if (Array.isArray(product_price)) {
				if (isKoko) {
					product_price = product_price.find((item) => item.price_type.toLowerCase() === "pokok") || {}
				} else {
					product_price =
						product_price.find((item) => item.price_type.toLowerCase() === role.toLowerCase()) || {}
				}
			} else {
				product_price = isKoko ? item.product_price_pokok : product_price
			}

			product_total_price = isKoko ? product_price?.price * item.product_qty : product_total_price

			const { cart_id, weight_per_pcs, product_data, ...restCart } = item
			return { ...restCart, product_price: product_price?.price, product_total_price }
		})

		const values = {
			...restValues,
			province_name: formData.province.text,
			city_name: formData.city.text,
			subdistrict_name: formData.subdistrict.text,
			payment_method: formData.isSelfPickup ? "deposit" : formData.payment?.value,
			order_detail: JSON.stringify(adjustedCartItems),
			shipping_address: formData.address,
			order_id: order_detail.id || 0,
			total_weight: cartTotal.roundedWeight,
			discount: cartTotal.discount || 0,
			pickupGudang: formData.isSelfPickup ? 1 : 0,
			unique_code: uniqueCode,
			zip: formData.zip || 0
		}

		dispatch(saveOrder(values, push))
	}

	if (!isPartner && !formData.payment) push("/404")

	return (
		<Section paddingHorizontal="0">
			<Modal visible={confirmModal} onCancel={() => setConfirmModal(false)}>
				<Heading
					content="Place order sekarang?"
					subheader="Apa kamu yakin mau place order sekarang? Action ini tidak bisa di-undo lagi."
				/>
				<Button loading={loading} icon="check" onClick={handleSaveOrder}>
					Ya, place order sekarang
				</Button>
			</Modal>

			<Heading
				content="Ringkasan pemesanan"
				subheader="Harap dibaca lagi semua detail dengan seksama"
				marginBottom="3em"
			/>

			<StyledCard noHover>
				<Heading
					content="Periksa sekali lagi 🧐"
					subheader="Setelah ini, kamu akan placing order. Sebelumnya, mohon pastikan sekali lagi melalui panel di samping (dan detail total di bawah ini) bahwa semua detail orderan kamu sudah tepat."
					marginBottom="2em"
				/>
				<Section paddingHorizontal="0">
					<StyledRow>
						<Col lg={12} xs={12}>
							<Heading reverse content="Subtotal" subheader="Total harga item di cart kamu" />
						</Col>
						<Col lg={8} xs={12} className="right">
							<Heading content={`Rp ${pricer(cartTotal?.price || 0)}`} />
						</Col>
					</StyledRow>
					<StyledRow>
						<Col lg={12} xs={12}>
							<Heading reverse content="Diskon" subheader="Jika ada diskon, akan muncul di sini" />
						</Col>
						<Col lg={8} xs={12} className="right">
							<Heading className="discount" content={`- Rp ${pricer(cartTotal.discount || 0)}`} />
						</Col>
					</StyledRow>
					<StyledRow>
						<Col lg={12} xs={12}>
							<Heading reverse content="Ongkos kirim" subheader="Ongkos kirim untuk orderan ini" />
						</Col>
						<Col lg={8} xs={12} className="right">
							<Heading content={`Rp ${pricer(order_detail.ekspedition_total || 0)}`} />
						</Col>
					</StyledRow>
					<StyledRow>
						<Col lg={12} xs={12}>
							<Heading
								reverse
								content="Kode unik transfer"
								subheader="Jangan lupakan kode unik ini ketika transfer"
							/>
						</Col>
						<Col lg={8} xs={12} className="right">
							<Heading content={uniqueCode} />
						</Col>
					</StyledRow>
					<StyledRow gutter={32}>
						<Col lg={16} xs={12}>
							<Heading reverse content="Grand total" subheader="Total yang harus dibayar sekarang" />
						</Col>
						<Col lg={8} xs={12} className="right">
							<Heading
								content={`Rp ${pricer(generalTotal || 0)}`}
								subheader={`${cartTotal.roundedWeight} gram`}
								className="price"
							/>
						</Col>
					</StyledRow>
					<Alert
						type="warning"
						showIcon
						message="HARAP DIPERHATIKAN!"
						className="mb0"
						description={
							<Typography>
								Batas pembayaran dan konfirmasi adalah <Text mark>2 jam</Text>, lebih dari itu orderan
								kamu akan <Text mark>dibatalkan secara otomatis</Text> oleh sistem
							</Typography>
						}
					/>
				</Section>
				<Row className="mb2em">
					<Col lg={24} xs={24}>
						<Checkbox name="allGood" checked={allGood} onChange={() => setAllGood(!allGood)} /> &nbsp; Saya
						sudah lihat, dan saya sadar bahwa semua data sudah benar.{" "}
						<StyledPopover
							trigger="click"
							overlayClassName="cs-popover"
							content={
								<>
									<Heading content="Ada yang salah?" subheader="Hubungi CS kamu sekarang" />
									<Button block>
										<a
											target="_blank"
											rel="noopener noreferrer"
											href={`https://wa.me/${csWhatsappNumber}?text=${encodeURIComponent(
												`Halo, ${
													cs.name || ""
												}. Sepertinya ada yang salah dengan orderan saya...`
											)}`}
										>
											Hubungi via WA
										</a>
									</Button>
								</>
							}
						>
							<span className="primary">Data tidak benar?</span>
						</StyledPopover>
					</Col>
				</Row>
				<Button icon="check" disabled={!allGood} block={mobile} onClick={() => setConfirmModal(true)}>
					Place order sekarang
				</Button>
			</StyledCard>
		</Section>
	)
}
