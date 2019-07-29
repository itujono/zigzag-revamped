import React from "react"
import { Menu } from "antd"
import { Heading } from "components"
import { NavLink } from "react-router-dom"
import { BagIcon, ShoesIcon, LingerieIcon, WalletIcon, HomewareIcon } from "components/Icons"

function SidebarMenu({ page }) {
	return (
		<div>
			{page === "profile" ? (
				<>
					<Heading
						content="Profil kamu"
						reverse
						marginBottom="0"
						style={{ paddingLeft: "1em", paddingTop: "2em" }}
					/>
					<Menu>
						<Menu.Item key="basic">
							<NavLink to="/profile/basic">
								<BagIcon /> Basic
							</NavLink>
						</Menu.Item>
						<Menu.Item key="history">
							<NavLink to="/profile/history">
								<BagIcon /> History order
							</NavLink>
						</Menu.Item>
						<Menu.Item key="deposit">
							<NavLink to="/profile/deposit">
								<BagIcon /> Deposit
							</NavLink>
						</Menu.Item>
						<Menu.Item key="settings">
							<NavLink to="/profile/settings">
								<BagIcon /> Settings
							</NavLink>
						</Menu.Item>
					</Menu>
				</>
			) : (
				<>
					<Heading
						content="Produk kami"
						reverse
						marginBottom="0"
						style={{ paddingLeft: "1em", paddingTop: "2em" }}
					/>
					<Menu>
						<Menu.Item key="tas">
							<NavLink to="/category/tas">
								<BagIcon /> Tas
							</NavLink>
						</Menu.Item>
						<Menu.Item key="sepatu">
							<NavLink to="/category/sepatu">
								<ShoesIcon /> Sepatu
							</NavLink>
						</Menu.Item>
						<Menu.Item key="lingerie">
							<NavLink to="/category/lingerie">
								<LingerieIcon /> Lingerie
							</NavLink>
						</Menu.Item>
						<Menu.Item key="dompet">
							<NavLink to="/category/dompet">
								<WalletIcon /> Dompet
							</NavLink>
						</Menu.Item>
						<Menu.Item key="homeware">
							<NavLink to="/category/homeware">
								<HomewareIcon /> Homeware
							</NavLink>
						</Menu.Item>
					</Menu>
					<Heading
						content="Cari cepat"
						reverse
						marginBottom="0"
						style={{ paddingLeft: "1em", paddingTop: "2em" }}
					/>
					<Menu>
						<Menu.Item key="latest">
							<NavLink to="/products/latest">
								<BagIcon /> Produk terbaru
							</NavLink>
						</Menu.Item>
						<Menu.Item key="best-seller">
							<NavLink to="/products/best-seller">
								<ShoesIcon /> Paling laris
							</NavLink>
						</Menu.Item>
						<Menu.Item key="lingerie">
							<NavLink to="/category/lingerie">
								<LingerieIcon /> Lingerie
							</NavLink>
						</Menu.Item>
					</Menu>
				</>
			)}
		</div>
	)
}

export default SidebarMenu
