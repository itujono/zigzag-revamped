import React from "react"
import { Table } from "antd"
import { pricer, mobile } from "helpers"

export default function OrderItems({ data }) {
	const columns = [
		{ title: "Nama", dataIndex: "product_name", key: "product_name" },
		{ title: "Harga", dataIndex: "product_price", key: "product_price", render: data => `Rp ${pricer(data)}` },
		{ title: "Kuantitas", dataIndex: "product_qty", key: "product_qty" },
		{
			title: "Total",
			dataIndex: "product_total_price",
			key: "product_total_price",
			render: data => `Rp ${pricer(data)}`
		}
	]

	return <Table dataSource={data} columns={columns} size="middle" scroll={{ x: mobile }} />
}
