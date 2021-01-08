/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react"
import { Section, Heading, ButtonLink, Empty, Button } from "components"
import { List, Icon, Avatar, Row, Col, Tabs, Typography } from "antd"
import styled from "styled-components/macro"
import { useDispatch, useSelector } from "react-redux"

import { fetchOrderHistory, cancelOrder } from "store/actions/otherActions"
import { fetchAirwayBill } from "store/actions/rajaOngkirActions"
import { pricer, mobile, media } from "helpers"
import { theme } from "styles"
import OrderItems from "./OrderItems"
import Waybill from "./Waybill"
import CancelOrder from "./CancelOrder"
import moment from "moment"
import { Link } from "react-router-dom"
import { Virtuoso } from "react-virtuoso"

const ListItem = styled(List.Item)`
	&&& {
		border-bottom: none;
	}
`

const OrderItem = styled.div`
	display: flex;
	padding-top: 2rem;
	justify-content: space-between;
	.section-text {
		display: flex;
		.heading {
			margin-bottom: 0.5rem;
			h4 {
				font-size: 0.8rem;
			}
		}
		> div:last-child {
			padding-left: 2rem;
		}
	}

	${media.mobile`
		padding-left: 0;
		.section-text {
			> div:last-child {
				padding-left: 0;
			}
		}
	`}
`

const ContentDetail = styled.div`
	padding: 0.5rem 1rem;
	margin-left: 4.5rem;
	margin-bottom: 2rem;
	margin-top: 2rem;
	background-color: ${theme.greyColor[4]};

	${media.mobile`
		margin-left: 0;
	`}
`

const Footer = styled.div`
	height: 4rem;
	display: flex;
	padding-top: 3rem;
	color: #999;
	justify-content: center;
	align-items: center;
`

