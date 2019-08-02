import React from "react"
import { Card as Cardee } from "antd"
import styled from "styled-components"
import { theme } from "styles"

const StyledCard = styled(Cardee)`
	&:hover {
		transform: translateY(-3px);
		box-shadow: ${theme.boxShadow[0]};
		transition: all 0.2s ease;
	}
`

function Card(props) {
	return <StyledCard {...props}>{props.children}</StyledCard>
}

export default Card
