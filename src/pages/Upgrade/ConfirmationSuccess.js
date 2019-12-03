import React from "react"
import { Row, Col } from "antd"
import { Heading, Success, Alert, ButtonLink, Section } from "components"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { theme } from "styles"

const usefulLinks = (
	<ul style={{ marginTop: "3em", textAlign: "left" }}>
		<li>
			<Heading reverse content="Tas" subheader={<Link to="/category/5-tas">Belanja tas</Link>} />
		</li>
		<li>
			<Heading reverse content="Dompet" subheader={<Link to="/category/3-dompet">Belanja dompet</Link>} />
		</li>
		<li>
			<Heading reverse content="Lingerie" subheader={<Link to="/category/4-lingerie">Belanja lingerie</Link>} />
		</li>
	</ul>
)

const StyledRow = styled(Row)`
	.left {
		padding: 2em 3em;
		background-color: ${theme.greyColor[4]};
		text-align: center;
		.image {
			margin-bottom: 2em;
		}
		.benefits {
			margin-top: 2em;
			li {
				margin-bottom: 1.5em;
				list-style-type: none;
			}
		}
	}
	.right {
		padding: 2em 3em;
		text-align: left;
	}
`

export default function ConfirmationSuccess() {
	return (
		<StyledRow type="flex" justify="center">
			<Col lg={16} className="left">
				<Success />
				<Heading
					content="Konfirmasi upgrade akun selesai! 🎉🎉"
					subheader="Great! Konfirmasi upgrade akun kamu telah kami terima, dan email berisi detail info
                            orderan juga sudah ada di inbox email kamu. Silakan duduk tenang, dan kami akan
                            melakukan verifikasi terhadap konfirmasi upgrade akun kamu. Tunggu notifikasi
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
				<Section centered textAlign="center">
					<Link to="/">
						<ButtonLink icon="home">Kembali ke Home</ButtonLink>
					</Link>
				</Section>
			</Col>
			<Col lg={8} className="right">
				<Heading content="Coba belanja lagi" subheader={usefulLinks} />
			</Col>
		</StyledRow>
	)
}
