import React, { useState } from "react"
import { Section, Heading, Button } from "components"
import { List, Icon, Avatar, Row, Col } from "antd"
import styled from "styled-components"
import { historyData } from "helpers/dummy"
import { pricer, mobile, media } from "helpers"
import { theme } from "styles"

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
	background-color: ${theme.greyColor[3]};
`

function HistoryOrder(props) {
	const [selectedItem, setSelectedItem] = useState("")

	const handleSelect = orderNumber => {
		if (selectedItem === orderNumber) setSelectedItem("")
		else setSelectedItem(orderNumber)
	}

	return (
		<Section>
			<Heading content="History Order" marginBottom="3em" bold />
			<List
				itemLayout="horizontal"
				dataSource={historyData}
				renderItem={({ orderNumber, time, total }) => {
					const isSelected = orderNumber === selectedItem

					return (
						<div style={{ marginBottom: "1.5em" }}>
							<ListItem
								selectedItem={selectedItem}
								orderNumber={orderNumber}
								actions={[
									<Button
										type="link"
										icon={isSelected ? "up" : "down"}
										onClick={() => handleSelect(orderNumber)}
									>
										{isSelected ? "Tutup detail" : "Lihat detail"}
									</Button>
								]}
							>
								<List.Item.Meta
									avatar={
										mobile ? null : (
											<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
										)
									}
									title={<a href="https://ant.design">{orderNumber}</a>}
									description={
										<>
											<span>
												<Icon type="clock-circle" /> &nbsp; {time}
											</span>{" "}
											&nbsp; &middot; &nbsp;
											<span>
												<Icon type="dollar" /> &nbsp; Rp {pricer(total)}
											</span>
										</>
									}
								/>
							</ListItem>
							{isSelected && (
								<ContentDetail>
									<Row gutter={32}>
										<Col lg={8}>
											<Heading reverse content="Metode pembayaran" subheader="Transfer" />
											<Heading reverse content="Alamat pengiriman" subheader="Jalan Tandak 89" />
										</Col>
										<Col lg={8}>
											<Heading
												reverse
												content="Penerima"
												subheader="Rina Mustika - 08234828833"
											/>
											<Heading reverse content="Nomor resi" subheader="GT9943000HY" />
										</Col>
										<Col lg={8}>
											<Heading reverse content="Status orderan" subheader="Dibatalkan" />
											<Heading reverse content="Ekspedisi" subheader="JNE" />
										</Col>
									</Row>
								</ContentDetail>
							)}
						</div>
					)
				}}
			/>
		</Section>
	)
}

export default HistoryOrder
