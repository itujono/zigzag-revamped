import React from "react"
import Icon from "antd/lib/icon"

// Ini komponen yang sesungguhnya!

export default function DynamicIcon({ size, color, ...props }) {
	const TheIcon = Icon.createFromIconfontCN({
		scriptUrl: "//at.alicdn.com/t/font_1551588_e3z7apix0p.js",
		extraCommonProps: { style: { fontSize: size || 20, color } }
	})

	return <TheIcon {...props} size={size} />
}
