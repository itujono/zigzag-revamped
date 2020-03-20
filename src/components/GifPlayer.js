import React from "react"

export default function GifPlayer({ src, width = 400, height = 400, ...props }) {
	return (
		<lottie-player
			{...props}
			src={src}
			background="transparent"
			speed="1"
			style={{ width, height, ...props.style }}
			loop
			autoplay
		/>
	)
}
