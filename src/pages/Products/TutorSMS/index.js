import React from "react"
import { Section, Heading, BarChart } from "components"
import { Row, Col } from "antd"
import { revenue } from "helpers/dummy"
import { pricer } from "helpers"

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
