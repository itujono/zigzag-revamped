import React from "react"
import { Card, Row, Col, Icon, Tag } from "antd"
import styled from "styled-components"
import { pricer } from "helpers"
import { Link } from "react-router-dom"
import { theme } from "styles"

const Cardee = styled(Card)`
	&& {
		border-radius: 8px;
		margin-bottom: 1em;
		transition: all 0.2s ease;
		border: 2px solid ${theme.greyColor[3]};
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 8px 8px 0 0;
		}
		.ant-card-body {
			padding: ${({ mode }) => mode === "mini" && "24px 12px"};
		}
		.ant-card-meta-title {
			font-weight: bold;
			font-size: ${({ mode }) => mode === "mini" && "13px"};
		}
		.ant-card-cover {
			height: ${({ mode }) => (mode === "mini" ? "180px" : "290px")};
			overflow: hidden;
		}
		&:hover {
			box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.1);
			border: 1px solid #66ceb2;
		}
	}
`

const tagStyle = {
	position: "absolute",
	top: "-55px",
	right: 0
}

function ProductCard({ data, mode, loading = false, ...props }) {
	return (
		<Link to={data.to}>
			<Cardee {...props} mode={mode} hoverable cover={<img alt={data.title} src={data.src} />}>
				{loading ? (
					<p style={{ textAlign: "center" }}>Mohon tunggu...</p>
				) : (
					<Row gutter={16} type="flex" justify="space-between" align="middle">
						<Col lg={18}>
							<Card.Meta title={data.title || "Untitled"} description={`Rp ${pricer(data.price)}`} />
						</Col>
						{/* <Col lg={6} style={{ textAlign: "right" }}>
							<Tag style={tagStyle} color="magenta">
								{data.category}
							</Tag>
						</Col> */}
					</Row>
				)}
			</Cardee>
		</Link>
	)
}

export default ProductCard
