import React from "react"
import { Card as Cardee } from "antd"
import styled from "styled-components"

const StyledCard = styled(Cardee)`
	&:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 9px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
	}
`

function Card(props) {
	return <StyledCard {...props}>{props.children}</StyledCard>
}

export default Card
