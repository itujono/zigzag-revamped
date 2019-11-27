import React, { useEffect } from "react"
import { Menu } from "antd"
import { Heading } from "components"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { fetchProductCategories } from "store/actions/productActions"
import { BagIcon, ShoesIcon, LingerieIcon, WalletIcon, HomewareIcon } from "components/Icons"

function SidebarMenu({ page, fetchProductCategories, categories }) {
	useEffect(() => {
		fetchProductCategories()
	}, [])

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
						{categories.map(item => {
							const theIcon =
								item.id === 1 ? (
									<HomewareIcon />
								) : item.id === 2 ? (
									<ShoesIcon />
								) : item.id === 3 ? (
									<WalletIcon />
								) : item.id === 4 ? (
									<LingerieIcon />
								) : (
									<BagIcon />
								)

							return (
								<Menu.Item key={item.id}>
									<NavLink to={`/category/${item.name.toLowerCase()}`}>
										{theIcon} {item.name}
									</NavLink>
								</Menu.Item>
							)
						})}
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

const mapState = ({ product }) => ({
	categories: product.categories.filter(item => item.parent === 0)
})

export default connect(mapState, { fetchProductCategories })(SidebarMenu)
