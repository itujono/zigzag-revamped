import React, { useEffect } from "react"
import { Section, Heading, Card, Button } from "components"
import { Row, Col, Icon, message } from "antd"
import styled from "styled-components"
import { useHistory, Link } from "react-router-dom"
import mandiriLogo from "assets/images/mandiri-logo.png"
import bcaLogo from "assets/images/bca-logo.jpeg"
import { theme } from "styles"
import { randomCode, pricer } from "helpers"

const StyledCard = styled(Card)`
	&& {
		margin-bottom: 2em;
		box-shadow: ${theme.boxShadow.main};
		border: ${({ isSelected }) => (isSelected && `2px solid ${theme.primaryColor}`) || `2px solid transparent`};
		height: auto;
		cursor: pointer;
		.ant-card-head {
			padding-left: 2em;
		}
		.ant-row-flex {
			> .ant-col {
				height: 150px;
				img {
					height: 100%;
					object-fit: contain;
				}
			}
		}
		img {
			opacity: ${({ isSelected }) => !isSelected && 0.6};
		}
		.description {
			line-height: 1.8;
			opacity: ${({ isSelected }) => !isSelected && 0.6};
		}
	}
`

const random = randomCode()

export default function Payment({ data, handlers }) {
	const { push } = useHistory()

	const formData = JSON.parse(localStorage.getItem("formData")) || {}

	// prettier-ignore
	const { selectedPayment } = data
	const { setSelectedPayment } = handlers

	const uniqueCode = formData.unique_code ? Number(formData.unique_code) : Number(random)
	const cartTotal = formData.cartTotal.price
	const discount = formData.cartTotal.discount
	const depositNotSufficient = formData.deposit < Number(cartTotal)

	const handleSavePayment = () => {
		localStorage.setItem(
			"formData",
			JSON.stringify({
				...formData,
				payment: selectedPayment,
				unique_code: uniqueCode
			})
		)
		message.loading("Mengkalkulasi totalan...", 1).then(() => push("/checkout/summary"))
	}

	useEffect(() => {
		if (!formData.order_detail) push("/404")
	}, [push])

	return (
		<Section paddingHorizontal="0">
			<Heading
				content="Metode pembayaran"
				subheader="Pilih metode pembayaran yang paling nyaman untuk kamu"
				marginBottom="3em"
			/>
			<StyledCard
				noHover
				title="ATM / Transfer bank"
				onClick={() => setSelectedPayment({ label: "ATM/Transfer bank", value: "transfer" })}
				isSelected={selectedPayment.value === "transfer"}
			>
				<Row gutter={32} style={{ marginBottom: "2em" }}>
					<Col lg={4} xs={12}>
						<img src={bcaLogo} alt="BCA" width="100%" />
					</Col>
					<Col lg={4} xs={12}>
						<img src={mandiriLogo} alt="Mandiri" width="100%" />
					</Col>
				</Row>
				<Row gutter={32}>
					<Col lg={18}>
						<p className="description">
							Kamu memilih untuk menggunakan transfer bank:
							<ul style={{ paddingLeft: 20 }}>
								<li>Hanya bank-bank di atas yang saat ini kami support</li>
								<li>Nomor rekening akan diberitahukan di email dan di akhir proses order ini</li>
								<li>Dapat pahala dan amal jariyah</li>
							</ul>
						</p>
					</Col>
				</Row>
			</StyledCard>
			<StyledCard
				noHover
				title="Deposit kamu"
				onClick={() => setSelectedPayment({ label: "Deposit", value: "deposit" })}
				isSelected={selectedPayment.value === "deposit"}
			>
				<Row gutter={32}>
					<Col lg={18}>
						{depositNotSufficient && (
							<p className="description">
								Maaf, deposit kamu tidak cukup. Mau tambah deposit dulu?{" "}
								<Link to="/profile/deposit">Tambah deposit</Link>
							</p>
						)}
						{!depositNotSufficient && (
							<p className="description">
								Kamu memilih untuk menggunakan deposit kamu:
								<ul style={{ paddingLeft: 20 }}>
									<li>
										Jumlah deposit di akun kamu akan dikurangi sebanyak{" "}
										<strong>Rp {pricer(cartTotal + uniqueCode - discount)}</strong>
									</li>
									<li>Dapat pahala dan amal jariyah</li>
								</ul>
							</p>
						)}
					</Col>
				</Row>
			</StyledCard>
			<Section textAlign="right" paddingHorizontal="0">
				<Button
					onClick={handleSavePayment}
					disabled={selectedPayment.value === "deposit" && depositNotSufficient}
				>
					Lanjut ke Summary <Icon type="right" />
				</Button>
			</Section>
		</Section>
	)
}
