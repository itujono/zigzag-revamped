import React from "react"
import { Section, Layout, Heading, Button, ButtonLink } from "components"
import { Row, Col, Tag, Divider, Typography, Carousel } from "antd"
import styled from "styled-components"
import { warna, ukuran } from "helpers/dummy"
import { pricer } from "helpers"

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

const { Paragraph, Text } = Typography

function ProductDetail() {
	return (
		<Layout sidebar>
			<Section>
				<Row gutter={64}>
					<Col lg={14}>
						<Carousel autoplay infinite style={{ marginBottom: "2em" }}>
							<div>
								<img src="https://source.unsplash.com/600x300" alt="Disclaimer" width="100%" />
							</div>
							<div>
								<img src="https://source.unsplash.com/600x299" alt="Welcome to Zigzag" width="100%" />
							</div>
							<div>
								<img src="https://source.unsplash.com/599x299" alt="Welcome to Zigzag" width="100%" />
							</div>
							<div>
								<img src="https://source.unsplash.com/599x300" alt="Welcome to Zigzag" width="100%" />
							</div>
							<div>
								<img src="https://source.unsplash.com/599x301" alt="599x301" width="100%" />
							</div>
						</Carousel>
					</Col>
					<Col lg={10}>
						<Heading
							bold
							content="SP-008"
							subheader={
								<Paragraph>
									<Text delete disabled>
										Rp {pricer(245000)}
									</Text>{" "}
									&nbsp; Rp {pricer(210000)}
								</Paragraph>
							}
						/>
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
							<Button type="primary" icon="shopping-cart">
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
