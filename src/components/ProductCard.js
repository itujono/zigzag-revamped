import React from "react"
import { Card, Row, Col, Icon, Tag, message } from "antd"
import styled from "styled-components"
import { pricer } from "helpers"
import { Link } from "react-router-dom"
import { theme } from "styles"

const RADIUS = "12px"

const Cardee = styled(Card)`
	&& {
		border-radius: ${RADIUS};
		margin-bottom: 1em;
		transition: all 0.2s ease;
		border: 2px solid ${theme.greyColor[3]};
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: ${RADIUS} ${RADIUS} 0 0;
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
		.ant-tag {
			position: absolute;
			top: -10px;
			right: 0;
			z-index: 10;
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
	const handleClick = () => {
		if (!data.to) message.error("Produk ini tidak bisa dibuka.")
	}

	return (
		<Link to={data.to} onClick={handleClick}>
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
				{data.isOutOfStock && <Tag color="orange">Stok habis</Tag>}
				{/* <Tag color="orange">Stok habis</Tag> */}
			</Cardee>
		</Link>
	)
}

export default ProductCard
