import React from "react"
import styled from "styled-components"
import { Card } from "components"
import { Statistic, Divider, Row, Col, Select } from "antd"
import { reverseStyle } from "./Heading"
import { pricer, media } from "helpers"
import { theme } from "styles"
import { range } from "helpers/dummy"

const StyledChartCard = styled(Card)`
	&& {
		${media.mobile`
            margin-bottom: 1em;
        `}
	}
	&& {
		margin-bottom: 1em;
		border-radius: 8px;
		transition: ${theme.transition[0]};
		&:hover {
			box-shadow: ${theme.boxShadow[0]};
			transform: unset;
			border: 1px solid ${theme.border};
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
	span {
		font-size: initial;
		font-weight: normal;
		color: ${theme.greyColor[1]};
	}
`

const StyledStat = styled(Statistic)`
	.ant-statistic-title {
		margin-bottom: 0;
	}
	.ant-statistic-content-value-int {
		font-size: 0.8em;
	}
`

function StatCard({ title = "", value = 0, roleData = {} }) {
	const { tutor = 0, parent = 0, student = 0 } = roleData

	const mainTitle = (
		<Row type="flex" justify="space-between" align="middle">
			<Col>
				<h3 style={{ ...reverseStyle, marginBottom: 0 }}>{title}</h3>
			</Col>
			<Col lg={8}>
				<Select name="range">
					{range.map(({ value, label }) => (
						<Select.Option key={value} defaultValue={range[0].value} value={value}>
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
				{pricer(value)} &nbsp; <span>{title.toLowerCase()}</span>
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
