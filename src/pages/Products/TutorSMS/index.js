import React from "react"
import { Section, Heading, BarChart, ChartCard } from "components"
import { Row, Col } from "antd"
import { dataPv, range, rawData } from "helpers/dummy"
import StatCard from "components/StatCard"

function TutorSMS() {
	return (
		<Section>
			<Heading
				bold
				content="TutorSMS Dashboard"
				subheader="All the data related to TutorSMS"
				marginBottom="4em"
			/>
			<Row gutter={16}>
				<Col lg={8}>
					<StatCard title="Total users" range={range} roleData={rawData} />
				</Col>
				<Col lg={8}>
					<StatCard title="Active users" range={range} roleData={rawData} />
				</Col>
				<Col lg={8}>
					<StatCard title="Number of logins" range={range} roleData={rawData} />
				</Col>
			</Row>
			<Row gutter={16}>
				<Col lg={8}>
					<ChartCard title="Active users">
						<BarChart data={dataPv} dataKey={{ x: "student", y: "tutor", z: "agency" }} xDataKey="name" />
					</ChartCard>
				</Col>
			</Row>
		</Section>
	)
}

export default TutorSMS
