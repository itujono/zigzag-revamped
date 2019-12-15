import React, { useEffect } from "react"
import { Menu } from "antd"
import { Heading } from "components"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { fetchProductCategories } from "store/actions/productActions"
import { BagIcon, ShoesIcon, LingerieIcon, WalletIcon, HomewareIcon } from "components/Icons"
import DynamicIcon from "./DynamicIcon"

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
								<DynamicIcon type="icon-tubiaozhizuomoban6" /> Basic
							</NavLink>
						</Menu.Item>
						<Menu.Item key="history">
							<NavLink to="/profile/history">
								<DynamicIcon type="icon-tubiaozhizuomoban3" /> History order
							</NavLink>
						</Menu.Item>
						<Menu.Item key="wishlist">
							<NavLink to="/profile/wishlist">
								<DynamicIcon type="icon-tubiaozhizuomoban" /> Wishlist
							</NavLink>
						</Menu.Item>
						<Menu.Item key="deposit">
							<NavLink to="/profile/deposit">
								<DynamicIcon type="icon-tubiaozhizuomoban5" /> Deposit
							</NavLink>
						</Menu.Item>
						<Menu.Item key="settings">
							<NavLink to="/profile/settings">
								<DynamicIcon type="icon-tubiaozhizuomoban1" /> Settings
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
									<NavLink to={`/category/${item.id}-${item.name.toLowerCase()}`}>
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
						<Menu.Item key="promo">
							<NavLink to="/products/promo">
								<BagIcon /> Lagi promo!
							</NavLink>
						</Menu.Item>
						<Menu.Item key="about">
							<NavLink to="/about">
								<DynamicIcon type="icon-sunglasses" /> Tentang Zigzag
							</NavLink>
						</Menu.Item>
						{/* <Menu.Item key="best-seller">
							<NavLink to="/products/best-seller">
								<ShoesIcon /> Paling laris
							</NavLink>
						</Menu.Item> */}
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
