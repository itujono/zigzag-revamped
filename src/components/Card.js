import React from "react"
import Cardee from "antd/lib/card"
import styled from "styled-components"

const StyledCard = styled(Cardee)`
	padding: ${({ padding }) => padding || "2em"};
	.ant-card-body {
		padding: ${({ padding }) => padding || "2em"};
	}
	&:hover {
		transform: ${({ noHover }) => !noHover && "translateY(-3px)"};
		box-shadow: ${({ noHover }) => !noHover && "0 5px 9px rgba(0, 0, 0, 0.1)"};
		transition: ${({ noHover }) => !noHover && "all 0.2s ease"};
	}
`

function Card({ children, ...props }) {
	return <StyledCard {...props}>{children}</StyledCard>
}

export default Card
