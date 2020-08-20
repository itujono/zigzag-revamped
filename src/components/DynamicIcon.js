import React from "react"
import Icon from "antd/lib/icon"

export default function DynamicIcon({ size, color, ...props }) {
	const TheIcon = Icon.createFromIconfontCN({
		scriptUrl: "//at.alicdn.com/t/font_1551588_9e985k6r2eb.js",
		extraCommonProps: { style: { fontSize: size || 20, color } }
	})

	return <TheIcon {...props} size={size} />
}
