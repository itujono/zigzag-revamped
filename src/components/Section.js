import React from "react"
import styled from "styled-components"
import { media } from "helpers"

const StyledSection = styled.section`
	&& {
		padding: ${({ paddingHorizontal }) => (paddingHorizontal ? `2em ${paddingHorizontal}` : `2em 4em`)};
		text-align: ${({ textAlign }) => textAlign || "left"};
		margin-bottom: ${({ marginBottom }) => marginBottom || "1em"};
		width: ${({ width }) => width || "100%"};
		margin: ${({ centered }) => centered && "0 auto"};
	}

	${media.mobile`
        && {
			padding: ${({ paddingHorizontal }) => (paddingHorizontal ? `2em ${paddingHorizontal}` : `2em 1.5em`)};
			width: 100%;
		}
    `}
`

function Section({ children, ...props }) {
	return <StyledSection {...props}>{children}</StyledSection>
}

export default Section
