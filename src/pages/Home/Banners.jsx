import React from "react"
import { Section, Empty } from "components"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import { theme } from "styles"
import { Row, Col, Tag, Icon } from "antd"
import styled from "styled-components"
import { LIGHTBOX_SETTING } from "helpers/constants"

const ImageCol = styled(Col).attrs({
	lg: 10,
	xs: 24
})`
	cursor: pointer;
	img {
		border-radius: 10px;
		box-shadow: ${theme.boxShadow.hover};
		transition: all 0.2s ease;
	}
	.ant-tag {
		opacity: 0;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		z-index: 3;
		cursor: pointer;
		pointer-events: none;
	}

	&:hover {
		.ant-tag {
			opacity: 1;
		}
		img {
			filter: brightness(0.5);
		}
	}
`

export default function Banners({ data }) {
	if (data.length === 0) {
		return (
			<Section>
				<Empty description="Belum ada banner" />
			</Section>
		)
	}

	return (
		<SimpleReactLightbox>
			<Section noPadding className="p0__mobile">
				<SRLWrapper options={LIGHTBOX_SETTING}>
					<Row gutter={16} type="flex" className="scrolling-row mb3em">
						{data.map((banner, idx) => (
							<ImageCol key={banner.id}>
								<Tag className="br-10" color="black">
									<Icon type="fullscreen" />
									&nbsp; Perbesar
								</Tag>
								<img src={banner.picture} width="100%" alt={banner.title} loading="lazy" />
							</ImageCol>
						))}
					</Row>
				</SRLWrapper>
			</Section>
		</SimpleReactLightbox>
	)
}
