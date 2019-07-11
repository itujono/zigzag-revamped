import React from "react"
import styled from "styled-components"
import { media } from "helpers"

const StyledSection = styled.section`
	${media.mobile`
        padding: ${({ paddingHorizontal }) => (paddingHorizontal ? `2em ${paddingHorizontal}` : `2em 1.5em`)};
    `}
	&& {
		padding: ${({ paddingHorizontal }) => (paddingHorizontal ? `2em ${paddingHorizontal}` : `2em 4em`)};
		text-align: ${({ textAlign }) => textAlign || "left"};
		margin-bottom: ${({ marginBottom }) => marginBottom || "1em"};
	}
`

function Section({ children, ...props }) {
	return <StyledSection {...props}>{children}</StyledSection>
}

export default Section
