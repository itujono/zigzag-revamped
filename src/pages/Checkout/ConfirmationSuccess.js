import React, { useEffect } from "react"
import { Section, Card, Success, Heading, Alert, ButtonLink } from "components"
import { Row, Col } from "antd"
import styled from "styled-components/macro"
import { Link, useLocation, useHistory } from "react-router-dom"
import { theme } from "styles"
import { mobile, media } from "helpers"

const StyledCard = styled(Card)`
	&& {
		margin-bottom: 3em;
		.ant-card-body {
			padding: 0;
			.left {
				padding: 2em 3em;
			}
			.right {
				padding: 2em 3em;
				text-align: left;
				background-color: ${theme.greyColor[4]};
			}
		}
	}

	${media.mobile`
		&& {
			.ant-card-body {
				padding: 0;
				.left {
					padding: 1em;
				}
				.right {
					padding: 1em;
					text-align: left;
					background-color: ${theme.greyColor[4]};
				}
			}
		}
	`}
`

const usefulLinks = (
	<ul style={{ marginTop: "3em" }}>
		<li>
			<Heading reverse content="Tas" subheader={<Link to="/category/5-tas">Belanja tas</Link>} />
		</li>
		<li>
			<Heading reverse content="Bank BCA" subheader={<Link to="/category/3-dompet">Belanja dompet</Link>} />
		</li>
		<li>
			<Heading
				reverse
				content="Bank CIMB Niaga"
				subheader={<Link to="/category/4-lingerie">Belanja lingerie</Link>}
			/>
		</li>
	</ul>
)

export default function ConfirmationSuccess() {
	const { state = {} } = useLocation()
	const { push } = useHistory()

	useEffect(() => {
		if (!state.isSuccess) push("/404")
	}, [])

	return (
		<Section centered width={mobile ? "100%" : "75%"} textAlign="center">
			<StyledCard noHover>
				<Row type="flex">
					<Col lg={16} className="left">
						<Success />
						<Heading
							content="Konfirmasi pembayaran selesai! 🎉🎉"
							subheader="Great! Konfirmasi pembayaran kamu telah kami terima, dan email berisi detail info
                            orderan juga sudah ada di inbox email kamu. Silakan duduk tenang, dan kami akan
                            melakukan verifikasi terhadap konfirmasi pembayaran kamu. Tunggu notifikasi
                            berikutnya dari kami. Have a great day!"
						/>
						<Alert
							type="info"
							showIcon
							message={
								<span>
									Kalo email yang berisi detail info orderan nya gak ada, jangan lupa{" "}
									<strong>cek folder spam</strong> nya juga ya.
								</span>
							}
						/>
					</Col>
					<Col lg={8} className="right">
						<Heading content="Coba belanja lagi" subheader={usefulLinks} />
					</Col>
				</Row>
			</StyledCard>
			<Section centered textAlign="center">
				<Link to="/">
					<ButtonLink icon="home">Kembali ke Home</ButtonLink>
				</Link>
			</Section>
		</Section>
	)
}
