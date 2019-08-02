import React from "react"
import { Section, Heading, BarChart } from "components"
import { Row, Col } from "antd"
import { revenue } from "helpers/dummy"
import { pricer } from "helpers"
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
					<StatCard title="Total users" value={8000} roleData={{ parent: 560, tutor: 900 }} />
				</Col>
				<Col lg={8}>
					<StatCard title="Total users" value={8000} roleData={{ parent: 560, tutor: 900 }} />
				</Col>
				<Col lg={8}>
					<StatCard title="Total users" value={8000} roleData={{ parent: 560, tutor: 900 }} />
				</Col>
			</Row>
			<Row gutter={16}>
				<Col lg={6}>
					<BarChart
						title="Revenue"
						data={revenue}
						axis={{ x: "quarter", y: "earnings" }}
						labels={d => `$${pricer(d.earnings)}`}
					/>
				</Col>
				<Col lg={6}>
					<BarChart
						title="Revenue"
						data={revenue}
						axis={{ x: "quarter", y: "earnings" }}
						labels={d => `$${pricer(d.earnings)}`}
					/>
				</Col>
				<Col lg={6}>
					<BarChart
						title="Revenue"
						data={revenue}
						axis={{ x: "quarter", y: "earnings" }}
						labels={d => `$${pricer(d.earnings)}`}
					/>
				</Col>
				<Col lg={6}>
					<BarChart
						title="Revenue"
						data={revenue}
						axis={{ x: "quarter", y: "earnings" }}
						labels={d => `$${pricer(d.earnings)}`}
					/>
				</Col>
			</Row>
		</Section>
	)
}

export default TutorSMS