function HistoryOrder() {
	const [selectedItem, setSelectedItem] = useState({})
	const dispatch = useDispatch()
	const orderHistory = useSelector(({ other }) => other.orderHistory)
	const loading = useSelector(({ other }) => other.loading)
	const airwayBill = useSelector(({ rajaOngkir }) => rajaOngkir.airwayBill)

	const handleSelect = (item) => {
		if (selectedItem.order_code === item.order_code) setSelectedItem({})
		else setSelectedItem(item)
	}

	useEffect(() => {
		dispatch(fetchOrderHistory())
		if (selectedItem.resi_order) {
			const courier = (selectedItem.ekspedition_data || {}).ekspedition_code
			dispatch(fetchAirwayBill({ waybill: selectedItem.resi_order, courier }))
		}
	}, [dispatch, selectedItem.ekspedition_data, selectedItem.resi_order])

	return (
		<Section width="100%" centered>
			<Heading content="History Order" marginBottom="3em" bold />
			{orderHistory.length === 0 ? (
				<div className="ta-center">
					<Empty
						isEmptyItems
						description="Kamu belum ada belanja sama sekali"
						button={{ to: "/", text: "Belanja sekarang" }}
					/>
				</div>
			) : (
				<Virtuoso
					style={{ height: "130vh" }}
					data={orderHistory}
					components={{
						Footer: () => (
							<Footer>
								<p>
									Kamu sudah sampai paling bawah <span>🎉</span>
								</p>
							</Footer>
						)
					}}
					itemContent={(idx, item) => {
						const {
							order_code,
							ekspedition_data: courier = {},
							grandtotal_order,
							status_order,
							orders_detail
						} = item
						const isSelected = order_code === selectedItem.order_code
						const isNotPaid = status_order.status_id === 1
						const zip = item.zip === 0 ? "(tidak ada kode pos)" : item.zip

						const productImage = orders_detail[0]?.product_order_detail?.product_image || {}

						const handleCancelOrder = (values, { setSubmitting }) => {
							values = { ...values, order_id: item.id }
							dispatch(cancelOrder(values)).finally(() => setSubmitting(false))
						}

						return (
							<>
								<OrderItem key={item.id}>
									<section className="section-text">
										{mobile ? null : (
											<div>
												<Avatar src={productImage.picture || ""} size="large" />
											</div>
										)}
										<div>
											<Heading
												className="heading"
												content={order_code}
												titleMargin={{ mb: ".5rem" }}
											/>
											<Typography>
												<Typography.Text>
													<Icon type="clock-circle" />
													&nbsp; {moment(item.created_date).format("ddd, DD MMM YYYY HH:mm")}
												</Typography.Text>{" "}
												{!mobile && <>&nbsp; &middot; &nbsp;</>}
												<Typography.Text className="display-block__mobile">
													<Icon type="dollar" />
													&nbsp; Rp {pricer(grandtotal_order)}
												</Typography.Text>
											</Typography>
										</div>
									</section>
									<section className="section-button">
										<Button
											key={order_code}
											icon={isSelected ? "up" : "down"}
											onClick={() => handleSelect(item)}
										>
											{isSelected ? "Tutup detail" : "Lihat detail"}
										</Button>
									</section>
								</OrderItem>
								{!isSelected ? null : (
									<ContentDetail>
										<Tabs tabPosition={mobile ? "top" : "left"} style={{ marginBottom: "2em" }}>
											<Tabs.TabPane key="details" tab="Detail">
												<Row gutter={32}>
													<Col lg={8}>
														<Heading
															reverse
															content="Metode pembayaran"
															subheader={item.payment_method}
														/>
														<Heading
															reverse
															content="Alamat pengiriman"
															subheader={`${item.shipping_address}, ${item.province_name}, ${item.city_name}, ${item.subdistrict_name} ${zip}`}
														/>
													</Col>
													<Col lg={8}>
														<Heading
															reverse
															content="Penerima"
															subheader={`${item.name} - ${item.tele}`}
														/>
														<Heading
															reverse
															content="Nomor resi"
															subheader={item.resi_order || "-"}
														/>
													</Col>
													<Col lg={8}>
														<Heading
															reverse
															content="Status orderan"
															subheader={status_order.status_remark || "-"}
														/>
														<Heading
															reverse
															content="Ekspedisi"
															subheader={`${courier.ekspedition_company} (${courier.ekspedition_remark})`}
														/>
													</Col>
												</Row>
											</Tabs.TabPane>
											<Tabs.TabPane key="items" tab="Barang belanjaan">
												<OrderItems data={item.orders_detail} />
											</Tabs.TabPane>
											<Tabs.TabPane key="status" tab="Status barang">
												<Waybill data={airwayBill} />
											</Tabs.TabPane>
											<Tabs.TabPane key="cancel" tab="Batal order" className="cancel">
												<CancelOrder data={item} cancelOrder={handleCancelOrder} />
											</Tabs.TabPane>
										</Tabs>
										{isNotPaid && (
											<div>
												Sudah melakukan pembayaran?{" "}
												<Link to="/order/confirmation">
													Konfirmasi pembayaran sekarang&nbsp;
													<Icon type="right" />
												</Link>
											</div>
										)}
									</ContentDetail>
								)}
							</>
						)
					}}
				/>
			)}
			{/* <List
				itemLayout="horizontal"
				dataSource={orderHistory}
				loading={loading}
				locale={{
					emptyText: (
						<Empty
							isEmptyItems
							description="Kamu belum ada belanja sama sekali"
							button={{ to: "/", text: "Belanja sekarang" }}
						/>
					)
				}}
				renderItem={(item) => {
					const { order_code, ekspedition_data: courier = {}, grandtotal_order, status_order } = item
					const isSelected = order_code === selectedItem.order_code
					const isNotPaid = status_order.status_id === 1
					const zip = item.zip === 0 ? "(tidak ada kode pos)" : item.zip

					const handleCancelOrder = (values, { setSubmitting }) => {
						values = { ...values, order_id: item.id }
						dispatch(cancelOrder(values)).finally(() => setSubmitting(false))
					}

					return (
						<div style={{ marginBottom: "1.5em" }}>
							<ListItem
								selectedItem={selectedItem.order_code}
								orderNumber={order_code}
								actions={[
									<ButtonLink
										key={order_code}
										icon={isSelected ? "up" : "down"}
										onClick={() => handleSelect(item)}
									>
										{isSelected ? "Tutup detail" : "Lihat detail"}
									</ButtonLink>
								]}
							>
								<List.Item.Meta
									avatar={
										mobile ? null : (
											<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
										)
									}
									title={order_code}
									description={
										<Typography>
											<Typography.Text>
												<Icon type="clock-circle" />
												&nbsp; {moment(item.created_date).format("ddd, DD MMM YYYY HH:mm")}
											</Typography.Text>{" "}
											{!mobile && <>&nbsp; &middot; &nbsp;</>}
											<Typography.Text className="display-block__mobile">
												<Icon type="dollar" />
												&nbsp; Rp {pricer(grandtotal_order)}
											</Typography.Text>
										</Typography>
									}
								/>
							</ListItem>
							{isSelected && (
								<ContentDetail>
									<Tabs tabPosition={mobile ? "top" : "left"} style={{ marginBottom: "2em" }}>
										<Tabs.TabPane key="details" tab="Detail">
											<Row gutter={32}>
												<Col lg={8}>
													<Heading
														reverse
														content="Metode pembayaran"
														subheader={item.payment_method}
													/>
													<Heading
														reverse
														content="Alamat pengiriman"
														subheader={`${item.shipping_address}, ${item.province_name}, ${item.city_name}, ${item.subdistrict_name} ${zip}`}
													/>
												</Col>
												<Col lg={8}>
													<Heading
														reverse
														content="Penerima"
														subheader={`${item.name} - ${item.tele}`}
													/>
													<Heading
														reverse
														content="Nomor resi"
														subheader={item.resi_order || "-"}
													/>
												</Col>
												<Col lg={8}>
													<Heading
														reverse
														content="Status orderan"
														subheader={status_order.status_remark || "-"}
													/>
													<Heading
														reverse
														content="Ekspedisi"
														subheader={`${courier.ekspedition_company} (${courier.ekspedition_remark})`}
													/>
												</Col>
											</Row>
										</Tabs.TabPane>
										<Tabs.TabPane key="items" tab="Barang belanjaan">
											<OrderItems data={item.orders_detail} />
										</Tabs.TabPane>
										<Tabs.TabPane key="status" tab="Status barang">
											<Waybill data={airwayBill} />
										</Tabs.TabPane>
										<Tabs.TabPane key="cancel" tab="Batal order" className="cancel">
											<CancelOrder data={item} cancelOrder={handleCancelOrder} />
										</Tabs.TabPane>
									</Tabs>
									{isNotPaid && (
										<div>
											Sudah melakukan pembayaran?{" "}
											<Link to="/order/confirmation">
												Konfirmasi pembayaran sekarang&nbsp;
												<Icon type="right" />
											</Link>
										</div>
									)}
								</ContentDetail>
							)}
						</div>
					)
				}}
			/> */}
		</Section>
	)
}

export default HistoryOrder
