import React, { useState, useEffect, useCallback } from "react"
import { Section, Heading, Button, ButtonLink, Empty } from "components"
import { List, Icon, Avatar, Row, Col, Menu, Tabs } from "antd"
import styled from "styled-components/macro"
import { connect } from "react-redux"

import { fetchOrderHistory, cancelOrder } from "store/actions/otherActions"
import { fetchAirwayBill } from "store/actions/rajaOngkirActions"
import { pricer, mobile, media } from "helpers"
import { theme } from "styles"
import OrderItems from "./OrderItems"
import Waybill from "./Waybill"
import CancelOrder from "./CancelOrder"
import moment from "moment"
import { Link } from "react-router-dom"

const ListItem = styled(List.Item)`
	&&& {
		border-bottom: none;
	}
`

const ContentDetail = styled.div`
	padding: 1.5em;
	margin-left: 3.4em;
	background-color: ${theme.greyColor[4]};

	${media.mobile`
		margin-left: 0;
	`}
`

function HistoryOrder({ orderHistory, loading, airwayBill, ...props }) {
	const [selectedItem, setSelectedItem] = useState({})

	const { fetchOrderHistory, fetchAirwayBill, cancelOrder } = props

	const handleSelect = item => {
		if (selectedItem.order_code === item.order_code) setSelectedItem({})
		else setSelectedItem(item)
	}

	const handleFetchAirwayBill = useCallback(
		(resi_order, courier) => {
			fetchAirwayBill({ waybill: resi_order, courier })
		},
		[fetchAirwayBill]
	)

	useEffect(() => {
		fetchOrderHistory()
		if (selectedItem.resi_order) {
			handleFetchAirwayBill(selectedItem.resi_order, (selectedItem.ekspedition_data || {}).ekspedition_code)
		}
	}, [
		fetchAirwayBill,
		fetchOrderHistory,
		handleFetchAirwayBill,
		selectedItem.ekspedition_data,
		selectedItem.resi_order
	])

	return (
		<Section width="80%" centered>
			<Heading content="History Order" marginBottom="3em" bold />
			<List
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
				renderItem={item => {
					const { order_code, ekspedition_data: courier = {}, grandtotal_order, status_order } = item
					const isSelected = order_code === selectedItem.order_code
					const isNotPaid = status_order.status_id === 1

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
									title={<a href="https://ant.design">{order_code}</a>}
									description={
										<>
											<span>
												<Icon type="clock-circle" /> &nbsp;{" "}
												{moment(item.created_date).format("dddd, DD MMMM YYYY")}
											</span>{" "}
											&nbsp; &middot; &nbsp;
											<span>
												<Icon type="dollar" /> &nbsp; Rp {pricer(grandtotal_order)}
											</span>
										</>
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
														subheader={`${item.shipping_address}, ${item.province_name}, ${item.city_name}, ${item.subdistrict_name} ${item.zip}`}
													/>
												</Col>
												<Col lg={8}>
													<Heading
														reverse
														content="Penerima"
														subheader={`${item.name} - ${(item.customers || {}).tele}`}
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
											<CancelOrder data={item} cancelOrder={cancelOrder} />
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
			/>
		</Section>
	)
}

const mapState = ({ other, rajaOngkir }) => ({
	orderHistory: other.orderHistory.sort((a, b) => Date.parse(b.created_date) - Date.parse(a.created_date)),
	loading: other.loading,
	airwayBill: rajaOngkir.airwayBill
})

export default connect(mapState, { fetchOrderHistory, fetchAirwayBill, cancelOrder })(HistoryOrder)
