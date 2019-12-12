import React from "react"
import { Table } from "antd"

export default function OrderItems({ data }) {
	const columns = [
		{ title: "Nama", dataIndex: "product_name", key: "product_name" },
		{ title: "Harga", dataIndex: "product_price", key: "product_price" },
		{ title: "Kuantitas", dataIndex: "product_qty", key: "product_qty" },
		{ title: "Total", dataIndex: "product_total_price", key: "product_total_price" }
	]

	return <Table dataSource={data} columns={columns} />
}
