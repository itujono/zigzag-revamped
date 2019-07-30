import React from "react"
import { Table } from "antd"

export default function OrderItems() {
	const columns = [
		{ title: "Nama", dataIndex: "item", key: "item" },
		{ title: "Harga", dataIndex: "price", key: "price" },
		{ title: "Kuantitas", dataIndex: "qty", key: "qty" },
		{ title: "Total", dataIndex: "total", key: "total" }
	]

	return <Table dataSource={[]} columns={columns} />
}
