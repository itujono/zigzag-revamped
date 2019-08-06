import React from "react"
import styled from "styled-components"
import { Card } from "components"
import { Statistic, Divider, Row, Col, Select } from "antd"
import { reverseStyle } from "./Heading"
import { pricer, media } from "helpers"
import { theme as themeStyle } from "styles"
import { range } from "helpers/dummy"
import theme from "styled-theming"

const backgroundColor = theme("mode", {
	dark: themeStyle.darkColor[0],
	light: "#fff"
})

const fontColor = theme("mode", {
	dark: "#eee",
	light: "inherit"
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
		border-radius: 8px;
		transition: ${themeStyle.transition[0]};
		&:hover {
			box-shadow: ${themeStyle.boxShadow[0]};
			transform: unset;
			border: 1px solid ${themeStyle.border[0]};
		}
		.ant-card-head {
			.ant-card-head-title {
				overflow: visible;
			}
		}
		.ant-card-body {
			padding: 1.5em;
		}
	}
`

const MainStat = styled.h3`
	font-size: 2em;
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

function StatCard({ title = "", value = 0, suffix = "", roleData = {}, range = [] }) {
	const [option, setOption] = useState(range[0].value)
	const { annual = {}, monthly = {}, weekly = {}, daily = {} } = roleData
	const theData = option === "daily" ? daily : option === "annual" ? annual : option === "monthly" ? monthly : weekly
	const total = Object.values(theData).reduce((acc, curr) => acc + curr, 0)
	const splitted = title.split(" ")

	const mainTitle = (
		<Row type="flex" justify="space-between" align="middle">
			<Col>
				<StyledThree style={{ ...reverseStyle, marginBottom: 0 }}>{title}</StyledThree>
			</Col>
			<Col lg={10}>
				<Select name="range" defaultValue={range[0].value}>
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
				{pricer(total)} <span>{suffix || splitted[splitted.length - 1].toLowerCase()}</span> &nbsp;
				<ButtonLink icon="arrows-alt">Expand</ButtonLink>
			</MainStat>
			<Divider />
			<Row type="flex" justify="space-between">
				<Col>
					<StyledStat title="Tutor" value={tutor} />
				</Col>
				<Col>
					<StyledStat title="Parent" value={parent} />
				</Col>
				<Col>
					<StyledStat title="Student" value={student} />
				</Col>
			</Row>
		</StyledChartCard>
	)
}

export default StatCard
