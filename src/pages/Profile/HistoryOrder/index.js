import React, { useState, useEffect } from "react"
import { Section, Heading, Button, ButtonLink } from "components"
import { List, Icon, Avatar, Row, Col, Menu, Tabs } from "antd"
import styled from "styled-components"
import { connect } from "react-redux"

import { fetchOrderHistory } from "store/actions/otherActions"
import { historyData } from "helpers/dummy"
import { pricer, mobile, media } from "helpers"
import { theme } from "styles"
import OrderItems from "./OrderItems"

const ListItem = styled(List.Item)`
	&&& {
		border-bottom: none;
	}
`

const ContentDetail = styled.div`
	${media.mobile`
		margin-left: 0;
	`}
	padding: 1.5em;
	margin-left: 3.4em;
	background-color: ${theme.greyColor[4]};
`

function HistoryOrder({ orderHistory, ...props }) {
	const [selectedItem, setSelectedItem] = useState("")

	const { fetchOrderHistory } = props

	const handleSelect = orderNumber => {
		if (selectedItem === orderNumber) setSelectedItem("")
		else setSelectedItem(orderNumber)
	}

	useEffect(() => {
		fetchOrderHistory()
	}, [fetchOrderHistory])

	return (
		<Section width="70%" centered>
			<Heading content="History Order" marginBottom="3em" bold />
			<List
				itemLayout="horizontal"
				dataSource={orderHistory}
				renderItem={({ order_code, time, grandtotal_order, status_order, ...item }) => {
					const isSelected = order_code === selectedItem

					return (
						<div style={{ marginBottom: "1.5em" }}>
							<ListItem
								selectedItem={selectedItem}
								orderNumber={order_code}
								actions={[
									<ButtonLink
										key={order_code}
										icon={isSelected ? "up" : "down"}
										onClick={() => handleSelect(order_code)}
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
												<Icon type="clock-circle" /> &nbsp; {time}
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
									<Tabs tabPosition={mobile ? "top" : "left"}>
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
														subheader={item.shipping_address}
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
														subheader={item.airway_bill}
													/>
												</Col>
												<Col lg={8}>
													<Heading
														reverse
														content="Status orderan"
														subheader={status_order.status_remark}
													/>
													<Heading reverse content="Ekspedisi" subheader={"JNE"} />
												</Col>
											</Row>
										</Tabs.TabPane>
										<Tabs.TabPane key="items" tab="Barang belanjaan">
											<OrderItems data={item.orders_detail} />
										</Tabs.TabPane>
										<Tabs.TabPane key="status" tab="Status barang">
											Status barang
										</Tabs.TabPane>
									</Tabs>
								</ContentDetail>
							)}
						</div>
					)
				}}
			/>
		</Section>
	)
}

const mapState = ({ other }) => ({
	orderHistory: other.orderHistory
})

export default connect(mapState, { fetchOrderHistory })(HistoryOrder)
