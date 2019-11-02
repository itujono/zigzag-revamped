import React from "react"
import { Card as Cardee } from "antd"
import styled from "styled-components"

const StyledCard = styled(Cardee)`
	&:hover {
		transform: ${({ noHover }) => !noHover && "translateY(-3px)"};
		box-shadow: ${({ noHover }) => !noHover && "0 5px 9px rgba(0, 0, 0, 0.1)"};
		transition: ${({ noHover }) => !noHover && "all 0.2s ease"};
	}
`

function Card(props) {
	return <StyledCard {...props}>{props.children}</StyledCard>
}

export default Card
