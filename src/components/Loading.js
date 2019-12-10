import React from "react"
import Section from "./Section"
import { Spin, Icon } from "antd"

export default function Loading() {
	const indicator = <Icon type="loading" style={{ fontSize: 24 }} spin />

	return (
		<Section centered>
			<Spin indicator={indicator} />
		</Section>
	)
}
