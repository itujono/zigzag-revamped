import React from "react"
import { Menu, Icon } from "antd"
import { Heading } from "components"
import { NavLink } from "react-router-dom"
import { theme } from "styles"

function SidebarMenu({ page }) {
	return (
		<div>
			<Heading content="Products" reverse marginBottom="0" style={{ paddingLeft: "1em", paddingTop: "2em" }} />
			<Menu>
				<Menu.Item key="tutorsms">
					<NavLink to="/product/tutorsms">
						<Icon type="container" theme="twoTone" twoToneColor={theme.color[0]} /> TutorSMS
					</NavLink>
				</Menu.Item>
				<Menu.Item key="marketplace">
					<NavLink to="/product/marketplace">
						<Icon type="layout" theme="twoTone" twoToneColor={theme.color[0]} /> Cudy Marketplace
					</NavLink>
				</Menu.Item>
				<Menu.Item key="cudylms">
					<NavLink to="/product/cudylms">
						<Icon type="interaction" theme="twoTone" twoToneColor={theme.color[0]} /> Cudy LMS
					</NavLink>
				</Menu.Item>
				<Menu.Item key="cudymooc">
					<NavLink to="/product/cudymooc">
						<Icon type="rocket" theme="twoTone" twoToneColor={theme.color[0]} /> Cudy MOOC
					</NavLink>
				</Menu.Item>
				<Menu.Item key="cudypass">
					<NavLink to="/product/cudypass">
						<Icon type="thunderbolt" theme="twoTone" twoToneColor={theme.color[0]} /> Cudy Pass
					</NavLink>
				</Menu.Item>
			</Menu>
			{/* <Heading content="Cari cepat" reverse marginBottom="0" style={{ paddingLeft: "1em", paddingTop: "2em" }} />
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
			</Menu> */}
		</div>
	)
}

export default SidebarMenu
