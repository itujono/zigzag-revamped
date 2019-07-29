import React from "react"
import { Section, Layout, Heading, Button, ButtonLink } from "components"
import { Row, Col, Tag, Divider } from "antd"
import styled from "styled-components"
import { warna, ukuran } from "helpers/dummy"

const Stats = styled.div`
	padding: 1.5em;
	background-color: #f9f9f9;
	border-radius: 8px;
	.ant-typography {
		margin-bottom: 0;
	}
`

const StyledSection = styled(Section)`
	padding-bottom: 0;
	h4.ant-typography {
		margin-bottom: 10px;
	}
`

const color = warna.map(item => (
	<Tag color="#2db7f5" key={item.value}>
		{item.label}
	</Tag>
))

const size = ukuran.map(item => (
	<Tag color="#87d068" key={item.value}>
		{item.label}
	</Tag>
))

function ProductDetail() {
	return (
		<Layout sidebar>
			<Section>
				<Row gutter={32}>
					<Col lg={10}>Hehehh</Col>
					<Col lg={14}>
						<Heading bold content="SP-008" />
						<Stats>
							<Row type="flex">
								<Col lg={8}>
									<Heading content="Kategori" subheader="Tas" reverse />
								</Col>
								<Col lg={6}>
									<Heading content="Berat" subheader="500 gr" reverse />
								</Col>
								<Col lg={10}>
									<Heading content="Material" subheader="Kulit UK 21X14X7 with long strap" reverse />
								</Col>
							</Row>
						</Stats>
						<StyledSection paddingHorizontal="0" marginBottom="0">
							<Row gutter={32}>
								<Col lg={12}>
									<Heading reverse content="Warna" subheader={color} marginBottom="0" />
								</Col>
								<Col lg={12}>
									<Heading reverse content="Ukuran" subheader={size} marginBottom="0" />
								</Col>
							</Row>
						</StyledSection>
						<Divider />
						<StyledSection paddingHorizontal="0" marginBottom="0">
							<Button type="primary" icon="plus">
								Tambahkan ke cart
							</Button>{" "}
							&nbsp; <ButtonLink icon="heart">Wishlist</ButtonLink>
						</StyledSection>
					</Col>
				</Row>
			</Section>
		</Layout>
	)
}

export default ProductDetail
