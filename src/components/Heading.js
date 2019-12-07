import React from "react"
import styled from "styled-components"
import { Typography } from "antd"

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
		color: ${({ bold }) => bold && "#999"};
	}
`

const reverseStyle = {
	fontSize: 11,
	textTransform: "uppercase",
	lineHeight: 1.4,
	color: "#bbb"
}

function Heading({ bold, reverse, level, content, subheader, ...props }) {
	return (
		<Typo {...props}>
			<Title bold={bold} style={reverse ? reverseStyle : ""} level={level || 4}>
				{content}
			</Title>
			{subheader && <Paragraph bold={bold}>{subheader}</Paragraph>}
		</Typo>
	)
}

export default Heading
