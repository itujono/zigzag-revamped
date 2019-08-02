import React from "react"
import styled from "styled-components"
import { Typography } from "antd"
import { theme } from "styles"

const Typo = styled(Typography)`
	margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "1.5em")};
`

const Title = styled(Typography.Title)`
	&& {
		font-weight: ${({ bold }) => bold && "bold"};
		margin-bottom: 0;
	}
`

const Paragraph = styled(Typography.Paragraph)`
	&& {
		color: ${({ bold }) => (bold && theme.greyColor[1]) || theme.greyColor[1]};
	}
`

export const reverseStyle = {
	fontSize: 11,
	textTransform: "uppercase",
	lineHeight: 1.4,
	color: theme.greyColor[2]
}

function Heading({ bold, reverse, level, content, subheader, ...props }) {
	return (
		<Typo {...props}>
			<Title bold={bold} style={reverse ? reverseStyle : ""} level={level || 4}>
				{content}
			</Title>
			<Paragraph bold={bold}>{subheader}</Paragraph>
		</Typo>
	)
}

export default Heading
