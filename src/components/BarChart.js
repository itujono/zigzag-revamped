import React from "react"
import { BarChart as Chartee, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"

function BarChart({ data, domainPadding = 10, dataKey, xDataKey = "", title, width, ...props }) {
	const { x, y, z } = dataKey

	return (
		<Chartee {...props} width={width || 320} height={300} data={data} margin={{ top: 20 }}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey={xDataKey} />
			<YAxis dataKey={y} />
			<Tooltip />
			<Legend />
			<Bar dataKey={x} fill="#8884d8" />
			<Bar dataKey={y} fill="#82ca9d" />
			<Bar dataKey={z} fill="#fed501" />
		</Chartee>
	)
}

export default BarChart
