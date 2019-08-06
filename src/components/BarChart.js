import React from "react"
import { VictoryChart, VictoryBar, VictoryLabel } from "victory"
import { victoryTheme } from "styles"
import { ChartCard } from "components"

function BarChart({ data, domainPadding = 10, axis: { x, y }, labels, title, ...props }) {
	return (
		<ChartCard title={title}>
			<VictoryChart {...props} theme={victoryTheme} domainPadding={domainPadding}>
				<VictoryBar
					data={data}
					labels={labels}
					labelComponent={<VictoryLabel dx={20} />}
					alignment="start"
					x={x}
					y={y}
				/>
			</VictoryChart>
		</ChartCard>
	)
}

export default BarChart
