import React, { useState } from "react"
import { Card, Row, Col } from "antd"
import styled from "styled-components"
import { theme } from "styles"
import ButtonLink from "./ButtonLink"
import { media } from "helpers"

const StyledCard = styled(Card)`
	&& {
		${media.mobile`
            margin-bottom: 1em;
        `}
	}
	&& {
		border-radius: 8px;
		transition: ${theme.transition[0]};
		&:hover {
			box-shadow: ${theme.boxShadow[0]};
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
			background-color: ${theme.greyColor[5]};
		}
	}
`

function ChartCard({ children, expander = true, ...props }) {
	const [showButton, setShowButton] = useState(false)

	const title = (
		<Row type="flex" justify="space-between">
			<Col>{props.title}</Col>
			{expander && <Col>{showButton && <LinkButton icon="arrows-alt">Expand</LinkButton>}</Col>}
		</Row>
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
