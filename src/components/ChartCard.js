import React from "react"
import { Card } from "antd"
import styled from "styled-components"
import { theme } from "styles"

const StyledCard = styled(Card)`
	&& {
		border-radius: 8px;
		transition: ${theme.transition[0]};
		&:hover {
			box-shadow: ${theme.boxShadow[0]};
		}
		.ant-card-body {
			padding: 0;
			padding-left: 1.5em;
		}
	}
`

function ChartCard({ children, ...props }) {
	return <StyledCard {...props}>{children}</StyledCard>
}

export default ChartCard
