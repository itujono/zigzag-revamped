import React from "react"
import { Carousel as _Carousel } from "antd"
import styled from "styled-components"
import { theme } from "styles"

const StyledCarousel = styled(_Carousel).attrs({
	infinite: true,
	pauseOnFocus: true,
	pauseOnHover: true,
	autoPlay: true
})`
	&& {
		/* .slick-list {
			height: auto;
			max-height: 400px;
		} */
		.slick-dots {
			li {
				button {
					background: #999;
					height: 16px;
					border-radius: 100px;
				}
				&.slick-active {
					button {
						background: ${theme.primaryColor};
						height: 16px;
						border-radius: 100px;
					}
				}
			}
		}
		img {
			object-fit: cover;
		}
	}
`

export default function Carousel({ children, ...props }) {
	return <StyledCarousel {...props}>{children}</StyledCarousel>
}
