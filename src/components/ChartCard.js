import React, { useState } from "react"
import { Card, Row, Col } from "antd"
import styled from "styled-components"
import { theme as themeStyle } from "styles"
import ButtonLink from "./ButtonLink"
import { media } from "helpers"
import theme from "styled-theming"

const backgroundColor = theme("mode", {
	dark: themeStyle.darkColor[0],
	light: "#fff"
})

const fontColor = theme("mode", {
	dark: "#fff",
	light: "inherit"
})

const StyledCard = styled(Card)`
	&& {
		${media.mobile`
            margin-bottom: 1em;
        `}
	}
	&& {
		border-radius: 8px;
		color: ${fontColor};
		background-color: ${backgroundColor};
		transition: ${themeStyle.transition[0]};
		&:hover {
			box-shadow: ${themeStyle.boxShadow[0]};
		}
		.ant-card-head {
			.ant-card-head-title {
				overflow: visible;
			}
		}
		.ant-card-body {
			padding: 0;
			padding-left: 1.5em;
		}
	}
`

const LinkButton = styled(ButtonLink)`
	&& {
		position: absolute;
		top: -5px;
		right: -20px;
		&:hover {
			background-color: ${themeStyle.greyColor[5]};
		}
	}
`

const StyledRow = styled(Row)`
	.ant-col {
		color: ${fontColor};
	}
`

function ChartCard({ children, expander = true, ...props }) {
	const [showButton, setShowButton] = useState(false)

	const title = (
		<StyledRow type="flex" justify="space-between">
			<Col>{props.title}</Col>
			{expander && <Col>{showButton && <LinkButton icon="arrows-alt">Expand</LinkButton>}</Col>}
		</StyledRow>
	)

	return (
		<StyledCard
			{...props}
			title={title}
			onMouseOver={() => setShowButton(true)}
			onMouseLeave={() => setShowButton(false)}
		>
			{children}
		</StyledCard>
	)
}

export default ChartCard
