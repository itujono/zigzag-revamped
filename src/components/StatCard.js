import React, { useState } from "react"
import styled from "styled-components"
import { Card, ButtonLink } from "components"
import { Statistic, Divider, Row, Col, Select } from "antd"
import { reverseStyle } from "./Heading"
import { pricer, media } from "helpers"
import { theme as themeStyle } from "styles"
import theme from "styled-theming"

const backgroundColor = theme("mode", {
	dark: themeStyle.darkColor[0],
	light: "#fff"
})

const fontColor = theme("mode", {
	dark: "#eee",
	light: "inherit"
})

const borderColor = theme("mode", {
	dark: themeStyle.semiTransparentColor[0],
	light: "#eee"
})

const StyledChartCard = styled(Card)`
	&& {
		${media.mobile`
            margin-bottom: 1em;
        `}
	}
	&& {
		background-color: ${backgroundColor};
		color: ${fontColor};
		margin-bottom: 1em;
		border: 1px solid ${borderColor};
		border-radius: 8px;
		transition: ${themeStyle.transition[0]};
		&:hover {
			box-shadow: ${themeStyle.boxShadow[0]};
			transform: unset;
			border: 1px solid ${themeStyle.border[0]};
		}
		.ant-card-head {
			border-bottom: 1px solid ${borderColor};
			.ant-card-head-title {
				overflow: visible;
			}
		}
		.ant-divider {
			background-color: ${borderColor};
		}
		.ant-card-body {
			padding: 1.5em;
		}
	}
`

const MainStat = styled.h3`
	font-size: 1.6em;
	color: ${fontColor};
	span {
		font-size: initial;
		font-weight: normal;
		color: ${fontColor};
	}
`

const StyledStat = styled(Statistic)`
	.ant-statistic-title {
		color: ${fontColor};
		margin-bottom: 0;
	}
	.ant-statistic-content-value-int {
		color: ${fontColor};
		font-size: 0.8em;
	}
`

const StyledThree = styled.h3`
	color: ${fontColor};
`

function StatCard({ title = "", value = 0, roleData = {}, range = [] }) {
	const [selectedOption, setOption] = useState(range[0].value)
	const { annual = {}, monthly = {}, weekly = {}, daily = {} } = roleData
	const theData =
		selectedOption === "daily"
			? daily
			: selectedOption === "annual"
			? annual
			: selectedOption === "monthly"
			? monthly
			: weekly
	const total = Object.values(theData).reduce((acc, curr) => acc + curr, 0)

	console.log({ theData, total })

	const mainTitle = (
		<Row type="flex" justify="space-between" align="middle">
			<Col>
				<StyledThree style={{ ...reverseStyle, marginBottom: 0 }}>{title}</StyledThree>
			</Col>
			<Col lg={10}>
				<Select name="range" defaultValue={range[0].value} onChange={value => setOption(value)}>
					{range.map(({ value, label }) => (
						<Select.Option key={value} value={value}>
							{label}
						</Select.Option>
					))}
				</Select>
			</Col>
		</Row>
	)

	return (
		<StyledChartCard title={mainTitle}>
			<MainStat>
				{pricer(total)} <span>{title.toLowerCase()}</span> &nbsp;
				<ButtonLink icon="arrows-alt">Expand</ButtonLink>
			</MainStat>
			<Divider />
			<Row type="flex" justify="space-between">
				<Col>
					<StyledStat title="Tutor" value={theData.tutor} />
				</Col>
				<Col>
					<StyledStat title="Parent/student" value={theData.parent} />
				</Col>
				<Col>
					<StyledStat title="Agency" value={theData.agency} />
				</Col>
			</Row>
		</StyledChartCard>
	)
}

export default StatCard
