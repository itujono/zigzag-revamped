import React, { useEffect } from "react"
import { Menu } from "antd"
import { Heading } from "components"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { fetchProductCategories } from "store/actions/productActions"
import DynamicIcon from "./DynamicIcon"
import { CategoryIcon } from "helpers/constants"

const profileMenu = [
	{ key: "basic", label: "Basic", url: "/profile/basic", icon: "icon-tubiaozhizuomoban6" },
	{ key: "history", label: "History order", url: "/profile/history", icon: "icon-tubiaozhizuomoban3" },
	{ key: "wishlist", label: "Wishlist", url: "/profile/wishlist", icon: "icon-tubiaozhizuomoban" },
	{ key: "deposit", label: "Deposit", url: "/profile/deposit", icon: "icon-tubiaozhizuomoban5" },
	{ key: "settings", label: "Settings", url: "/profile/settings", icon: "icon-tubiaozhizuomoban1" }
]

function SidebarMenu({ page, fetchProductCategories, categories }) {
	useEffect(() => {
		fetchProductCategories()
	}, [fetchProductCategories])

	return (
		<div>
			{page === "profile" ? (
				<>
					<Heading
						content="Profil kamu"
						reverse
						marginBottom="0"
						style={{ paddingLeft: "1em", paddingTop: "4em" }}
					/>
					<Menu>
						{profileMenu.map((item) => (
							<Menu.Item key={item.key}>
								<NavLink to={item.url}>
									<DynamicIcon type={item.icon} /> {item.label}
								</NavLink>
							</Menu.Item>
						))}
					</Menu>
				</>
			) : (
				<>
					<Heading
						content="Produk kami"
						reverse
						marginBottom="0"
						style={{ paddingLeft: "1em", paddingTop: "4em" }}
					/>
					<Menu>
						{categories.map((item) => {
							const theIcon = CategoryIcon[item.name.toLowerCase()]
							return (
								<Menu.Item key={item.id}>
									<NavLink to={`/category/${item.id}-${item.name.toLowerCase()}`}>
										<DynamicIcon type={theIcon} /> {item.name}
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
								<DynamicIcon type="icon-tubiaozhizuomoban" /> Lagi promo!
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
	categories: product.categories.filter((item) => item.parent === 0)
})

export default connect(mapState, { fetchProductCategories })(SidebarMenu)
