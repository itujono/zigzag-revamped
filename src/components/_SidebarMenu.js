import React from "react"
import { Menu, Icon } from "antd"
import { Heading } from "components"
import { NavLink } from "react-router-dom"
import { theme } from "styles"
import Button from "./Button"
import styled from "styled-components"
import theming from "styled-theming"

const fontColor = theming("mode", {
	dark: "#eee",
	light: "inherit"
})

const Flex = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	.mode {
		position: fixed;
		bottom: 30px;
		left: 40px;
	}
`

const StyledButton = styled(Button)`
	background-color: ${({ theme: hehe }) => hehe.mode === "light" && "transparent"};
	border-color: ${({ theme: hehe }) => hehe.mode === "light" && theme.greyColor[3]};
	color: ${({ theme: hehe }) => hehe.mode === "light" && theme.greyColor[3]};
	font-size: 0.8em;
	&:hover {
		border-color: ${({ theme: hehe }) => hehe.mode === "light" && theme.darkColor[0]};
		background-color: ${({ theme: hehe }) => hehe.mode === "light" && theme.darkColor[0]};
	}
`

const StyledNavLink = styled(NavLink)`
	&& {
		color: ${fontColor};
	}
`

function SidebarMenu({ page, theme: appTheme }) {
	return (
		<Flex>
			<Menu>
				<Heading
					content="Products"
					reverse
					marginBottom="0"
					style={{ paddingLeft: "1em", paddingTop: "2em" }}
				/>
				<Menu.Item key="tutorsms">
					<StyledNavLink to="/product/tutorsms">
						<Icon type="container" theme="twoTone" twoToneColor={theme.color[0]} /> TutorSMS
					</StyledNavLink>
				</Menu.Item>
				<Menu.Item key="marketplace">
					<StyledNavLink to="/product/marketplace">
						<Icon type="layout" theme="twoTone" twoToneColor={theme.color[0]} /> Cudy Marketplace
					</StyledNavLink>
				</Menu.Item>
				<Menu.Item key="cudylms">
					<StyledNavLink to="/product/cudylms">
						<Icon type="interaction" theme="twoTone" twoToneColor={theme.color[0]} /> Cudy LMS
					</StyledNavLink>
				</Menu.Item>
				<Menu.Item key="cudymooc">
					<StyledNavLink to="/product/cudymooc">
						<Icon type="rocket" theme="twoTone" twoToneColor={theme.color[0]} /> Cudy MOOC
					</StyledNavLink>
				</Menu.Item>
				<Menu.Item key="cudypass">
					<StyledNavLink to="/product/cudypass">
						<Icon type="thunderbolt" theme="twoTone" twoToneColor={theme.color[0]} /> Cudy Pass
					</StyledNavLink>
				</Menu.Item>
			</Menu>
			<StyledButton type="primary" className="mode" shape="round" Icon="check" onClick={appTheme.toggle}>
				{appTheme.mode === "light" ? <span>🌒 Dark mode</span> : <span>☀️ Light mode</span>}
			</StyledButton>
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
		</Flex>
	)
}

export default SidebarMenu
