import React from "react"
import { Section, Button } from "components"
import { Result } from "antd"
import { Link } from "react-router-dom"

export default function NotFound() {
	return (
		<Section centered textAlign="right">
			<Result
				status="404"
				title="404"
				subTitle="Main kamu kejauhan. Ayo puter balik!"
				extra={
					<Link to="/">
						<Button icon="home">Balik ke Home</Button>
					</Link>
				}
			/>
		</Section>
	)
}
