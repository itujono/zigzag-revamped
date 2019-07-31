import React from "react"
import { VictoryChart, VictoryBar, VictoryTooltip } from "victory"
import { victoryTheme } from "styles"

function BarChart({ data, domainPadding = 10, axis: { x, y } }) {
	return (
		<VictoryChart theme={victoryTheme} domainPadding={domainPadding}>
			<VictoryBar data={data} alignment="start" labelComponent={<VictoryTooltip />} x={x} y={y} />
		</VictoryChart>
	)
}

export default BarChart
