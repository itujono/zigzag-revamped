import React from "react"
import { Section, Carousel, Empty } from "components"
import { mobile } from "helpers"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import { theme } from "styles"
import { Row, Col } from "antd"

// const images = [
// 	"https://source.unsplash.com/599x299",
// 	"https://source.unsplash.com/500x500",
// 	"https://source.unsplash.com/599x301"
// ]

const progressBar = { fillColor: theme.primaryColor }

export default function Banners({ onPhotoIndex, data }) {
	const { photoIndex, setPhotoIndex } = onPhotoIndex

	// data = images // Don't forget to remove this!!

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
				<SRLWrapper options={{ progressBar }}>
					<Row gutter={16} type="flex" className="scrolling-row mb3em">
						{data.map((banner, idx) => (
							<Col
								lg={10}
								xs={24}
								key={banner.id}
								className="cursor-pointer"
								onClick={() => setPhotoIndex(idx)}
							>
								<img src={banner.picture} width="100%" alt={banner.title} loading="lazy" />
							</Col>
						))}
					</Row>
					{/* <Carousel className="center home" slidesToShow={mobile ? 1 : 1}>
						{data.map((banner, idx) => (
							<div key={banner} className="cursor-pointer" onClick={() => setPhotoIndex(idx)}>
								<img src={banner} width="100%" alt={banner} loading="lazy" />
							</div>
						))}
					</Carousel> */}
				</SRLWrapper>
			</Section>
		</SimpleReactLightbox>
	)
}
