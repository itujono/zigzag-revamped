import React from "react"
import { Section, Heading, ChartCard, BarChart } from "components"
import { Row, Col } from "antd"
import { revenue } from "helpers/dummy"

function TutorSMS() {
	return (
		<Section>
			<Heading
				bold
				content="TutorSMS Dashboard"
				subheader="All the data related to TutorSMS"
				marginBottom="4em"
			/>
			<Row gutter={32}>
				<Col lg={8}>
					<ChartCard title="Revenue">
						<BarChart data={revenue} axis={{ x: "quarter", y: "earnings" }} />
					</ChartCard>
				</Col>
				<Col lg={8}>
					<ChartCard title="Revenue">
						<BarChart data={revenue} axis={{ x: "quarter", y: "earnings" }} />
					</ChartCard>
				</Col>
				<Col lg={8}>
					<ChartCard title="Revenue">
						<BarChart data={revenue} axis={{ x: "quarter", y: "earnings" }} />
					</ChartCard>
				</Col>
			</Row>
		</Section>
	)
}

export default TutorSMS
