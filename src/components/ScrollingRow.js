import React from "react"
import styled from "styled-components"
import { Row } from "antd"
import { media } from "helpers"

const TheRow = styled(Row).attrs(() => ({
	type: "flex",
	gutter: 16
}))`
	&& {
		height: ${({ height }) => height || "250px"};
		margin-bottom: 1.5em;
		padding-top: 1em;
		flex-wrap: nowrap;
		overflow-x: scroll;
		width: auto;
		scroll-snap-type: ${({ snapping }) => snapping && "x mandatory"};
		-webkit-overflow-scrolling: touch;

		.ant-col {
			scroll-snap-stop: ${({ alwaysSnapStop }) => alwaysSnapStop && "always"};
			scroll-snap-align: ${({ snapping }) => snapping && "center"};
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}

	${media.mobile`
		&& {
			flex-wrap: nowrap;
		}
	`}
`

export default function ScrollingRow({ children, snapping = true, alwaysSnapStop = false, ...props }) {
	return (
		<TheRow {...props} snapping={snapping} alwaysSnapStop={alwaysSnapStop}>
			{children}
		</TheRow>
	)
}
