/* eslint-disable react/display-name */
import React from "react"
import { Table, Avatar } from "antd"
import { pricer, mobile } from "helpers"

export default function OrderItems({ data }) {
	const columns = [
		{
			title: "Nama",
			key: "product_name",
			render: (data) => (
				<div>
					<Avatar src={data.product_order_detail?.product_image.picture} />
					&nbsp; {data.product_name}
				</div>
			)
		},
		{
			title: "Kategori",
			dataIndex: "product_order_detail",
			key: "category",
			render: ({ categories }) => categories.name
		},
		{
			title: "Harga",
			key: "product_price",
			render: (data) => data.product_qty + " x " + data.product_price
		},
		{
			title: "Total",
			dataIndex: "product_total_price",
			key: "product_total_price",
			render: (data) => `Rp ${pricer(data)}`
		}
	]

	return <Table dataSource={data} columns={columns} size="middle" scroll={{ x: mobile }} />
}
