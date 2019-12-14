import React from "react"
import styled from "styled-components"
import { Section, Heading } from "components"
import { Row, Col, Tag, Timeline } from "antd"
import moment from "moment"
import { theme } from "styles"

const Stats = styled.div`
	padding: 1.5em;
	background-color: #eee;
	border-radius: 8px;
	margin-bottom: 3em;
	.ant-typography {
		margin-bottom: 0;
	}
`

const TimelineItem = styled(Timeline.Item)`
	&& {
		padding-bottom: 3em;
		.ant-timeline-item-content {
			> p {
				margin-bottom: 0;
				&.manifest-date {
					color: ${theme.greyColor[2]};
				}
			}
		}
	}
`

export default function Waybill({ data = {} }) {
	const { summary = {}, manifest = [] } = data

	return (
		<Section paddingHorizontal="0" style={{ paddingTop: 0 }}>
			<Stats>
				<Row type="flex">
					<Col lg={6}>
						<Heading content="Penerima" subheader={summary.receiver_name || "-"} reverse />
					</Col>
					<Col lg={6}>
						<Heading content="Pengirim" subheader={summary.shipper_name || "-"} reverse />
					</Col>
					<Col lg={6}>
						<Heading
							content="Tanggal keluar resi"
							subheader={moment(summary.waybill_date).format("dddd, DD MMMM YYYY") || "-"}
							reverse
						/>
					</Col>
					<Col lg={6}>
						<Heading
							content="Status pengiriman"
							subheader={
								<Tag color={summary.status === "DELIVERED" ? "#87d068" : "#f50"}>{summary.status}</Tag>
							}
							reverse
						/>
					</Col>
				</Row>
			</Stats>
			<Row>
				<Col lg={16}>
					<Heading content="Perjalanan barang" reverse />
					<Timeline>
						{manifest.map(item => (
							<TimelineItem color="green" key={item.manifest_code}>
								<p>
									<strong>Sampai di {item.city_name}</strong>
								</p>
								<p>{item.manifest_description}</p>
								<p className="manifest-date">
									{moment(item.manifest_date).format("dddd, DD MMMM YYYY")}
								</p>
							</TimelineItem>
						))}
					</Timeline>
				</Col>
			</Row>
		</Section>
	)
}
